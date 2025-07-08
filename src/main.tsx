import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { ThemeProvider } from './providers/ThemeProvider';
import { routes } from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      
   <Provider store={store}>
        
          <RouterProvider router={routes} />
        
      </Provider>
    
    </ThemeProvider>
  </StrictMode>,
)
