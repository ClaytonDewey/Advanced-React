import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "69b9b97fbf86aa85c1a308e9" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProductPage({ query }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <div>
      <h2>{data.Product.name}</h2>
    </div>
  );
}
