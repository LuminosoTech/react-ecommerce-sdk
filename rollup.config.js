/**
 * Copyright 2021, Luminoso Tech
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import { dependencies } from "./package.json";

const packageName = "react-ecommerce-sdk";
const umdName = "luminosoReactEcommerceSdk";

const esPluginOptions = {
  exclude: [
    "./dist",
    "./src/**/*.tests.js",
    "./src/**/*.tests.ts",
    "./src/**/*.umdtests.js",
    "./src/tests",
    "node_modules",
  ],
  include: ["./src/**/*.ts", "./src/**/*.tsx"],
  jsx: "transform",
};

const plugins = [esbuild({ ...esPluginOptions, minify: process.env.NODE_ENV === "production" }), commonjs()];

if (process.env.NODE_ENV === "production") {
  plugins.push(uglify());
}

const cjsBundleFor = (platform) => ({
  plugins,
  external: ["https", "http", "url"].concat(Object.keys(dependencies || {})),
  input: `src/index.ts`,
  output: {
    exports: "named",
    format: "cjs",
    file: `dist/${packageName}.min.js`,
    sourcemap: false,
  },
});

const esmBundle = {
  ...cjsBundleFor("browser"),
  output: [
    {
      format: "es",
      file: `dist/${packageName}.es.js`,
      sourcemap: false,
    },
  ],
};

const umdBundle = {
  plugins,
  input: "src/index.ts",
  output: [
    {
      name: umdName,
      format: "umd",
      file: `dist/${packageName}.umd.js`,
      exports: "named",
    },
  ],
};

const systemBundle = {
  plugins,
  input: "src/index.ts",
  output: [
    {
      format: "system",
      file: `dist/${packageName}.system.js`,
      exports: "named",
    },
  ],
};

const bundles = {
  "cjs-browser": cjsBundleFor("browser"),
  esm: esmBundle,
  umd: umdBundle,
  system: systemBundle,
};

// Collect all --config-* options and return the matching bundle configs
// Builds all bundles if no --config-* option given
//   --config-cjs will build all three cjs-* bundles
//   --config-umd will build only the umd bundle
export default (args) => {
  const patterns = Object.keys(args)
    .filter((arg) => arg.startsWith("config-"))
    .map((arg) => arg.replace(/config-/, ""));

  // default to matching all bundles
  if (!patterns.length) patterns.push(/.*/);

  const bundlesOutput = Object.entries(bundles)
    .filter(([name, config]) => patterns.some((pattern) => name.match(pattern)))
    .map(([name, config]) => config);

  return [
    ...bundlesOutput,
    {
      plugins: [dts()],
      input: "src/index.ts",
      output: {
        file: `types/index.d.ts`,
        format: "es",
      },
    },
  ];
};
