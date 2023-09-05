import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </QueryClientProvider>
  </Provider>
)
