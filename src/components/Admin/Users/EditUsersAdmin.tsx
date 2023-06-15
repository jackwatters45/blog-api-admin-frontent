import { useEffect, useState } from 'react';
import EditUsers from './EditUsers';
import { AdminUser } from '../../../../types/user';
import Loading from '../../shared/Loading';
import { usePagination } from '../../../custom/usePagination';
import useErrorHandler from '../../Errors/useErrorHandler';

const EditUsersAdmin = () => {
  const handleError = useErrorHandler();

  const [userCount, setUserCount] = useState<number>(0);
  const itemsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(itemsPerPage, userCount);

  const [users, setUsers] = useState<undefined | AdminUser[]>(undefined);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/users/preview?limit=${itemsPerPage}&offset=${offset}`,
        {
          credentials: 'include',
        },
      );
      if (!res.ok) {
        handleError(res);
        return;
      }
      const data = await res.json();
      const {
        users,
        meta: { total },
      } = data;
      setUsers(users);
      setUserCount(total);
    };
    fetchUsers();
  }, [offset, handleError]);

  return users ? (
    <EditUsers users={users} paginationProps={paginationProps} />
  ) : (
    <Loading />
  );
};

export default EditUsersAdmin;
