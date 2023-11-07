import type { CanActivate, Type } from '@nestjs/common';
import { JwtAuthGuard, PoliciesGuard } from '../guards';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

interface AuthGuard {
  guards?: Type<CanActivate>[];
  unauthorizedResponse?: string;
}

export function Auth(_options?: AuthGuard) {
  const options = {
    guards: [JwtAuthGuard, PoliciesGuard],
    unauthorizedResponse: "You don't have permission to access this resource",
    ..._options,
  } satisfies AuthGuard;

  return applyDecorators(
    UseGuards(...options.guards),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: options.unauthorizedResponse })
  );
}
