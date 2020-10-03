---
to: server/src/api/<%= app %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.service.ts
---
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { <%= h.changeCase.pascal(name) %> } from '@entities/<%= h.changeCase.pascal(name) %>';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class <%= h.changeCase.pascal(name) %>Service extends TypeOrmCrudService<<%= h.changeCase.pascal(name) %>> {
  constructor(@InjectRepository(<%= h.changeCase.pascal(name) %>) <%= h.changeCase.camel(name) %>Repository: Repository<<%= h.changeCase.pascal(name) %>>) {
    super(<%= h.changeCase.camel(name) %>Repository);
  }
}


