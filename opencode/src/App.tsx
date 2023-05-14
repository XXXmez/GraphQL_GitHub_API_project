import React from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import PaginationComponent from "./components/PaginationComponent/PaginationComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Content />
      <PaginationComponent />
    </div>
  );
};

export default App;
