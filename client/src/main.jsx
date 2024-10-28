import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store.js';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';


const createApolloClient = () => {
  const cache = new InMemoryCache();

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  return new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache,
    defaultOptions,
  });
};

const client = createApolloClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Toaster />
        <App />
      </BrowserRouter>
    </ApolloProvider>
    </PersistGate>
    </Provider>
  </StrictMode>
);
