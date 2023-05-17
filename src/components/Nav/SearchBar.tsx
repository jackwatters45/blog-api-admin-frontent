import { styled } from 'styled-components';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 4px;
  font-size: 14px;
`;

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <SearchIcon>
        <Icon path={mdiMagnify} size={0.75} />
      </SearchIcon>
      <SearchInput type="text" placeholder="Search..." />
    </SearchBarWrapper>
  );
};

export default SearchBar;
