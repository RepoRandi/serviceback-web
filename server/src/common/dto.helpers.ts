import { applyDecorators } from '@nestjs/common';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IsString, IsDate } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export const DtoProperty = (options = {}) =>
  applyDecorators(ApiProperty(options), Expose());
export const StringDtoProperty = (options = {}) =>
  applyDecorators(IsString(), DtoProperty(options));
export const DateDtoProperty = (options = {}) =>
  applyDecorators(IsDate(), DtoProperty(options));
