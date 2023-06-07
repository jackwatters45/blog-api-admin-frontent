import { styled } from 'styled-components';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  width: 100%;
  padding: 0.5rem;

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  padding: 4px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
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
