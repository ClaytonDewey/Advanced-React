import { resetIdCounter, useCombobox } from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    },
  );
  console.log(data);
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const { inputValue, getMenuProps, getInputProps, getComboboxProps } =
    useCombobox({
      items: [],
      onInputValueChange() {
        console.log('Input changed!');
        findItemsButChill({
          variables: {
            searchTerm: inputValue,
          },
        });
      },
      onSelectedItemChange() {
        console.log('Selected Item Changed!');
      },
    });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        <DropDownItem>hey</DropDownItem>
        <DropDownItem>hey</DropDownItem>
        <DropDownItem>hey</DropDownItem>
        <DropDownItem>hey</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
}
