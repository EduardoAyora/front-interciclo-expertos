import { Routes, Route } from 'react-router-dom'

import { AppContextProvider } from './context/AppContext'
import Inicio from './routes/Inicio'
import Hechos from './routes/Hechos'
import Navbar from './components/layout/Navbar'

export default function App() {
  return (
    <AppContextProvider>
      <div style={{ backgroundColor: '#f3f4f6' }}>
        <div className='min-h-screen'>
          <Navbar />
          <div className='contenedor py-8'>
            <Routes>
              <Route path='/hechos' element={<Hechos />} />
              <Route path='/' element={<Inicio />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppContextProvider>
  )
}
