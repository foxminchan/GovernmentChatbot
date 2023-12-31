import {
  ApiController,
  SwaggerResponse,
  PagingSwaggerResponse,
  Auth,
} from '../libs/decorators';
import {
  Get,
  Put,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../modules';
import { Criteria } from '../libs/helpers';
import { JwtAuthGuard } from '../libs/guards';
import { CreateUserDto, User, UpdateUserDto } from '../core';

@ApiController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Auth()
  @Get()
  @SwaggerResponse({
    operation: 'User fetch',
    response: User,
  })
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Auth()
  @Get('filter')
  @PagingSwaggerResponse({
    operation: 'User fetch with pagination',
    response: User,
  })
  getPaginatedUsers(@Query() criteria: Criteria) {
    return this.userService.getFilterUsers(criteria);
  }

  @UseGuards(JwtAuthGuard)
  @Auth()
  @Get(':id')
  @SwaggerResponse({
    operation: 'User fetch by id',
    params: ['id'],
    response: User,
  })
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Auth()
  @Post()
  @SwaggerResponse({
    operation: 'Create user',
    body: CreateUserDto,
  })
  addUser(@Body() user: CreateUserDto) {
    return this.userService.addUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Auth()
  @Put(':id')
  @SwaggerResponse({
    operation: 'Update user',
    params: ['id'],
    body: UpdateUserDto,
  })
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Auth()
  @Delete(':id')
  @SwaggerResponse({
    operation: 'Delete user',
    params: ['id'],
  })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
