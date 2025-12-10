import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App.jsx'
import AuthComponent from '../public/auth/authComponent.jsx'
import Admin from '../public/admin/admin.jsx'
import ProtectedRoute from '../public/auth/protectedRoute.jsx'
import AdminProtectedRoute from '../public/auth/adminProtectedRoute.jsx'
import Landingpage from '../public/auth/landingpage.jsx'
import Tutorial from '../public/auth/tutorial.jsx'
import { NoticeProvider } from '../public/context/notiiceProvider.jsx'
  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Landingpage /> }/>
        <Route path='/tutorial' element={<Tutorial /> }/>
        <Route path='/login/signup' element={<AuthComponent /> }/>
        <Route path='/dashboard' element={ <ProtectedRoute> 
          <NoticeProvider>
            <App />
          </NoticeProvider>
        </ProtectedRoute>} />
        <Route path='/admin' element={ <AdminProtectedRoute> <Admin /> </AdminProtectedRoute> } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
