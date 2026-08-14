import { Template, defaultBuildLogger } from "e2b";
import { template as nextJSTemplate } from "./template";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const apiKey = process.env.E2B_API_KEY;
if (!apiKey) throw new Error("E2B_API_KEY missing in .env");

Template.build(nextJSTemplate, "e0", {
  cpuCount: 4,
  memoryMB: 4096,
  onBuildLogs: defaultBuildLogger(),
  apiKey,
});
