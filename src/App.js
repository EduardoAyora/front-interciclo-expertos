import { Routes, Route } from 'react-router-dom'

import Inicio from './routes/Inicio'
import Hechos from './routes/Hechos'

export default function App() {
  return (
    <div style={{ backgroundColor: '#f3f4f6' }}>
      <div className='contenedor py-8 min-h-screen'>
        <Routes>
          <Route path='/hechos' element={<Hechos />} />
          <Route path='/' element={<Inicio />} />
        </Routes>
      </div>
    </div>
  )
}
