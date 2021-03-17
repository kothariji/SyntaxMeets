import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "fontsource-poppins";
import "./App.css";
import Loader from "./components/Loader/Loader";

const Home = React.lazy(() => import("./components/Home/Home"));
const About = React.lazy(() => import("./components/About/About"));
const SyntaxRoom = React.lazy(() =>
  import("./components/SyntaxRoom/SyntaxRoom")
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/:roomId" component={SyntaxRoom} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
