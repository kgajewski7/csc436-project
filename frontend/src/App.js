import React, { useReducer } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateTodo from './todo/CreateTodo';
import appReducer from "./Reducers";
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'
import { StateContext } from "./contexts/StateContext";

function App() {

  const [ state, dispatch ] = useReducer(appReducer, { user: null, todos: [] })

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/todo" element={<Layout />}>
              <Route path="/todo/create" element={<CreateTodo />} />
              <Route path="/todo/:id" element={<TodoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  )
}

export default App;
