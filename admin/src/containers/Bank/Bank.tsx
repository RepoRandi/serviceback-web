import React, { useCallback, useEffect, useState } from 'react';
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { Wrapper, Header, Heading } from 'components/Wrapper.style';
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from './Bank.style';
import { Plus } from 'assets/icons/Plus';
import NoResult from 'components/NoResult/NoResult';
import { useBankList } from 'services/bank';
import { useQueryCache } from 'react-query';
import useDebounce from 'config/use-debounce';

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px)': {
    alignItems: 'center',
  },
}));

export default function Bank() {
  const [search, setSearch] = useState('');
  const [filter] = useState([]);
  const page = 0; // const [page, setPage] = React.useState(0); - TODO: Handle Pagination Controls
  const limit = 1000; // const [limit, setLimit] = React.useState(1000); - TODO: Handle Pagination Controls

  const dispatch = useDrawerDispatch();
  const cache = useQueryCache();
  const createItem = useCallback(
    () =>
      dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'BANK_CREATE_FORM' }),
    [dispatch],
  );
  const editItem = useCallback(
    item =>
      dispatch({
        type: 'OPEN_DRAWER',
        drawerComponent: 'BANK_UPDATE_FORM',
        data: item,
      }),
    [dispatch],
  );

  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
  }

  const debouncedSearchTerm = useDebounce(search, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      cache.invalidateQueries('bankList');
    }
  }, [debouncedSearchTerm, cache]);

  const { error, data } = useBankList(page, limit, debouncedSearchTerm, filter);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 0 5px rgba(0, 0 ,0, 0.05)',
            }}
          >
            <Col md={2}>
              <Heading>Bank</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={6}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3}>
                  <Button
                    onClick={createItem}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                        }),
                      },
                    }}
                  >
                    Add Bank
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="auto">
                <StyledHeadCell>Name</StyledHeadCell>

                {data ? (
                  data.data.length ? (
                    data.data.map((item, index) => (
                      <React.Fragment key={index}>
                        <StyledCell
                          onClick={() => {
                            editItem(item);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.name}
                        </StyledCell>
                      </React.Fragment>
                    ))
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: '1',
                        gridColumnEnd: 'one',
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
