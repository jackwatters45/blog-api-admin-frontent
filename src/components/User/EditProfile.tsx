import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import UserForm from '../Shared/UserForms/UserForm';
import { UserInputs } from '../../../types/utils/formInputs';
import { Navigate, useLocation } from 'react-router-dom';
import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../styles/styledComponents/AuthStyledComponents';
import ChangePasswordForm from '../Shared/UserForms/ChangePasswordForm';
import DeleteUserSection from '../Shared/UserForms/DeleteUser';
import useErrorHandler from '../../custom/useErrorHandler';

const EditProfile = () => {
  const { user } = useUserContext();
  const handleErrors = useErrorHandler();
  const { pathname } = useLocation();

  const [changeError, setChangeError] = useState<string>('');
  const [confirmText, setConfirmText] = useState<string>('');

  const onSubmit = async (data: UserInputs) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user?._id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      handleErrors(res);
      return setChangeError('Error saving changes. Please try again.');
    }

    const resData = await res.json();
    setConfirmText(resData.message);
  };

  return user ? (
    <StyledFormContainer>
      <StyledH1Centered>Edit Profile</StyledH1Centered>
      <UserForm
        userData={user}
        confirmText={confirmText}
        signupError={changeError}
        onSubmit={onSubmit}
        submitText="Save Changes"
        isAdminView={user.userType === 'admin'}
        showDelete={true}
        showAvatar={true}
        showDescription={true}
      />
      <ChangePasswordForm isOwnProfile={true} />
      <DeleteUserSection userId={user._id} isOwnProfile={true} />
    </StyledFormContainer>
  ) : (
    <Navigate to={'/login'} state={{ from: pathname }} />
  );
};

export default EditProfile;
