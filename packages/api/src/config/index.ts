import {join} from "path";
import {readFileSync} from "fs";
import {envs} from "./envs";
import loggerConfig from "./logger";
import {getDBConfig} from "./dbConfig"

const pkg = JSON.parse(readFileSync("./package.json", {encoding: "utf8"}));
export const rootDir = join(__dirname, "..");

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  rootDir,
  dbConfig:getDBConfig()
  // additional shared configuration
};
