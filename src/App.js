import './App.css';
import Login from './Component/Login';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import ViewExpense from './Component/ViewExpense';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/view" element={<ViewExpense/>}/>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
