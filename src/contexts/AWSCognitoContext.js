import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { CognitoUser, CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoIdToken } from 'amazon-cognito-identity-js';

// project imports
import Loader from 'components/Loader';
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

export const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_AWS_POOL_ID || '',
  ClientId: process.env.REACT_APP_AWS_APP_CLIENT_ID || ''
});

const setSession = (tokenName, tokenValue) => {
  if (tokenValue) {
    localStorage.setItem(tokenName, tokenValue);
  } else {
    localStorage.removeItem(tokenName);
  }
};

// ==============================|| AWS COGNITO - CONTEXT & PROVIDER ||============================== //

const AWSCognitoContext = createContext(null);

export const AWSCognitoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        const idToken = window.localStorage.getItem('idToken');

        if (serviceToken && idToken) {
          setSession('serviceToken', serviceToken);
          setSession('idToken', idToken);
          const userIdentity = new CognitoIdToken({ IdToken: idToken }).decodePayload();

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                email: userIdentity.email,
                name: userIdentity.name,
                role: userIdentity['cognito:groups'][0]
              }
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    const usr = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    const authData = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    return new Promise((resolve, reject) => {
      usr.authenticateUser(authData, {
        onSuccess: (session) => {
          setSession('serviceToken', session.getAccessToken().getJwtToken());
          setSession('idToken', session.getIdToken().getJwtToken());
          const userIdentity = session.getIdToken().decodePayload();

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                email: userIdentity.email,
                name: userIdentity.name,
                role: userIdentity['cognito:groups'][0]
              }
            }
          });
        },
        onFailure: (error) => {
          reject(error.message);
        },
        newPasswordRequired: () => {
          // // User was signed up by an admin and must provide new
          // // password and required attributes, if any, to complete
          // // authentication.
          // // the api doesn't accept this field back
          // delete userAttributes.email_verified;
          // // unsure about this field, but I don't send this back
          // delete userAttributes.phone_number_verified;
          // // Get these details and call
          // usr.completeNewPasswordChallenge(password, userAttributes, requiredAttributes);
        }
      });
    });
  };

  const register = (email, password, firstName, lastName) =>
    new Promise((success, rej) => {
      userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: `${firstName} ${lastName}` })
        ],
        [],
        async (err, result) => {
          if (err) {
            rej(err);
            return;
          }
          success(result);
        }
      );
    });

  const logout = () => {
    const loggedInUser = userPool.getCurrentUser();
    if (loggedInUser) {
      setSession('serviceToken', null);
      setSession('idToken', null);
      loggedInUser.signOut();
      dispatch({ type: LOGOUT });
    }
  };

  const forgotPassword = async (email) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });
    user.forgotPassword({
      onSuccess: function () {},
      onFailure: function () {}
    });
  };

  const resetPassword = async (email, verificationCode, newPassword) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });
    return new Promise((resolve, reject) => {
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: function (data) {
          resolve(data);
        },
        onFailure: function (error) {
          reject(error.message);
        }
      });
    });
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <AWSCognitoContext.Provider value={{ ...state, login, logout, register, forgotPassword, resetPassword, updateProfile }}>
      {children}
    </AWSCognitoContext.Provider>
  );
};

AWSCognitoProvider.propTypes = {
  children: PropTypes.node
};

export default AWSCognitoContext;
