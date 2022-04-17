import dotenv from "dotenv"

export const envs = {
  ...process.env,
  ...dotenv.config().parsed
};
const env = process.env;
export const isProduction = process.env.NODE_ENV === "production";
export const postGresHost = env.POSTGRESHOST;
export const postGresPort = env.POSTGRESPORT;
export const postGresUser = env.POSTGRESUSER;
export const postGresPassword = env.POSTGRESPASSWORD;
export const postGresDatabase = env.POSTGRESDB;
