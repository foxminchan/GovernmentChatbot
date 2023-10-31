import { Injectable } from '@nestjs/common';
import { DataService } from '../../frameworks';
import { CreateUserDto, UpdateUserDto } from '../../core';
import { Criteria, constructQueryOptions } from '../../libs/helpers';

@Injectable()
export class UserService {
  constructor(private readonly dataService: DataService) {}

  getUsers() {
    return this.dataService.user.findMany();
  }

  getFilterUsers(criteria: Criteria) {
    const queryOptions = constructQueryOptions(criteria);
    return this.dataService.user.findMany(queryOptions);
  }

  getUser(id: string) {
    return this.dataService.user.findUnique({
      where: { id: id },
    });
  }

  addUser(user: CreateUserDto) {
    return this.dataService.$transaction([
      this.dataService.user.create({
        data: user,
      }),
    ]);
  }

  updateUser(id: string, user: UpdateUserDto) {
    return this.dataService.$transaction([
      this.dataService.user.update({
        where: { id: id },
        data: user,
      }),
    ]);
  }

  deleteUser(id: string) {
    return this.dataService.$transaction([
      this.dataService.user.delete({
        where: { id: id },
      }),
    ]);
  }
}
