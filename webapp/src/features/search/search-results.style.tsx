import styled from 'styled-components';
import css from '@styled-system/css';

export const GridWrapper = styled.div(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '8px 0px',
    borderTop: '1px solid lightgrey',
    backgroundColor: 'white',
  }),
);

export const Title = styled.h2(
  css({
    fontSize: [17, '2xl', 45],
    color: 'text.bold',
    fontWeight: 'bold',
  }),
  {
    marginBottom: 15,
    textAlign: 'center',
  },
);

export const ServiceItem = styled.div(
  css({
    display: 'flex',
    textAlign: 'left',
    margin: '8px 0',
  }),
);

export const ServiceImage = styled.span(
  css({
    padding: '0',
    img: {
      maxWidth: '100px',
    },
    width: '100px',
  }),
);

export const ServiceTitle = styled.div(
  css({
    fontSize: 17,
    color: 'text.bold',
    fontWeight: 'bold',
  }),
);

export const ServiceDescription = styled.div`
  font-size: 14px;
  color: #77798c;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ServiceDetailsWrapper = styled.div(
  css({
    margin: '0 0 0 12px',
    borderBottom: '1px solid lightgrey',
    width: '100%',
  }),
);
