---
to: server/src/api/<%= app %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.module.ts
---
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= h.changeCase.pascal(name) %> } from '@entities/<%= h.changeCase.pascal(name) %>';
import { <%= h.changeCase.pascal(name) %>Controller } from './<%= h.changeCase.param(name) %>.controller';
import { <%= h.changeCase.pascal(name) %>Service } from './<%= h.changeCase.param(name) %>.service';

@Module({
  imports: [TypeOrmModule.forFeature([<%= h.changeCase.pascal(name) %>])],
  controllers: [<%= h.changeCase.pascal(name) %>Controller],
  providers: [<%= h.changeCase.pascal(name) %>Service],
  exports: [<%= h.changeCase.pascal(name) %>Service],
})
export class <%= h.changeCase.pascal(app) %><%= h.changeCase.pascal(name) %>Module {}
