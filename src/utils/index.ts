import { writeFile } from "fs/promises";
import path from "path";

export async function createPackageJson(
  projectName: string,
  projectPath: string
) {
  const pkg = {
    name: projectName,
    version: "1.0.0",
    description: "MCP Server Project Created with @create-mcp/server CLI",
    main: "dist/index.js",
    type: "module",
    bin: {
      [projectName]: "dist/index.js",
    },
    scripts: {
      build: "tsc",
      postbuild: "node scripts/add-shebang.js",
      start: "node dist/index.js",
      dev: "tsx src/index.ts",
      inspector: "npx -y @modelcontextprotocol/inspector npx -y tsx src/index",
      deploy: "npm publish --access public",
    },
    files: ["dist"],
    keywords: ["@create-mcp/server", "mcp-server", "mcp-tools"],
    license: "MIT",
    dependencies: {
      "@modelcontextprotocol/sdk": "^1.16.0",
      zod: "^3.23.8",
    },
    devDependencies: {
      "@types/node": "^20.19.8",
      tsx: "^4.0.0",
      typescript: "^5.8.3",
    },
  };

  const outputPath = path.join(projectPath, "package.json");
  await writeFile(outputPath, JSON.stringify(pkg, null, 2), "utf-8");
}
