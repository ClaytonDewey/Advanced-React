import { KeystoneContext } from '@keystone-next/types';

function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext,
) {
  console.log('ADD TO CART!!!');
}

export default addToCart;
