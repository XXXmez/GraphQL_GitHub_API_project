import React from "react";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
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
