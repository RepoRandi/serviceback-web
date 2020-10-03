---
to: utilities/seeders/<%= h.changeCase.camelCase(name) %>Seed.ts
---
/* eslint-disable no-console */
import faker from 'faker'
import { <%= h.changeCase.pascalCase(name) %>Factory } from '../factories/<%= h.changeCase.pascalCase(name) %>'

export const <%= h.changeCase.camelCase(name) %>Seed = async (): Promise<any> => {
  const <%= h.changeCase.camelCase(name) %>List = []

  const dummy = {
      
  }

  <%= h.changeCase.camelCase(name) %>List.push(dummy)

  try {
    console.log('Seeding dummy <%= h.changeCase.camelCase(name) %> data...')
    const <%= h.changeCase.camelCase(name) %>ListPromises = <%= h.changeCase.camelCase(name) %>List.map((<%= h.changeCase.camelCase(name) %>) => <%= h.changeCase.pascalCase(name) %>Factory.create(<%= h.changeCase.camelCase(name) %>))

    const <%= h.changeCase.camelCase(name) %>Results = await Promise.all(<%= h.changeCase.camelCase(name) %>ListPromises)
    console.log('Done seeding <%= h.changeCase.camelCase(name) %>List.')

    return <%= h.changeCase.camelCase(name) %>Results
  } catch (e) {
    console.error('ERROR - <%= h.changeCase.pascalCase(name) %> seed: ', e)
  }
}
