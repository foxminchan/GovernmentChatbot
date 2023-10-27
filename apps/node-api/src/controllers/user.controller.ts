import { UserService } from '../modules';
import { GenericController } from '../libs/decorators';
import { CreateUserDto, UpdateUserDto } from '../core';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';

@GenericController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':page/:limit')
  getPaginatedUsers(
    @Param('page') page: number,
    @Param('limit') limit: number
  ) {
    return this.userService.getPaginatedUsers(page, limit);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  addUser(@Body() user: CreateUserDto) {
    return this.userService.addUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
