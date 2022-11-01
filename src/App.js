import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navigate from './components/Navigate';
import Main from './pages/Main';
import MoleTable from './pages/MoleTable'
import Surprise from './pages/Surprise';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/' element={<Navigate />} />
          <Route path='mole-table' element={<MoleTable />} />
        </Route>
        <Route path='surprise' element={<Surprise />} />
      </Routes>
    </>
  );
}

export default App;
