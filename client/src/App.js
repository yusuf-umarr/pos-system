import './App.css';
// import Fa from 'react-icons/fa'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { useState} from 'react'

//Screens
import  HomeScreen from './screens/HomeScreen';
import  CartScreen from './screens/CartScreen';
import AddProductScreen from './screens/AddProductScreen';

//components
import Navbar from './components/Navbar'
import Backdrop from './components/Backdrop'
import SideDrawer from './components/SideDrawer'

import State from './context/State';
import Footer from './components/Footer';
import Orders from './screens/Orders';
import LandingPage from './screens/LandingPage';

function App() {

  const [sideToggle, setSideToggle] = useState(false)
    

  return (
    <State>
      <Router>
        <Navbar  click={() => setSideToggle(true)}/>
        <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
        <main>
          <Switch>
          <Route exact path="/" > 
            <LandingPage /> 
          </Route>
          <Route exact path="/home" > 
            <HomeScreen /> 
          </Route>
          <Route exact path="/add" > 
            <AddProductScreen  /> 
          </Route>
          <Route exact path="/orders" > 
            <Orders  /> 
          </Route>

          <Route path="/cart" render={(props) => <CartScreen {...props } />}/> 
          </Switch>
          
        </main>
        <Footer />
      </Router>
     </State>
  );
}

export default App;
