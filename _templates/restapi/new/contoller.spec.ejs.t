---
to: server/src/api/<%= app %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.controller.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing';
import { <%= h.changeCase.pascal(name) %>Controller } from './<%= h.changeCase.param(name) %>.controller';

describe('<%= h.changeCase.pascal(name) %>Controller', () => {
  let controller: <%= h.changeCase.pascal(name) %>Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= h.changeCase.pascal(name) %>Controller],
    }).compile();

    controller = module.get<<%= h.changeCase.pascal(name) %>Controller>(<%= h.changeCase.pascal(name) %>Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
