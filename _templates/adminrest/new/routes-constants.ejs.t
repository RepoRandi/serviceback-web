---
to: admin/src/routes.tsx
inject: true
skip_if: <%= h.changeCase.constant(name) %>
after: HYGEN-ROUTES_CONSTANTS
---
  <%= h.changeCase.constant(name) %>,