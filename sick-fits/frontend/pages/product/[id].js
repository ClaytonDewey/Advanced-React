import SingleProductPage from '../../components/SingleProduct';

export default function SingleProduct({ query }) {
  return <SingleProductPage id={query.id} />;
}
