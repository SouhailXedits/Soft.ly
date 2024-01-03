import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import'./index.css'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { GQL_API_LINK } from './config.ts';



const link = from([
  new HttpLink({ uri: GQL_API_LINK}),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(), 
  link: link
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
