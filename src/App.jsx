import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllGames from './Componentes/AllGames/AllGames'
import AddGame from './Componentes/AddGame/AddGame'
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
            <Route path='/addgame' element={<AddGame />} />
            <Route path='/deletegame' element={<DeleteGame />} />
            <Route path='/updategame' element={<UpdateGame />} />

          </Routes>

      </BrowserRouter >
    </div>
      
    
  )
}

export default App
