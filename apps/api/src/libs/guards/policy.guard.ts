import {
  Logger,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import {
  IS_PUBLIC_KEY_META,
  CHECK_POLICIES_KEY_META,
} from '../@types/constants';
import { Account } from '../../core';
import { Reflector } from '@nestjs/core';
import { PolicyHandler } from '../@types/interfaces';
import { AppAbility, CaslAbilityFactory } from '../../frameworks';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY_META,
      context.getHandler()
    );

    if (isPublic) return true;

    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY_META,
        context.getHandler()
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user as Account);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability)
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    return typeof handler === 'function'
      ? handler(ability)
      : handler.handle(ability);
  }
}
