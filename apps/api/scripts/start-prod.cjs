const { execSync, spawnSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: root, env: process.env });
}

run("prisma migrate deploy");

if (process.env.SKIP_SEED !== "1") {
  run("prisma db seed");
} else {
  console.log("SKIP_SEED=1 — seed ignoré");
}

const result = spawnSync("node", ["dist/main.js"], {
  stdio: "inherit",
  cwd: root,
  env: process.env,
});

process.exit(result.status ?? 1);
