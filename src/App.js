import { Route, BrowserRouter, Routes,Link } from 'react-router-dom';
import { Login,Error,Register } from "./pages";
import Home from './pages/dashboard/Home'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path = '/home' exact element={<Home />} />
          <Route path='*' exact element ={<Error />} />
        </Routes>
      </BrowserRouter>

      
    </>
  );
}

export default App;
