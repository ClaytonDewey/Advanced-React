import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { Nav } from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

// Make some Mocks for being logged out, logged in, and logged in with cart items
const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  },
];

console.log(signedInMocksWithCartItems);

describe('<Nav/>', () => {
  it('Renders and minimal nav when signed out', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>,
    );
    debug();
  });
});
