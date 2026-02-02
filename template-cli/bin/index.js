#!/usr/bin/env node
import { Command } from "commander";
import { add } from "../src/add.js";

const program = new Command();

program
  .name("template")
  .description("Next.js template library CLI")
  .version("0.1.0");

program
  .command("add <url>")
  .description("Add component from registry")
  .action(async (url) => {
    await add(url);
  });

program.parse();
