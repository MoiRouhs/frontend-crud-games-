import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllGames from './Componentes/AllGames/AllGames'
import Create from './Componentes/Create/Create'
import DeleteGame from './Componentes/DeleteGame/DeleteGame'
import GameManagement from './Componentes/GameManagement/GameManagement'
import GetGame from './Componentes/GetGame/GetGame'


function App() {

  return (
    <div>
        <BrowserRouter >
        
          <Routes>
            
            <Route path="/" element={<GameManagement />} />
            <Route path='/allgames' element={<AllGames/>} />
            <Route path='/create' element={<Create />} />
            <Route path='/deletegame' element={<DeleteGame />} />
            <Route path='/getgame' element={<GetGame />} />

          </Routes>

      </BrowserRouter >
    </div>
      
    
  )
}

export default App
