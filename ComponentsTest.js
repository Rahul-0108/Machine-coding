import { useEffect, useState } from "react";

/*
Child2 mounted
CHild mounted
ComponentsTest mountedInitial Value
ComponentsTest mounted
ComponentsTest2 mounted
*/
export const ComponentsTest = () => {
    const [value, setValue] = useState("Initial Value");

    useEffect(() => {
        console.log("ComponentsTest mounted" + value);
    }, [value]);

    useEffect(() => {
        console.log("ComponentsTest mounted");
    }, []);

    useEffect(() => {
        console.log("ComponentsTest2 mounted");
    }, []);

    return (
        <div>
            <h1>Parent Component</h1>
            <Child />
            <button onClick={() => setValue("Updated Value" + Math.random())}>
                Update Value
            </button>
            <p>Current Value: {value}</p>
        </div>
    );
}

const Child = () => {

    useEffect(() => {
        console.log("Child mounted");
    }, []);

    return (
        <div>
            <h1>Child Component</h1>
            <Child2 />
        </div>
    );
}

const Child2 = () => {

    useEffect(() => {
        console.log("Child2 mounted");
    }, []);

    return (
        <div>
            <h1>Child2 Component</h1>
        </div>
    );
}
























// Parent is rendered
// ComponentsTest.js:12 Child is rendered
// ComponentsTest.js:21 ParentSibling is rendered
// ComponentsTest.js:14 Child committed effect
// ComponentsTest.js:5 Parent committed effect
// ComponentsTest.js:23 ParentSibling committed effect

import React, { useEffect } from "react";
function Parent({ children }) {
  console.log("Parent is rendered");
  useEffect(() => {
    console.log("Parent committed effect");
  }, []);

  return <div>{children}</div>;
}

function Child() {
  console.log("Child is rendered");
  useEffect(() => {
    console.log("Child committed effect");
  }, []);

  return <p>Child</p>;
}

function ParentSibling() {
  console.log("ParentSibling is rendered");
  useEffect(() => {
    console.log("ParentSibling committed effect");
  }, []);

  return <p>Parent's Sibling</p>;
}

export  function App1() {
  return (
    <>
      <Parent>
        <Child />
      </Parent>
      <ParentSibling />
    </>
  );
}



