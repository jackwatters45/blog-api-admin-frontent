import { useNavigate } from 'react-router-dom';
import UserForm from '../Shared/UserForms/UserForm';
import { SubmitHandler } from 'react-hook-form';
import { useUserContext } from '../../context/UserContext';
import { useState } from 'react';
import {
  StyledFormContainer,
  StyledFormLink,
  StyledFormNav,
} from '../../styles/styledComponents/AuthStyledComponents';
import { UserInputs } from '../../../types/utils/formInputs';

const Signup = () => {
  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const [signupError, setSignupError] = useState<string>('');
  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        return setSignupError('Invalid credentials. Please try again.');
      }

      const responseData = await res.json();
      const { user } = responseData;

      updateUser(user);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledFormContainer>
      <StyledFormNav>
        <h1>Sign up</h1>
        <p>
          Or <StyledFormLink to="/login">sign in to your existing account</StyledFormLink>
        </p>
      </StyledFormNav>
      <UserForm
        onSubmit={onSubmit}
        signupError={signupError}
        submitText={'Sign Up'}
        showPassword={true}
      />
    </StyledFormContainer>
  );
};

export default Signup;
