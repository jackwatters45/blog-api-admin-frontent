import { useParams } from 'react-router-dom';
import UserForm from '../../Shared/UserForms/UserForm';
import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../../styles/styledComponents/AuthStyledComponents';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import IUser from '../../../../types/user';
import { UserInputs } from '../../../../types/utils/formInputs';
import Loading from '../../Shared/Loading';
import ChangePasswordForm from '../../Shared/UserForms/ChangePasswordForm';
import DeleteUserSection from '../../Shared/UserForms/DeleteUser';
import useErrorHandler from '../../../custom/useErrorHandler';

const EditUser = () => {
  const { id } = useParams();
  const handleErrors = useErrorHandler();

  const [user, setUser] = useState<IUser | undefined>(undefined);
  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
      const { user } = await res.json();
      setUser(user);
    };
    fetchUser();
  }, [id]);

  const [signupError, setSignupError] = useState<string>('');
  const [confirmText, setConfirmText] = useState<string>('');

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        return key === 'avatar' && value[0]
          ? formData.append(key, value[0])
          : formData.append(key, value);
      });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      });

      if (!res.ok) {
        handleErrors(res);
        return setSignupError('Error saving changes. Please try again.');
      }

      const { message } = await res.json();
      setConfirmText(message);
    } catch (err) {
      console.log(err);
    }
  };

  return user ? (
    <StyledFormContainer>
      <StyledH1Centered>Edit User</StyledH1Centered>
      <UserForm
        userData={user}
        submitText={'Confirm Changes'}
        onSubmit={onSubmit}
        confirmText={confirmText}
        signupError={signupError}
        isAdminView={true}
        showPassword={false}
        showAvatar={true}
        showDescription={true}
        showDelete={true}
      />
      <ChangePasswordForm isOwnProfile={false} />
      <DeleteUserSection userId={user._id} />
    </StyledFormContainer>
  ) : (
    <Loading />
  );
};

export default EditUser;
