const getFilterUrl = (searchFromURI: string, query: string) => {
  const searchParams = new URLSearchParams(searchFromURI);

  if (query) {
    searchParams.set("q", query);
  }

  const link = `/search?${searchParams.toString()}`;
  return link;
};

export { getFilterUrl };
