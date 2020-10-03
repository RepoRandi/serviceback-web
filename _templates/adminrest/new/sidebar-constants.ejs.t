---
to: admin/src/containers/Layout/Sidebar/Sidebar.tsx
inject: true
skip_if: <%= h.changeCase.constant(name) %>,
before: HYGEN-SIDEBAR_CONSTANTS
---
  <%= h.changeCase.constant(name) %>,