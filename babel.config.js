module.exports = function(api) {
  api.cache(true);
  const plugins = [["import", { libraryName: "@ant-design/react-native" }]];
  return {
    presets: ["babel-preset-expo"],
    plugins
  };
};
