---
to: server/src/api/<%= app %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.dto.ts
---
import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  StringDtoProperty,
  DtoProperty,
  DateDtoProperty,
} from 'src/common/dto.helpers';

@Exclude()
export class <%= h.changeCase.pascal(name) %> {
  @StringDtoProperty()
  id: string;

  @DateDtoProperty()
  createdAt: Date;

  @DateDtoProperty()
  updatedAt: Date;
}

export class <%= h.changeCase.pascal(name) %>CreateDto extends OmitType(<%= h.changeCase.pascal(name) %>, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class <%= h.changeCase.pascal(name) %>UpdateDto extends OmitType(<%= h.changeCase.pascal(name) %>CreateDto, []) {}
