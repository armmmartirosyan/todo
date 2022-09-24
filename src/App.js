import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/todo'/>}/>
        <Route path='/todo' element={<Todo/>}/>
        <Route path='/not-found' element={<NotFound/>}/>
        <Route path='/*' element={<Navigate to='/not-found'/>}/>
      </Routes>
    </BrowserRouter>
  );
}