import logo from './logo.svg';
import './App.css';

import React,{useState,useReducer} from 'react';

import Todo from './Todo';

function App() {

  const reducer =(state,action)=>{
    switch(action.type){
      case "increment" : 
                return {count : state.count+1};
      case "decrement" :
                return {count : state.count-1};
      default : return state;
    }

  }


  const [state, dispatch] = useReducer(reducer,{count:0});

  return (
    <>
    <div style={{fontSize:"5rem !important",color:"blue"}}>
    <button onClick={()=>{dispatch({type:"decrement"})}}> - </button>
    <span style={{fontSize:"10rem !important",color:"blue", fontWeight:"bold"}}> {state.count} </span>
    <button onClick={()=>{dispatch({type:"increment"})}}> + </button>
    </div>
    <Todo/>
    </>
  );
}

export default App;
