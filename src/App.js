import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Login,Error,Register, Home } from "./pages";
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
