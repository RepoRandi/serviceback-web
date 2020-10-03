---
to: server/src/routes.ts
inject: true
skip_if: import { <%= h.changeCase.pascal(app) %><%= h.changeCase.pascal(name) %>Module } from './api/<%= app %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.module'
before: HYGEN-IMPORT
---
import { <%= h.changeCase.pascal(app) %><%= h.changeCase.pascal(name) %>Module } from './api/<%= app %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.module'