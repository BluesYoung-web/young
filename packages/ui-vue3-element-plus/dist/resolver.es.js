const t = "@bluesyoung/ui-vue3-element-plus", o = "0.12.1", u = "vue3 + element-plus ui components", n = "module", i = "dist/index.cjs.js", r = "dist/index.es.js", p = "dist/index.d.ts", c = {
  ".": {
    require: "./dist/index.cjs.js",
    import: "./dist/index.es.js",
    types: "./dist/index.d.ts"
  },
  "./resolver": {
    types: "./dist/resolver.d.ts",
    require: "./dist/resolver.cjs.js",
    import: "./dist/resolver.es.js"
  }
}, d = {
  test: "vitest",
  build: "vite build && tsup",
  release: "pnpm build && bumpp --commit",
  push: "pnpm publish --access public"
}, l = {
  "@bluesyoung/ui-vue3": "workspace:*",
  "@bluesyoung/utils": "workspace:*",
  "@types/sortablejs": "^1.15.0",
  "@vitejs/plugin-vue-jsx": "^2.1.1",
  "@vue/shared": "^3.2.47",
  "@vueuse/core": "^9.10.0",
  "element-plus": "^2.2.28",
  sortablejs: "^1.15.0",
  vitest: "^0.29.2",
  vue: "^3.2.45",
  "vue-cropper": "^1.0.9"
}, m = {
  type: "git",
  url: "git+ssh://git@github.com/BluesYoung-web/young.git",
  directory: "packages/ui-vue3-element-plus"
}, g = [
  "ui components",
  "vue3",
  "element-plus"
], v = "BluesYoung-web", a = "MIT", y = {
  url: "https://github.com/BluesYoung-web/young/issues"
}, b = "https://github.com/BluesYoung-web/young#readme", h = {
  defu: "^6.1.2",
  "file-saver": "^2.0.5",
  xlsx: "^0.18.5"
}, s = {
  name: t,
  version: o,
  description: u,
  type: n,
  main: i,
  module: r,
  types: p,
  exports: c,
  scripts: d,
  devDependencies: l,
  repository: m,
  keywords: g,
  author: v,
  license: a,
  bugs: y,
  homepage: b,
  dependencies: h
};
function x() {
  return {
    [s.name]: [
      "useAutoLoad",
      "useFormMode",
      "useExport2Excel",
      "useVerifyCode",
      "useImagePreview",
      "useKeyUp",
      "useQuery",
      "useRemoteSearch"
    ]
  };
}
function j() {
  return (e) => {
    if (e.startsWith("Young"))
      return {
        name: e,
        from: s.name
      };
  };
}
export {
  x as YoungApisResolver,
  j as YoungComponentsResolver
};
//# sourceMappingURL=resolver.es.js.map
