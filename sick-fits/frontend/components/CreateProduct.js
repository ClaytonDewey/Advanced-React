import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from '../components/ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in, and what types are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm } = useForm({
    image: '',
    name: '',
    price: undefined,
    description: '',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    },
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the input fields to the backend:
        const res = await createProduct();
        clearForm();
        // Go to that product's page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='image'>
          Image
          <input
            type='file'
            name='image'
            id='image'
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            name='price'
            id='price'
            placeholder='Price'
            value={inputs.price || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Price
          <textarea
            name='description'
            id='description'
            placeholder='description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  );
}
