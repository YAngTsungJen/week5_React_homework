import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createHashRouter,RouterProvider } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/all.css'
import routes from './routes/index.jsx';
const router = createHashRouter(routes)
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)
