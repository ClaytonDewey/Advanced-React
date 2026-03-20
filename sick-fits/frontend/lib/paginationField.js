import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells Apollo w will take care of everything.
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      // First thing it does is ask the read function for those items.
      //
      // We can either do one of two things:
      //
      // First thing we can do is return the items because they are already in the cache.
      //
      // The other thing we can do is to return false from here, (network request)
    },
    merg() {
      // This runs when the Apollo client comes back from the network with our product
    },
  };
}
