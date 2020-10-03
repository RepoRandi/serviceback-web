import React, { useCallback, useEffect, useState } from 'react';
import { withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import Input from 'components/Input/Input';
import { Wrapper, Header, Heading } from 'components/Wrapper.style';
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from './Order.style';
import NoResult from 'components/NoResult/NoResult';
import { useOrderList } from 'services/order';
import Select from 'components/Select/Select';
import { useQueryCache } from 'react-query';
import {
  ORDER_PAYMENT_STATUS_OPTIONS,
  ORDER_STATUS_OPTIONS,
} from 'config/constants';
import useDebounce from 'config/use-debounce';
import moment from 'moment';

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

export default function Order() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const page = 0; // const [page, setPage] = React.useState(0); - TODO: Handle Pagination Controls
  const limit = 1000; // const [limit, setLimit] = React.useState(1000); - TODO: Handle Pagination Controls

  const dispatch = useDrawerDispatch();
  const cache = useQueryCache();
  const editItem = useCallback(
    item =>
      dispatch({
        type: 'OPEN_DRAWER',
        drawerComponent: 'ORDER_UPDATE_FORM',
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
      cache.invalidateQueries('orderList');
    }
  }, [debouncedSearchTerm, cache]);

  function handleStatusFilter({ option, value }) {
    const f =
      value.length > 0
        ? {
            option,
            key: 'status',
            op: '$eq',
            value: value[0].value,
          }
        : undefined;
    setFilter({
      ...filter,
      status: f,
    });
    cache.invalidateQueries('orderList');
  }

  function handlePaymentStatusFilter({ option, value }) {
    const f =
      value.length > 0
        ? {
            option,
            key: 'paymentStatus',
            op: '$eq',
            value: value[0].value,
          }
        : undefined;
    setFilter({
      ...filter,
      paymentStatus: f,
    });
    cache.invalidateQueries('orderList');
  }

  const { error, data } = useOrderList(
    page,
    limit,
    debouncedSearchTerm,
    Object.values(filter).filter(f => f),
  );

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
              <Heading>Order</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={6}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Email"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3}>
                  <Select
                    options={ORDER_STATUS_OPTIONS}
                    labelKey="label"
                    valueKey="value"
                    value={filter['status'] ? [filter['status'].option] : null}
                    placeholder="Filter by Status..."
                    searchable={false}
                    onChange={handleStatusFilter}
                  />
                </Col>

                <Col md={3}>
                  <Select
                    options={ORDER_PAYMENT_STATUS_OPTIONS}
                    labelKey="label"
                    valueKey="value"
                    value={
                      filter['paymentStatus']
                        ? [filter['paymentStatus'].option]
                        : null
                    }
                    placeholder="Filter by Status..."
                    searchable={false}
                    onChange={handlePaymentStatusFilter}
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 200px) minmax(70px, 150px) minmax(70px, 150px) minmax(70px, 150px) minmax(70px, 200px) auto">
                <StyledHeadCell>Email</StyledHeadCell>
                <StyledHeadCell>Service</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>Payment</StyledHeadCell>
                <StyledHeadCell>Address</StyledHeadCell>
                <StyledHeadCell>Booking</StyledHeadCell>

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
                          {item.userEmail}
                        </StyledCell>
                        <StyledCell>
                          {item.orderItems[0].service.name}
                        </StyledCell>
                        <StyledCell>{item.status}</StyledCell>
                        <StyledCell>{item.paymentStatus}</StyledCell>
                        <StyledCell>
                          {item.address1}, {item.address2}, {item.postalCode}
                        </StyledCell>
                        <StyledCell>
                          {moment(item.datetime)
                            .utcOffset('+08:00')
                            .format('HH:mm DD/MM/YY')}
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
