export const encodeFilter = filters => {
  const encoded = filters.reduce((acc, { key, value, op }) => {
    return `${acc}&filter=${key}||${op}||${value}`;
  }, '');

  return encoded;
};
