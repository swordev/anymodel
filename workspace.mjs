// @ts-check
import { definePackageJSON } from "@dreamkit/workspace";
import { createTSConfigFiles, defineConfig } from "@dreamkit/workspace";

export default defineConfig(({ pkg, packages }) => {
  return {
    files: {
      ...createTSConfigFiles({
        pkg,
        packages,
        build: {
          extends: ["@tsconfig/node20"],
          include: ["src"],
          compilerOptions: {
            outDir: "lib",
          },
        },
        base: {
          include: ["src", "test"],
          compilerOptions: {
            noEmit: true,
          },
        },
      }),
      "package.json": definePackageJSON({
        ...pkg.manifest,
        files: ["lib"],
        homepage: "https://github.com/swordev/anymodel",
        bugs: {
          url: "https://github.com/swordev/anymodel/issues",
          email: "juanrgm724@gmail.com",
        },
        repository: {
          type: "git",
          url: "https://github.com/swordev/anymodel",
        },
        license: "MIT",
        author: {
          name: "Juanra GM",
          email: "juanrgm724@gmail.com",
          url: "https://github.com/juanrgm",
        },
        engine: {
          node: ">=20.0.0",
        },
      }),
    },
  };
});
