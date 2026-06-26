const scenarioEl = document.querySelector("#scenario");
const decisionEl = document.querySelector("#decision");
const proofEl = document.querySelector("#proof");
const statusEl = document.querySelector("#run-status");
const runButton = document.querySelector("#run-agent");
const steps = [...document.querySelectorAll(".step")];

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  statusEl.textContent = "Running agent";
  animateSteps();
  try {
    const response = await fetch("/api/run-agent", { method: "POST" });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.message || "Agent run failed");
    }
    renderReceipt(payload.receipt);
    statusEl.textContent = "Receipt refreshed";
  } catch (error) {
    statusEl.textContent = error instanceof Error ? error.message : "Run failed";
  } finally {
    runButton.disabled = false;
  }
});

loadLatestRun();

async function loadLatestRun() {
  const response = await fetch("/api/latest-run");
  const payload = await response.json();
  if (response.ok) {
    renderReceipt(payload);
  } else {
    statusEl.textContent = payload.message || "No receipt";
  }
}

function renderReceipt(receipt) {
  const scenario = receipt.scenario;
  const decision = receipt.decision;
  const llm = receipt.llmAnalysis;

  scenarioEl.innerHTML = [
    ["Treasury", scenario.treasuryId],
    ["Requested spend", `$${scenario.requestedSpendUsd.toLocaleString()}`],
    ["Projected reserve", `$${scenario.projectedReserveUsd.toLocaleString()}`],
    ["Risk score", `${scenario.riskScore}/100`],
    ["Counterparty", scenario.counterparty],
  ]
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join("");

  decisionEl.innerHTML = `
    <strong>${decision.action}</strong>
    <p>${decision.rationale.join(" ")}</p>
    <p>${llm.summary}</p>
  `;

  proofEl.innerHTML = [
    ["Mode", receipt.mode],
    ["Contract", receipt.contractHash || "pending testnet deployment"],
    ["Tx hash", receipt.transactionHash || "pending live transaction"],
    ["LLM provider", llm.provider],
    ["Created", receipt.createdAt],
    ["Explorer", receipt.explorerUrl || "pending explorer confirmation"],
  ]
    .map(([label, value]) => proofCard(label, value))
    .join("");

  steps.forEach((step, index) => {
    step.classList.toggle("active", index < 4);
    step.classList.remove("pending");
  });
}

function proofCard(label, value) {
  const isUrl = typeof value === "string" && value.startsWith("http");
  return `
    <div class="proof-card">
      <span>${label}</span>
      ${
        isUrl
          ? `<a href="${value}" target="_blank" rel="noreferrer">${value}</a>`
          : `<strong>${value}</strong>`
      }
    </div>
  `;
}

function animateSteps() {
  steps.forEach((step) => {
    step.classList.remove("active");
    step.classList.add("pending");
  });

  steps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add("active");
      step.classList.remove("pending");
    }, 260 * index);
  });
}
