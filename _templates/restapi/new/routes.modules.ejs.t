---
to: server/src/routes.ts
inject: true
before: HYGEN-MODULES
---
  <%= h.changeCase.pascal(app) %><%= h.changeCase.pascal(name) %>Module,