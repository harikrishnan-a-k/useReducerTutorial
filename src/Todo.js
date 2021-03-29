import React,{useState , useReducer} from 'react'

const newTodo=(name)=>{
  return {...{},id:new Date().toISOString(),name:name,isComplete :false};
} 
const reducer=(state, action)=>{
  switch(action.type){
    case 'ADD_TODO': console.log('add_todo');
                      let value=newTodo(action.payload.name);
                      console.log("value",value);
                    return [...state , value];
    case 'TOGGLE_TODO': const newState=state.map((todo)=>{
                                              if(action.payload.id===todo.id){
                                                return {...todo,isComplete:!todo.isComplete}
                                              }
                                              return todo;
                                        });
                        return newState;
    
    case 'DELETE_TODO' : return state.filter((todo)=>{return todo.id!==action.payload.id})

    default : return state;

  }
}

export default function Todo() {
  const [name , setName] = useState('');
  
  const [state, dispatch] = useReducer(reducer,[]);
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch({type:'ADD_TODO' , payload:{name:name}});
    console.log(name);
    console.log(state);
    setName('');
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={ e=> setName(e.target.value) }/>
      </form>

      <h4>Todos.</h4>
      <ul>
        {state.map((todo)=>{
          return (
            <li key={todo.id}> <input onChange={()=>dispatch({type:"TOGGLE_TODO",payload:{id:todo.id}})} type="checkbox" checked={todo.isComplete}/> <span style={{color:todo.isComplete?'#AAA':'#000'}}>{todo.name}   created on {todo.id}</span> <button onClick={()=>dispatch({type:"DELETE_TODO",payload:{id:todo.id}})}>X</button> </li>
          )
        })}
      </ul>
      
    </div>
  )
}
