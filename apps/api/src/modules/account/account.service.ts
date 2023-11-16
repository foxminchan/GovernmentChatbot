import { from, switchMap } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { DataService } from '../../frameworks';
import { CryptoUtils } from '../../libs/utils';
import { Claims, Roles } from '../../libs/@types/enums';
import { CreateAccountDto, CreateUserDto } from '../../core';

@Injectable()
export class AccountService {
  constructor(private readonly dataService: DataService) {}

  findUser(username: string) {
    return this.dataService.account.findUnique({
      where: { username },
      include: { user: true },
    });
  }

  async createAccount(account: CreateAccountDto) {
    return from(CryptoUtils.hashString(account.password)).pipe(
      switchMap((hashPassword) => {
        return from(
          this.dataService.$transaction([
            this.dataService.account.create({
              data: {
                ...account,
                password: hashPassword,
              },
            }),
          ])
        );
      })
    );
  }

  async createAccountWithUser(user: CreateUserDto, password: string) {
    return from(CryptoUtils.hashString(password)).pipe(
      switchMap((hashPassword) => {
        return from(
          this.dataService.$transaction(async (data) => {
            const createdUser = await data.user.create({
              data: user,
            });
            await data.account.create({
              data: {
                username: user.email,
                password: hashPassword,
                role: Roles.CITIZEN,
                claim: [Claims.Read, Claims.Create, Claims.Delete],
                user_id: createdUser.id,
              },
            });
            return { createdUser };
          })
        );
      })
    );
  }
}
