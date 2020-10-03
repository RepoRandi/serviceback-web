---
to: server/src/api/<%= app %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.service.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing';
import { <%= h.changeCase.pascal(name) %>Service } from './<%= h.changeCase.param(name) %>.service';

describe('<%= h.changeCase.pascal(name) %>Service', () => {
  let service: <%= h.changeCase.pascal(name) %>Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= h.changeCase.pascal(name) %>Service],
    }).compile();

    service = module.get<<%= h.changeCase.pascal(name) %>Service>(<%= h.changeCase.pascal(name) %>Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

