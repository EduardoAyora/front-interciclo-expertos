import { Routes, Route } from 'react-router-dom'

import Inicio from './routes/Inicio'
import Otro from './routes/Otro'

export default function App() {
  return (
    <div style={{ backgroundColor: '#f3f4f6' }}>
      <div className='contenedor py-8 min-h-screen'>
        <Routes>
          <Route path='/otro' element={<Otro />} />
          <Route path='/' element={<Inicio />} />
        </Routes>
      </div>
    </div>
  )
}
