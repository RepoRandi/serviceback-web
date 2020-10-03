---
to: utilities/factories/<%= h.changeCase.pascalCase(name) %>.ts
---
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker'
import { getRepository } from 'typeorm'
import { <%= h.changeCase.pascalCase(name) %> } from 'server/src/entities/<%= h.changeCase.pascalCase(name) %>'

export const <%= h.changeCase.pascalCase(name) %>Factory = {
  build: (attrs: Partial<<%= h.changeCase.pascalCase(name) %>> = {}) => {
    const <%= h.changeCase.camelCase(name) %>Attrs: Partial<<%= h.changeCase.pascalCase(name) %>> = {
      ...attrs,
    }

    return getRepository(<%= h.changeCase.pascalCase(name) %>).create(<%= h.changeCase.camelCase(name) %>Attrs)
  },

  create: async (attrs: Partial<<%= h.changeCase.pascalCase(name) %>> = {}) => {
    const <%= h.changeCase.camelCase(name) %> = <%= h.changeCase.pascalCase(name) %>Factory.build(attrs)
    const created<%= h.changeCase.pascalCase(name) %> = await getRepository(<%= h.changeCase.pascalCase(name) %>).save(<%= h.changeCase.camelCase(name) %>)

    return created<%= h.changeCase.pascalCase(name) %>
  },

  deleteAll: async () =>
    await getRepository(<%= h.changeCase.pascalCase(name) %>).query('TRUNCATE "<%= h.changeCase.camelCase(name) %>" CASCADE'),
}