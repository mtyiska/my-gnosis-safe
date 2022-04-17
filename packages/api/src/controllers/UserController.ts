import {Controller} from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/common";
import {Delete, Get, Post, Put, Summary} from "@tsed/schema";
import type * as s from 'zapatos/schema';
import { UserService } from "../services/UserService";
import { UpdateUserType, UserType } from "src/types";

@Controller("/user")
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get("/")
  @Summary("Get Registered User")
  async getUsers(): Promise<s.multisig_users.Selectable[]> {
    return this.userService.getUsers();
  }


  @Post("/register")
  @Summary("Register user")
  async registerUser(@BodyParams() body: UserType): Promise<s.multisig_users.Insertable[]> {
    return await this.userService.createUser(body);
  }

  @Put("/update/:id")
  @Summary("Update user")
  async updateUser(
    @PathParams("id") id:string,
    @BodyParams() body: UpdateUserType): Promise<s.multisig_users.Updatable> {
    return await this.userService.updateUser(id, body);
  }

  @Delete("/remove/:id")
  @Summary("Delete user")
  async removeUser(
    @PathParams("id") id:string): Promise<boolean> {
    return await this.userService.deleteUser(id);
  }
}
