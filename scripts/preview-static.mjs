import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const outputDirectory = path.resolve(process.cwd(), "out");
const port = Number.parseInt(process.env.PORT ?? "4173", 10);

if (!existsSync(path.join(outputDirectory, "index.html"))) {
  throw new Error('Static output is missing. Run "npm run build" before preview.');
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const relativePath = pathname.replace(/^\/+/, "");
  const candidate = path.resolve(outputDirectory, relativePath);

  if (!candidate.startsWith(`${outputDirectory}${path.sep}`) && candidate !== outputDirectory) {
    return path.join(outputDirectory, "404.html");
  }
  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }
  const indexCandidate = path.join(candidate, "index.html");
  if (existsSync(indexCandidate)) {
    return indexCandidate;
  }
  return path.join(outputDirectory, "404.html");
}

createServer((request, response) => {
  const filePath = resolveFile(request.url ?? "/");
  const status = filePath.endsWith("404.html") ? 404 : 200;
  response.writeHead(status, {
    "Content-Type":
      contentTypes[path.extname(filePath)] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  process.stdout.write(`Static preview: http://127.0.0.1:${port}\n`);
});
