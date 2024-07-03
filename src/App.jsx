import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Pagination,Form, Users } from './components/index'
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Form/>}/>
          <Route path='/users' element={<Pagination/>}/>
          <Route path='/profile' element={<Users/>}/>
      </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App