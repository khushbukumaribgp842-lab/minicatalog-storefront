import fs from "node:fs";

const files = ["index.html", "quickpay/index.html"];
const required = {
  "index.html": ["id=\"productForm\"", "id=\"backupFile\"", "id=\"products\"", "id=\"cartItems\""],
  "quickpay/index.html": ["id=\"modal-backdrop\"", "id=\"transactions\"", "data-action=\"send\""]
};

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("Content-Security-Policy")) throw new Error(file + ": missing CSP");
  if (/<(?:script|link|img|a)[^>]+(?:src|href)=["']http:\/\//i.test(html)) throw new Error(file + ": insecure HTTP asset/link found");
  for (const needle of required[file]) if (!html.includes(needle)) throw new Error(file + ": missing required UI marker " + needle);

  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  for (const match of scripts) {
    const temp = ".tmp-inline-check.mjs";
    fs.writeFileSync(temp, match[1]);
    try {
      const { execFileSync } = await import("node:child_process");
      execFileSync(process.execPath, ["--check", temp], { stdio: "pipe" });
    } finally {
      fs.rmSync(temp, { force: true });
    }
  }
}
console.log("MiniCatalog smoke/security checks passed.");
