const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: "http://localhost:3000",
  },
  integration: {
    supportFile: false,
    baseUrl: "http://localhost:3000",
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  env: {
    API_URL: "https://kin-onotes-back.rover.ingeeniex.com/api/",
  },
});
