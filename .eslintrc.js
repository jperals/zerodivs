module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  overrides: [
    {
      files: ["**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
