// src/cli/CreateMCPServer.ts
import inquirer from "inquirer";
import { existsSync, cpSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";
import boxen from "boxen";
import { createPackageJson } from "../utils/index.js";
import { spawn } from "child_process";

export class CreateMCPServer {
  private __dirname: string;
  private projectName = "";
  private template = "";
  private projectPath = "";
  private templatePath = "";

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    this.__dirname = dirname(__filename);
  }

  async run() {
    this.printHeader();
    await this.askQuestions();
    this.resolvePaths();
    this.copyTemplate();
    await createPackageJson(this.projectName, this.projectPath);
    this.installDependencies();
    this.showSuccessMessage();
  }

  private printHeader() {
    const title = figlet.textSync("Create MCP Server", {
      font: "Standard",
      horizontalLayout: "default",
    });

    console.log(chalk.blue(title));
  }

  private async askQuestions() {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: chalk.cyan("Select a template:"),
        choices: ["mcp-server-default"],
      },
      {
        type: "input",
        name: "projectName",
        message: chalk.cyan("Project name:"),
        validate: (input) => (input ? true : "Please enter a valid name"),
      },
    ]);

    this.template = answers.template;
    this.projectName = answers.projectName;
  }

  private resolvePaths() {
    this.projectPath = join(process.cwd(), this.projectName);
    this.templatePath = join(
      this.__dirname,
      "..",
      "..",
      "templates",
      this.template
    );

    if (existsSync(this.projectPath)) {
      console.error(chalk.red("A folder with this name already exists."));
      process.exit(1);
    }

    if (!existsSync(this.templatePath)) {
      console.error(chalk.red(`Template not found at: ${this.templatePath}`));
      process.exit(1);
    }
  }

  private copyTemplate() {
    const spinner = ora("Copying template files...").start();

    try {
      mkdirSync(this.projectPath);
      cpSync(this.templatePath, this.projectPath, { recursive: true });
      spinner.succeed("Template copied.");
    } catch (error) {
      spinner.fail("Failed to copy template.");
      console.error(error);
      process.exit(1);
    }
  }

  private installDependencies() {
    const spinner = ora("Installing dependencies...").start();

    try {
      execSync("npm install", { cwd: this.projectPath, stdio: "inherit" });
      spinner.succeed("Dependencies installed.");
    } catch (error) {
      spinner.fail("Dependency installation failed.");
      console.error(error);
    }
  }

  private showSuccessMessage() {
    const msg = `
${chalk.greenBright("✅ Your MCP server project has been created successfully!")}
Next steps:
  ${chalk.bold(`cd ${this.projectName}`)}   → Navigate into your new project folder
Available scripts:
  ${chalk.bold("npm run inspector")}   → Open the MCP Inspector in your browser (no client install needed)
  ${chalk.bold("npm run dev")}         → Start the server locally for development
  ${chalk.bold("npm run build")}       → Build your project for production
Happy coding! 🚀
`;
    console.log(
      boxen(msg, {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "cyan",
      })
    );
  }
}
