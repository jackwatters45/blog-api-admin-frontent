import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useErrorHandler = () => {
  const navigate = useNavigate();

  const handleError = useCallback(
    (res: Response) => {
      switch (res.status) {
        case 401:
          return navigate('/login');
        case 403:
          return navigate('/unauthorized');
        default:
          return;
      }
    },
    [navigate],
  );

  return handleError;
};

export default useErrorHandler;
