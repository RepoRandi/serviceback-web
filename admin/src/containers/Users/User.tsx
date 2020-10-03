import React, { useCallback, useEffect, useState } from 'react';
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import Button from 'components/Button/Button';
import { Wrapper, Header, Heading } from 'components/Wrapper.style';
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from './User.style';
import { Plus } from 'assets/icons/Plus';
import NoResult from 'components/NoResult/NoResult';
import { useUserList } from 'services/user';
import { useQueryCache } from 'react-query';
import useDebounce from 'config/use-debounce';
import { USER_ROLE_OPTIONS } from 'config/constants';
import { Select } from 'baseui/select';
import Input from 'components/Input/Input';

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

export default function User() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const page = 0; // const [page, setPage] = React.useState(0); - TODO: Handle Pagination Controls
  const limit = 1000; // const [limit, setLimit] = React.useState(1000); - TODO: Handle Pagination Controls

  const dispatch = useDrawerDispatch();
  const cache = useQueryCache();
  const createItem = useCallback(
    () =>
      dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'USER_CREATE_FORM' }),
    [dispatch],
  );
  const editItem = useCallback(
    item =>
      dispatch({
        type: 'OPEN_DRAWER',
        drawerComponent: 'USER_UPDATE_FORM',
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
      cache.invalidateQueries('userList');
    }
  }, [debouncedSearchTerm, cache]);

  function handleRoleFilter({ option, value }) {
    const f =
      value.length > 0
        ? [
            {
              option,
              key: 'role',
              op: '$eq',
              value: value[0].value,
            },
          ]
        : [];
    setFilter(f);
    cache.invalidateQueries('userList');
  }

  const { error, data } = useUserList(page, limit, debouncedSearchTerm, filter);

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
              <Heading>User</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={9}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Email"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3}>
                  <Select
                    options={USER_ROLE_OPTIONS}
                    labelKey="label"
                    valueKey="value"
                    value={filter.length > 0 ? [filter[0].option] : null}
                    placeholder="Filter by Role..."
                    searchable={false}
                    onChange={handleRoleFilter}
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
                    Add User
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 200px) minmax(70px, 100px) minmax(70px, 100px) minmax(70px, 100px) auto">
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Role</StyledHeadCell>
                <StyledHeadCell>Disabled</StyledHeadCell>
                <StyledHeadCell>Verified</StyledHeadCell>
                <StyledHeadCell>Email</StyledHeadCell>

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
                        <StyledCell>{item.role}</StyledCell>
                        <StyledCell>
                          {item.disabled ? 'TRUE' : 'FALSE'}
                        </StyledCell>
                        <StyledCell>
                          {item.emailVerified ? 'TRUE' : 'FALSE'}
                        </StyledCell>
                        <StyledCell>{item.email}</StyledCell>
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