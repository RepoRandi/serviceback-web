---
to: admin/src/routes.tsx
inject: true
after: HYGEN-ROUTE_IMPORT
---
const <%= h.changeCase.pascal(name) %> = lazy(() => import('./containers/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>'));