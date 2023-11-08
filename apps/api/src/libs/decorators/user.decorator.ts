import { Account } from '../../core';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const LoggedInUser = createParamDecorator(
  (data: keyof Account, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return data ? user[data] : user;
  }
);
