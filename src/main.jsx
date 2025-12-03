
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './providers/AppProvider';
import { AppRoutes } from './routes/route';
import './index.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </StrictMode>
);
