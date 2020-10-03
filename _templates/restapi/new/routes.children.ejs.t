---
to: server/src/routes.ts
inject: true
skip_if: module\:\ <%= h.changeCase.pascal(app) %><%= h.changeCase.pascal(name) %>Module
before: HYGEN-CHILDREN-<%= h.changeCase.constant(app) %>
---
      {
        path: '<%= h.changeCase.param(name) %>',
        module: <%= h.changeCase.pascal(app) %><%= h.changeCase.pascal(name) %>Module,
      },