//TEMPLATE TO USE
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "./reusables/container";
//------------------------------------------------IMPORTS VIEWS-----------------------------------------------
import Home from "./pages/Home";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import LifeCycles from "./pages/LifeCycle";

// import Navbar from "./Components/Navbar";
//------------------------------------------------CLASS APP-----------------------------------------------
function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Container>
                <Home />
              </Container>
            }
          />
          <Route
            path="/reports"
            exact
            element={
              <Container>
                <Reports />
              </Container>
            }
          />
          <Route
            path="/products"
            exact
            element={
              <Container>
                <Products />
              </Container>
            }
          />
          <Route
            path="/lifecycles"
            exact
            element={
              <Container>
                <LifeCycles />
              </Container>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
