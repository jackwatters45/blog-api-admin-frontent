import { styled } from 'styled-components';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import NavContent from './NavContent';

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  height: 4rem;
  padding: 0 2rem;
  gap: 4vw;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }
`;

const StyledH1 = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 4px;
  cursor: pointer;
`;

const Nav = () => {
  return (
    <StyledNav>
      <Link to="/">
        <StyledH1>SCHMEDIUM</StyledH1>
      </Link>
      <SearchBar />
      <NavContent />
    </StyledNav>
  );
};

export default Nav;
