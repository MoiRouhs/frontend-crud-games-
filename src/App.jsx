import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllGames from './Componentes/AllGames/AllGames'
import Create from './Componentes/Create/Create'
import DeleteGame from './Componentes/DeleteGame/DeleteGame'
import UpdateGame from './Componentes/UpdateGame/UpdateGame'
import GameManagement from './Componentes/GameManagement/GameManagement'

function App() {

  return (
    <div>
        <BrowserRouter >
        
          <Routes>
            
            <Route path="/" element={<GameManagement />} />
            <Route path='/allgames' element={<AllGames/>} />
            <Route path='/create' element={<Create />} />
            <Route path='/deletegame' element={<DeleteGame />} />
            <Route path='/updategame' element={<UpdateGame />} />

          </Routes>

      </BrowserRouter >
    </div>
      
    
  )
}

export default App
