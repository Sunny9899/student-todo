import {useState,usEffect, useEffect} from "react";

export const Todo= ()=>{

    const [todos,setTodos]=useState([]);
    const [page,setPage]=useState(1);
    const [text,setText]=useState("");
  
    
    useEffect(()=>{
        Data();
    },[page])
    

    const Data=()=>{
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=5`)
        .then((d)=> d.json())
        .then((res) =>{
            //console.log(res);
            setTodos(res);
        })
    } 

    return (
    <div>

    <input 
    placeholder="Enter Todo" 
    onChange={(txt)=>{
        //console.log(txt);
        setText(txt.target.value);}}
    />

    <button
    onClick={()=>{
        const data={status:false,title:text};

        fetch("http://localhost:3001/todos",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "content-type": "application/json", 
            },
        }).then(Data);
    }}
    >AddtoDo</button>
    
    {todos.map((e)=>(
      <div key={e.id}>
          {e.title} - {e.status ? "Done" : "To be Done"}
      </div>
    ))}

    <button
    onClick={()=>{
        if(page<=1){
            //console.log("p1 "+page);
            setPage(1);
        }
        else{
        setPage(page-1);
        }
    }}
    >Prev</button>

    <button
    onClick={()=>{
        setPage(page+1);
    }}    
    >Next</button>
    </div>
    );
}