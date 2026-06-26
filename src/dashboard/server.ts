import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const dashboardDir = join(rootDir, "dashboard");
const latestRunPath = join(rootDir, "demo/runs/treasury-guard-latest.json");
const port = Number(process.env.DASHBOARD_PORT || 5174);

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = createServer(async (req, res) => {
  if (!req.url) {
    sendText(res, 400, "Bad request");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "GET" && url.pathname === "/api/latest-run") {
    await sendLatestRun(res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/run-agent") {
    await runAgent(res);
    return;
  }

  if (req.method !== "GET") {
    sendText(res, 405, "Method not allowed");
    return;
  }

  await serveStatic(url.pathname, res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Dashboard: http://127.0.0.1:${port}/`);
});

async function sendLatestRun(
  res: import("node:http").ServerResponse,
): Promise<void> {
  try {
    const body = await readFile(latestRunPath, "utf8");
    sendJson(res, 200, JSON.parse(body));
  } catch {
    sendJson(res, 404, {
      status: "missing",
      message: "No agent run receipt exists yet. Click Run Agent first.",
    });
  }
}

async function runAgent(
  res: import("node:http").ServerResponse,
): Promise<void> {
  execFile(
    "npm",
    ["run", "demo:agent", "--silent"],
    {
      cwd: rootDir,
      timeout: 30000,
    },
    async (error, stdout, stderr) => {
      if (error) {
        sendJson(res, 500, {
          status: "error",
          message: error.message,
          stdout,
          stderr,
        });
        return;
      }

      try {
        const receipt = JSON.parse(await readFile(latestRunPath, "utf8"));
        sendJson(res, 200, {
          status: "ok",
          stdout,
          receipt,
        });
      } catch (readError) {
        sendJson(res, 500, {
          status: "error",
          message:
            readError instanceof Error
              ? readError.message
              : "Failed to read receipt.",
          stdout,
          stderr,
        });
      }
    },
  );
}

async function serveStatic(
  pathname: string,
  res: import("node:http").ServerResponse,
): Promise<void> {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const safePath = normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(dashboardDir, safePath);

  if (!filePath.startsWith(dashboardDir)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    res.writeHead(200, {
      "content-type": mimeTypes[extname(filePath)] || "application/octet-stream",
      "cache-control": "no-cache",
    });
    res.end(body);
  } catch {
    sendText(res, 404, "Not found");
  }
}

function sendJson(
  res: import("node:http").ServerResponse,
  statusCode: number,
  payload: unknown,
): void {
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-cache",
  });
  res.end(JSON.stringify(payload, null, 2));
}

function sendText(
  res: import("node:http").ServerResponse,
  statusCode: number,
  text: string,
): void {
  res.writeHead(statusCode, {
    "content-type": "text/plain; charset=utf-8",
  });
  res.end(text);
}
