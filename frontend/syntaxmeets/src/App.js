import React  from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home/Home';
import SyntaxRoom from './components/SyntaxRoom/SyntaxRoom';
import "fontsource-poppins";
import "./App.css"
import About from './components/About/About';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/:roomId" component={SyntaxRoom} />
      </Switch>
    </Router>
  )
}

export default App





