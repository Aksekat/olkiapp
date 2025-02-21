import { useReducer, createContext, useMemo } from 'react';
import { AuthManager } from '../utils/AuthManager';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            accessToken: action.accessToken,
            sharepointToken: action.sharepointToken,
            refreshToken: action.refreshToken,
            tokenIssuedAt: action.tokenIssuedAt,
            tokenExpiresIn: action.tokenExpiresIn,
            isSignOut: false,
            isLoading: false,
            isProcessing: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            accessToken: action.accessToken,
            sharepointToken: action.sharepointToken,
            refreshToken: action.refreshToken,
            tokenIssuedAt: action.tokenIssuedAt,
            tokenExpiresIn: action.tokenExpiresIn,
            isSignOut: false,
            isLoading: false,
            isProcessing: false
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            accessToken: null,
            sharepointToken: null,
            refreshToken: null,
            tokenIssuedAt: null,
            tokenExpiresIn: null
          };
        case 'PROCESS':
          return {
            ...prevState,
            isProcessing: true,
          };
        case 'STOP_PROCESSING':
          return {
            ...prevState,
            isProcessing: false,
            isLoading: false
          };
      }
    },
    {
      isLoading: true,
      isSignOut: false,
      isProcessing: false,
      accessToken: null,
      sharepointToken: null,
      refreshToken: null,
      tokenIssuedAt: null,
      tokenExpiresIn: null
    },
  );

  const authUtils = useMemo(
    () => ({
      signIn: async (tokenRes, sharepointToken) => {
        await AuthManager.signIn(tokenRes, sharepointToken);
        dispatch({ type: 'SIGN_IN', accessToken: tokenRes.accessToken, sharepointToken: sharepointToken, refreshToken: tokenRes.refreshToken, tokenIssuedAt: tokenRes.tokenIssuedAt, tokenExpiresIn: tokenRes.tokenExpiresIn });
      },
      signOut: async () => {
        await AuthManager.signOut();
        dispatch({ type: 'SIGN_OUT' });
      },
      process: async () => {
        dispatch({ type: 'PROCESS' });
      },
      stopProcessing: async () => {
        dispatch({ type: 'STOP_PROCESSING' });
      },
      restoreToken: async (accessToken, sharepointToken, refreshToken, tokenIssuedAt, tokenExpiresIn) => {
        dispatch({ type: 'RESTORE_TOKEN', accessToken: accessToken, sharepointToken: sharepointToken, refreshToken: refreshToken, tokenIssuedAt: tokenIssuedAt, tokenExpiresIn: tokenExpiresIn });
      }
    }),
    []);

  return (
    <AuthContext.Provider value={{ authState: state, authUtils: authUtils }}>
      {children}
    </AuthContext.Provider>
  );
};