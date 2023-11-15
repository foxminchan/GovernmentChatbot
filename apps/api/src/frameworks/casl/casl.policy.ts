import { Claims } from '../../libs/@types/enums';
import { IPolicyHandler } from '../../libs/@types/interfaces';
import type { AppAbility, Subjects } from './casl-ability.factory';

export class CaslPolicyHandler implements IPolicyHandler {
  constructor(
    private readonly ClassType: Subjects,
    private readonly action: Claims = Claims.Read
  ) {}

  handle(ability: AppAbility): boolean {
    return ability.can(this.action, this.ClassType);
  }
}
