import { API_URL } from 'config/constants';
import { encodeFilter } from 'config/encoding';
import { usePaginatedQuery, useMutation, useQueryCache } from 'react-query';

const resourceUrl = 'api/v1/admin/user';

export function useUserList(
  _page = 0,
  _limit = 20,
  _search = '',
  _filters = [],
): { error?: { message: string }; data: any } {
  const filters = _filters.length > 0 ? encodeFilter(_filters) : '';
  const search = _search.length > 0 ? `&filter=email||$contL||${_search}` : '';
  return usePaginatedQuery(
    ['userList', _page, _limit, filters, search],
    (key, page, limit) =>
      fetch(
        `${API_URL}/${resourceUrl}?page=${page}&limit=${limit}${filters}${search}`,
        {
          method: 'get',
          headers: new Headers({
            Authorization: `Bearer ${localStorage.getItem('idToken')}`,
          }),
        },
      ).then(res => {
        if (res.status === 401) {
          throw new Error('Unauthorized');
        }
        return res.json();
      }),
  );
}

export function useUserCreate() {
  const cache = useQueryCache();
  const createRequest = body => {
    return fetch(`${API_URL}/${resourceUrl}`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('idToken')}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    }).then(res => {
      if (res.status === 401) {
        throw new Error('Unauthorized');
      }
      cache.invalidateQueries('userList');
      return res.json();
    });
  };
  return useMutation(createRequest);
}

export function useUserUpdate() {
  const cache = useQueryCache();
  const createRequest = body => {
    const updateBody = {
      ...body,
    };
    delete updateBody.id;
    return fetch(`${API_URL}/${resourceUrl}/${body.id}`, {
      method: 'put',
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('idToken')}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    }).then(res => {
      if (res.status === 401) {
        throw new Error('Unauthorized');
      }
      cache.invalidateQueries('userList');
      return res.json();
    });
  };
  return useMutation(createRequest);
}
