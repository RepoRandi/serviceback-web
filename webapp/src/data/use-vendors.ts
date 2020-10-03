import useSWR from 'swr';
import Fuse from 'fuse.js';
import { useState } from 'react';
const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  minMatchCharLength: 2,
  keys: ['name'],
};
function search(list, pattern) {
  const fuse = new Fuse(list, options);

  return fuse.search(pattern).map((current) => current.item);
}
const fetcher = (url) => fetch(url).then((res) => res.json());
interface Props {
  type: string;
  text?: any;
  category?: any;
  offset?: number;
  limit?: number;
}
export default function useVendors(variables: Props) {
  const { type, text, category, offset = 0, limit = 20 } = variables ?? {};
  const { data, mutate, error } = useSWR('/api/vendors.json', fetcher);
  const loading = !data && !error;
  // need to remove when you using real API integration
  // const [formattedData, setFormattedData] = useState(false);
  let vendors = data?.filter((current) => current.type === type);
  if (category) {
    vendors = vendors.filter((item) => item.categories.includes(category));
  }
  if (text) {
    vendors = search(vendors, text);
  }
  // let localOffset = offset;
  // let localLimit = limit;
  // const fetchMore = async (os, lmt) => {
  //   localOffset = os;
  //   localLimit = lmt;
  //   setFormattedData(true);
  // };
  // console.log('object');
  // data: [
  //   ...state.data,
  //   ...state.total.slice(
  //     state.data.length,
  //     state.data.length + state.limit
  //   ),
  // ],
  // need to implement fetchMore
  // const hasMore = vendors?.length > localOffset + localLimit;
  return {
    loading,
    error,
    data: vendors?.slice(offset, offset + limit),
    // hasMore,
    mutate,
    // fetchMore,
  };
}
