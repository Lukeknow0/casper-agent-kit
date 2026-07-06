const DEFAULT_RPC_URL = "https://node.testnet.casper.network/rpc";
const DEFAULT_CONTRACT_HASH =
  "hash-e575218360dd4bac37c7bc07eefbdc18fc127a97a52f47bf2e184011adbb9fa9";
const DEFAULT_TRANSACTION_HASH =
  "474c06c9e047ff1b629c0f4218df1ee2a156a98f8d38c5a6c926fc82cf063e4b";
const EXPECTED_CHAIN_NAME = "casper-test";
const EXPECTED_ENTRY_POINT = "record_guard_action";
const EXPECTED_TREASURY_ID = "casper-testnet-demo-treasury";
const EXPECTED_ACTION = "APPROVE_SPEND";

const rpcUrl = process.env.CASPER_RPC_URL || DEFAULT_RPC_URL;
const contractHash =
  process.env.CASPER_TREASURY_CONTRACT_HASH || DEFAULT_CONTRACT_HASH;
const transactionHash =
  process.env.CASPER_PROOF_TRANSACTION_HASH || DEFAULT_TRANSACTION_HASH;
const cleanContractHash = contractHash.replace(/^hash-/, "");

async function main() {
  console.log("CasperAgentKit proof verification");
  console.log(`RPC: ${rpcUrl}`);
  console.log(`Contract: ${contractHash}`);
  console.log(`Transaction: ${transactionHash}`);

  const txResponse = await rpc("info_get_transaction", {
    transaction_hash: { Version1: transactionHash },
  });

  const tx = txResponse.result?.transaction?.Version1;
  assert(tx, "Transaction exists as a Casper 2.0 Version1 transaction");

  const payload = tx.payload;
  assert(
    payload?.chain_name === EXPECTED_CHAIN_NAME,
    `chain_name = ${EXPECTED_CHAIN_NAME}`,
  );
  assert(
    payload?.fields?.entry_point?.Custom === EXPECTED_ENTRY_POINT,
    `entry_point = ${EXPECTED_ENTRY_POINT}`,
  );
  assert(
    payload?.fields?.target?.Stored?.id?.ByHash === cleanContractHash,
    "target contract hash matches",
  );

  const serializedTx = JSON.stringify(txResponse);
  assert(
    serializedTx.includes(EXPECTED_TREASURY_ID),
    `args include treasury_id=${EXPECTED_TREASURY_ID}`,
  );
  assert(
    serializedTx.includes(EXPECTED_ACTION),
    `args include action=${EXPECTED_ACTION}`,
  );

  const executionInfo = txResponse.result?.execution_info;
  assert(executionInfo, "execution info is present");
  const executionResult = executionInfo.execution_result ?? {};
  assert(
    !JSON.stringify(executionResult).includes('"Failure"') &&
      executionResult.error_message == null,
    "execution succeeded",
  );

  const contractResponse = await rpc("query_global_state", {
    key: contractHash,
    path: [],
  });
  const contract = contractResponse.result?.stored_value?.Contract;
  assert(contract, "contract exists in global state");
  const entryPointNames = (contract.entry_points ?? []).map(
    (entryPoint: { name?: string }) => entryPoint.name,
  );
  assert(
    entryPointNames.includes(EXPECTED_ENTRY_POINT),
    "contract exposes record_guard_action",
  );

  console.log("\n✅ Proof verification passed.");
}

async function rpc(method: string, params: unknown) {
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: method, method, params }),
  });

  if (!response.ok) {
    throw new Error(`${method} HTTP ${response.status}: ${response.statusText}`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(`${method} RPC error: ${JSON.stringify(payload.error)}`);
  }
  return payload;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    console.error(`❌ ${message}`);
    process.exit(1);
  }
  console.log(`✅ ${message}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
