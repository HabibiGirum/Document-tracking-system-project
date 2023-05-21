
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Login, Error, Register, Home ,Landing} from "./pages";
import RecievedNew from './pages/RecievedNew';
import SentPage from './pages/SentPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="*" exact element={<Error />} />
          <Route path="/recived" exact element={<RecievedNew />} />
          <Route path="/sent" exact element={<SentPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
