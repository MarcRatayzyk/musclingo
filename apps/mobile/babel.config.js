module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Reanimated 4: plugin moved to react-native-worklets (also pulled by nativewind/babel).
    // Keep as last plugin for safety when nativewind preset order differs.
    plugins: ["react-native-worklets/plugin"],
  };
};
