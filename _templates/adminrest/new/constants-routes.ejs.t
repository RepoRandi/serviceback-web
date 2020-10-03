---
to: admin/src/config/constants.ts
inject: true
skip_if: export const <%= h.changeCase.constant(name) %> = '/<%= h.changeCase.param(name) %>';
before: HYGEN-CONSTANT_ROUTES
---
export const <%= h.changeCase.constant(name) %> = '/<%= h.changeCase.param(name) %>';