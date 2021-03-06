
import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchArea from "./SearchArea";
import { Link, Router } from "@reach/router";
import WatchArea from "./WatchArea";
import ColorContext from "./ColorContext";

const App = () => {
  const themeColor = useState("darkblue");

  return (

    <ColorContext.Provider value={themeColor}>
      <div>
        <header>
          <Link to="/">WeTube</Link>

        </header>

        <Router>
          <SearchArea path="/" ></SearchArea>
          <WatchArea path="/watch/:id" />
        </Router>

      </div>
    </ColorContext.Provider>

  )

};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
