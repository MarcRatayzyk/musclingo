const { execSync, spawnSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: root, env: process.env });
}

run("prisma migrate deploy");

// Opt-in only: never seed on every production boot by default.
if (process.env.RUN_SEED === "1") {
  run("prisma db seed");
} else {
  console.log("RUN_SEED unset — seed ignoré (set RUN_SEED=1 to seed)");
}

const result = spawnSync("node", ["dist/main.js"], {
  stdio: "inherit",
  cwd: root,
  env: process.env,
});

process.exit(result.status ?? 1);
