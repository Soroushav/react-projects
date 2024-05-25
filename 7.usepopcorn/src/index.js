import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));

function Test() {
  const [rate, setRate] = useState(0);
  return(
    <div>
      <StarRating onSetRating={setRate} />
      <p>You have voted for {rate}.</p>
    </div>
  )
}

root.render(
  <React.StrictMode>
    <App />
    {/* <Test/>
    <StarRating
      color="red"
      starLength={3}
      messages={["Bad", "Mediocre", "awesome"]}
      defaultRating={1}
    /> */}
  </React.StrictMode>
);
