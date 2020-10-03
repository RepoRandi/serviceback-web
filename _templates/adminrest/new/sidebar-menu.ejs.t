---
to: admin/src/containers/Layout/Sidebar/Sidebar.tsx
inject: true
before: HYGEN-SIDEBAR_MENU
---
  {
    name: '<%= h.changeCase.pascal(name) %>',
    path: <%= h.changeCase.constant(name) %>,
    exact: false,
    icon: <SettingIcon />,
  },