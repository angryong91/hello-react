import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("hi :)");
    // cleanup function
    return () => {
      console.log("bye :(");
    };
  }, []);
  return <h1>Hello</h1>;
}

function Cleanup() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default Cleanup;
