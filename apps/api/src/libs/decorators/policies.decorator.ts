import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from '../@types/interfaces';
import { CHECK_POLICIES_KEY_META } from '../@types/constants';

export function CheckPolicies(...handlers: PolicyHandler[]) {
  return SetMetadata(CHECK_POLICIES_KEY_META, handlers);
}
