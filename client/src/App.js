
import { useRoutes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import {routes} from './Routes'





function App() {
  const element =useRoutes(routes)
  return (
    <div >
      <Navbar/>
   {/* <Login/>*/ }
   {/*<Signup/>*/}
   {/* <Profile/> */}
   {/* <CreateQuote/> */}
   {/* <Home/> */}
   {element}
    </div>
  );
}

export default App;
