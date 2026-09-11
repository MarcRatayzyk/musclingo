const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Monorepo pnpm : surveiller la racine + résoudre via les deux node_modules.
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.disableHierarchicalLookup = false;
config.resolver.unstable_enableSymlinks = true;
// Force les deps i18n (évite le 500 JSON / écran blanc si Metro rate le junction pnpm).
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  i18next: path.resolve(projectRoot, "node_modules/i18next"),
  "react-i18next": path.resolve(projectRoot, "node_modules/react-i18next"),
};
// Évite le crash Metro sur chemins .agents / autres apps.
config.resolver.blockList = [
  /(^|[\\/])\.agents([\\/]|$)/,
  /(^|[\\/])\.git([\\/]|$)/,
  /(^|[\\/])apps[\\/]api([\\/]|$)/,
  /(^|[\\/])apps[\\/]admin([\\/]|$)/,
];

module.exports = withNativeWind(config, { input: "./global.css" });
