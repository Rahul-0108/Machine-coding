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


