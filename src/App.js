import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [secondCounter, setSecondCounter] = useState(null);
  const [items, setItems] = useState();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  useEffect(() => {
    return setInterval(() => {
      fetch("https://catfact.ninja/fact")
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
            setSecondCounter(new Date().getSeconds());
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, 5000);
  }, [isLoaded]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <p> {JSON.stringify(items)}</p>
        <p>{secondCounter}</p>
      </>
    );
  }
}
