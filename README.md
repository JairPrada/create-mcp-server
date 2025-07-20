# 🛠️ Create MCP Server

A simple CLI to scaffold and launch an MCP (Model Context Protocol) server project in seconds.

---

## 📚 Table of Contents

- [What is this?](#-what-is-this)
- [Installation](#-installation)
- [Usage](#-usage)
- [Example](#-example)
- [Scripts](#-scripts)
- [Using the MCP Inspector](#-using-the-mcp-inspector)
- [Usage from VSCode or other environments](#️-usage-from-vscode-or-other-environments)
- [Deployment (Optional)](#-deployment-optional)
- [Questions or Contributions?](#-questions-or-contributions)
- [License](#-license)

---

## 🚀 What is this?

`@create-mcp/server` is a command-line tool that generates a fully configured MCP server project from a template. It helps you get started quickly with:

- ✅ Predefined project structure  
- ✅ Ready-to-use development and production scripts  
- ✅ One-line server + inspector launch  
- ✅ No manual setup required

---

## 📦 Installation

You don’t need to install it globally. Just run:

```bash
npx @create-mcp/server
````

---

## 🧪 Usage

After running the CLI, you will be asked:

1. To select a template
2. To enter your project name

Once done, the CLI will:

* Copy the selected template into a new folder
* Install dependencies
* Provide instructions to get started

---

## 📂 Example

```bash
npx @create-mcp/server
```

Select a template and provide your project name:

```
? Select a template: mcp-server-default
? Project name: my-awesome-mcp
```

Output:

```
✅ Your MCP server project has been created successfully!

Next steps:

  cd my-awesome-mcp   → Navigate into your new project folder

Available scripts:

  npm run inspector   → Open the MCP Inspector in your browser (no client install needed)

  npm run dev         → Start the server locally for development

  npm run build       → Build your project for production

Happy coding! 🚀
```

---

## 📜 Scripts

| Script              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Starts the server with live reload (development mode)    |
| `npm run build`     | Builds the server for production (outputs to `/dist`)    |
| `npm run inspector` | Launches the MCP Inspector in your default browser       |
| `npm run deploy`    | (Optional) Publishes the package to npm (manual control) |

---

## 🔍 Using the MCP Inspector

The MCP Inspector is a powerful dev tool that allows you to:

* See real-time request and response traffic
* Debug your data flows without needing to install external clients
* Explore endpoints, contexts, and flows visually

Launch it with:

```bash
npm run inspector
```

Then visit the URL shown in the terminal (usually `http://localhost:6274/...`).

📘 Full documentation here:
👉 [How to use MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)

---

## ⚙️ Usage from VSCode or other environments

Once your MCP server CLI package is published to npm, you can invoke it with `npx`. Here’s how to set it up in VSCode:

### Example (for `tasks.json` or external runners):


```json
"mcp-name": {
  "command": "npx",
  "args": ["-y", "mcpname@latest"]
}
```

✅ This ensures:

* You always run the **latest version**
* You skip confirmation prompts
* You can integrate it into any tool or CI/CD workflow

💡 Tip: Add an alias in your shell config if you use it often:

```bash
alias mcpname="npx -y mcpname@latest"
```

---

## 📤 Deployment (Optional)

To publish your package to npm:

```bash
npm login
npm run build
npm run deploy
```

> ℹ️ If using a scoped package:

```bash
npm publish --access public
```

> 💡 You can also leave the `deploy` script empty to allow each developer to define their preferred deploy strategy.

---

## 🙋‍♂️ Questions or Contributions?

Open an issue or pull request to suggest templates or features!

---

## 📄 License

MIT License

---

## 🌐 Repository

The source code for this project is available on GitHub:

[GitHub Repository](https://github.com/JairPrada/create-mcp-server)