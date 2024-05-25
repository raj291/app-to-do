import './App.css';
import { BrowserRouter as Router,Routes, Route , Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate replace to="/Login" />} />
      <Route path="/home" element={<Home/>}/>
      <Route path='/Login' exact element={<Login/>}/>
      <Route path='/SignUp' exact element={<SignUp/>}/>
    </Routes>
  </Router>
)
function App() {
  return (
    <>
    {routes}
    </>
  );
}

export default App;
