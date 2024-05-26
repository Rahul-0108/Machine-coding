import React, { useState, useMemo } from "react";

const UserLoginFormConfig = [
  {
      name: 'name', 
      type: "text", 
      className: "width-100",
      component: "input",
      label: 'Name',
      required: true,
      defaultValue: "Rajat Singh",
      value: "",
      placeholder: "Write your full name..."   
 }, {
      name: 'password', 
      type: "password", 
      className: "width-100",
      component: "input",
      label: 'Password',
      required: true,
      defaultValue: "",
      value: "",
      placeholder: "Write your password...."
 },{
      name: 'email', 
      type: "email", 
      className: "width-100",
      component: "input",
      label: 'Email',
      required: true,
      defaultValue: "",
      value: "",
      placeholder: "Write your email..." 
 },{
      name: 'gender', 
      type: "dropdown", 
      className: "width-100",
      component: "dropdown",
      label: 'Gender',
      required: true,
      defaultValue: "male",
      options:[{
        label: "Male",value: "male",
      },{
        label: "Female",value: "female",
      }],
      placeholder: null 
 },{
   name: "submit",
   type: "submit",
   component: "submit",
   buttonValue:"Submit",
   className: "green-btn",
   disabled: false,
 }
];

export const App = () => {
  const [state, setState] = useState({ 
    name: "",
    password: ""
  });

  const handleFormSubmit = e => {
     e.preventDefault(); 
     console.log("Data submitted:", state);
  }

  const handleOnChange = (e, name ) => {
     setState(prevState => ({
        ...prevState,  
      [name]: event.target.value  
     }));
  }

 return (<>     
   <form onSubmit={handleFormSubmit}>
    {UserLoginFormConfig.map(obj => {
      return <>
       <label htmlFor={obj.name}>{obj.label}</label>
       <input 
         name={obj.name} 
         className={obj.className}
         type={obj.name} 
         defaultValue={obj.defaultValue}
         placeholder={obj.placeholder} 
         onChange={e => handleOnChange(e,obj.name)}
       />
      </>
    }
    )} 
   </form>
  </>);
}