---
to: admin/src/containers/DrawerItems/DrawerItems.tsx
inject: true
skip_if: <%= h.changeCase.constant(name) %>_CREATE_FORM,
after: HYGEN-DRAWER_COMPONENTS_EXPORT
---
  <%= h.changeCase.constant(name) %>_CREATE_FORM: <%= h.changeCase.pascal(name) %>CreateForm,
  <%= h.changeCase.constant(name) %>_UPDATE_FORM: <%= h.changeCase.pascal(name) %>UpdateForm,