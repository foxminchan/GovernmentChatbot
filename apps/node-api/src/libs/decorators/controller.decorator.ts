import { Controller, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { capitalize } from 'helper-fns';

export function GenericController(name: string) {
  const decsToApply: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    [ApiTags(capitalize(name)), Controller(name)];

  return applyDecorators(...decsToApply);
}
