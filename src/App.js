import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider} from "@chakra-ui/react";
import Home from "./pages/home/Home";
import Pay from "./pages/pay/Pay";
import './App.css';

function App() {
  return (
    < ChakraProvider>
      <Router>
        <Route path='/' component={Home} exact/>
        <Route path="/pay/:id/:amount" component={Pay} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
