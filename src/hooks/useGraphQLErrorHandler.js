import { useNavigate } from 'react-router';

import useAuth from 'hooks/useAuth';

export const useGraphQLErrorHandler = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handler = async ({ networkError }) => {
    if (networkError && networkError.statusCode && networkError.statusCode === 401) {
      // Likely due to expired token. Redirecting to logout.
      await handleLogout();
    } else {
      // Unknown error. No need to handle.
    }
  };

  return handler;
};
