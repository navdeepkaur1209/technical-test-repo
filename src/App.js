// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Locales from 'components/Locales';
// import RTLLayout from 'components/RTLLayout';
// import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';
import { ApolloProvider } from '@apollo/client';
import useGraphQLClient from './hooks/useGraphQLClient';

// auth-provider
import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

function App() {
  // GraphQL
  const client = useGraphQLClient(process.env.REACT_APP_GRAPHQL_API_URL);

  return (
    <ApolloProvider client={client}>
      <ThemeCustomization>
        {/* <RTLLayout> */}
        <Locales>
          {/* <ScrollTop> */}
          <AuthProvider>
            <>
              <Notistack>
                <Routes />
                <Snackbar />
              </Notistack>
            </>
          </AuthProvider>
          {/* </ScrollTop> */}
        </Locales>
        {/* </RTLLayout> */}
      </ThemeCustomization>
    </ApolloProvider>
  );
}

export default App;
