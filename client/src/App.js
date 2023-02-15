import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Form from './components/Form';
import Dogs from './components/Dogs';
import CardsDetalleId from './components/CardsDetalleId';


function App() {

  return (
    <div className="App">   
    <Route exact path="/home" render={() =>
    <div>
      <Home/>
     </div>
    }/>
    <Route exact path="/form">    
      <Form/>
    </Route>

    <Route exact path="/" component={LandingPage}/> {/*no podemos pasar props por component*/ }
    <Route
          path="/dogs/:id"
          render={({match}) => 
          <CardsDetalleId dogId={match.params.id}/>}
      />
    
    <Route exact path="/dogs" render={() => <Dogs/>}/>{/*con render si, anidado que es el primer ejemplo de home, tambien*/}
    
  {/*  <Route exact path="/">
      <h2>404 Not Found</h2>
  </Route>*/}
    </div>
  
  );
}

export default App;
