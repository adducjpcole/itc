declare module 'eslint-plugin-import' {
  export const flatConfigs: {
    recommended: {
      readonly rules: Readonly<Linter.RulesRecord>;
    };
  };
}
