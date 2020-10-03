---
to: server/src/entities/index.ts
inject: true
skip_if: <%= h.changeCase.pascal(name) %>,
before: HYGEN-EXPORT
---
    <%= h.changeCase.pascal(name) %>,