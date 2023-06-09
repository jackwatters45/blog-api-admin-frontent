import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

function UnauthorizedPage({ message }: { message?: string }) {
  const location = useLocation();
  const { from } = location.state || { from: '/' };

  return (
    <Container>
      <h1>You are not authorized to view this page.</h1>
      {message && <h2>{message}</h2>}
      <p>
        If you are an admin,{' '}
        <StyledLink to="/login" state={{ from }}>
          login to view this page.
        </StyledLink>
      </p>
      <p>
        Otherwise, <StyledLink to="/">return home</StyledLink>
      </p>
    </Container>
  );
}

export default UnauthorizedPage;
