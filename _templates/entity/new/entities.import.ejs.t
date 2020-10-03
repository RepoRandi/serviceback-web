---
to: server/src/entities/index.ts
inject: true
skip_if: ./<%= h.changeCase.pascal(name) %>
before: HYGEN-IMPORT
---
import { <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>'