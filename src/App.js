import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider} from "@chakra-ui/react";
import Home from "./pages/home/Home";
import Pay from "./pages/pay/Pay";
import Payout from "./pages/withdrawal/Payout";

import './App.css';

function App() {
  return (
    < ChakraProvider>
      <Router>
        <Route path='/' component={Home} exact/>
        <Route path="/deposit/:id/:amount" component={Pay} />
        <Route path="/payout/:wdid/:id/:amount/:userwallet" component={Payout} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
