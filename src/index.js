import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider ,theme} from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import { AuthContext, AuthProvider } from './AuthProvider';
import { store } from "../src/components/redux/store"
import { Provider } from 'react-redux'
import SocketProvider from './providers/ScoketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
 
    <ChakraProvider theme={theme}>
     
      <Provider store={store}>
      {/* <ColorModeScript/> */}
        <AuthProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
            
          
        </AuthProvider>
        </Provider>
        
    </ChakraProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
