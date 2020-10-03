---
to: webapp/src/components/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.style.tsx
---
import styled from 'styled-components';
import css from '@styled-system/css';

export const <%= h.changeCase.pascal(name) %>Wrapper = styled.div(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px 0px',
  }),
);


