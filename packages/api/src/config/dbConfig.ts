import { 
  isProduction,
  postGresDatabase,
  postGresHost,
  postGresPassword,
  postGresPort,
  postGresUser
 } from "./envs";
import {ClientConfig} from "pg"

export const getDBConfig = (): ClientConfig => {
  return isProduction ? getProdConfig() : getTestConfig()
}

export const getTestConfig = (): ClientConfig => {
  return {
    host: postGresHost,
    port: Number(postGresPort),
    user: postGresUser,
    password: postGresPassword,
    database: postGresDatabase
  }

}

export const getProdConfig = (): ClientConfig => {
  return {
    host: postGresHost,
    port: Number(postGresPort),
    user: postGresUser,
    password: postGresPassword,
    database: postGresDatabase
  }
}