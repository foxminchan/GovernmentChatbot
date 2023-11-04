import {
  AbilityBuilder,
  createMongoAbility,
  type ExtractSubjectType,
  type InferSubjects,
  type MongoAbility,
} from '@casl/ability';
import { Claims, Roles } from '../../libs/@types/enums';
import { Account, ChatHistory, Topic, User } from '../../core';
import { Injectable } from '@nestjs/common';

export type Subjects =
  | InferSubjects<
      typeof User | typeof Account | typeof Topic | typeof ChatHistory
    >
  | 'all';

export type AppAbility = MongoAbility<[Claims, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility
    );

    if (account.role.includes(Roles.ADMIN)) can(Claims.Manager, 'all');
    else can(Claims.Read, 'all');

    can([Claims.Update, Claims.Create], Account);
    can([Claims.Update, Claims.Delete, Claims.Create], ChatHistory);

    cannot(Claims.Delete, User);
    cannot([Claims.Delete, Claims.Update, Claims.Create], Topic);

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
