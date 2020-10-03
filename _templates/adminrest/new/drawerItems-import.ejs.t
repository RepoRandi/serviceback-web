---
to: admin/src/containers/DrawerItems/DrawerItems.tsx
inject: true
skip_if: <%= h.changeCase.pascal(name) %>CreateForm from '../<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>CreateForm';
after: HYGEN-DRAWER_COMPONENTS_IMPORT
---

import <%= h.changeCase.pascal(name) %>CreateForm from '../<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>CreateForm';
import <%= h.changeCase.pascal(name) %>UpdateForm from '../<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>UpdateForm';