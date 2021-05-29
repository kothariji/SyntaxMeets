import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "fontsource-poppins";
import "./App.css";
import Loader from "./components/Loader/Loader";
import store from "./store/store";
import { Provider } from "react-redux";
import SnackBar from "./components/SnackBar/Snackbar.js"
const Home = React.lazy(() => import("./components/Home/Home"));
const SyntaxRoom = React.lazy(() =>
  import("./components/SyntaxRoom/SyntaxRoom")
);

const App = () => {
  return (
    <Provider store={store} >
      <Router>
        <Suspense fallback={<Loader />}>
          <SnackBar  />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:roomId" component={SyntaxRoom} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
