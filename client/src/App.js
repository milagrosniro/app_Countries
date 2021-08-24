
//AGRGAR EL ROUTE PARA QUE EN DETERMINADO PATH QUE RENDERIZE DETERMINADO COMPONENTE
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home/index';
import Landing from './components/Landing/index'
import CountryDetails from './components/CountryDetails/index';
import ActivityForm from './components/ActivityForm/ActivityForm';



function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/countries' component={Home}/>
        <Route path='/postActivity' component={ActivityForm}/>
        <Route path='/countries/:id' component={CountryDetails}/>
      </Switch> 
    </BrowserRouter>
  );
}

export default App;