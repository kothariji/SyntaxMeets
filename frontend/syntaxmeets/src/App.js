import React  from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home/Home';
import SyntaxRoom from './components/SyntaxRoom/SyntaxRoom';
import "fontsource-poppins";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:roomId" component={SyntaxRoom} />
      </Switch>
    </Router>
  )
}

export default App





