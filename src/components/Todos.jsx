import {useState,usEffect, useEffect} from "react";

const axios= require("axios");

export const Todo= ()=>{

    const [todos,setTodos]=useState([]);
    const [page,setPage]=useState(1);
    const [text,setText]=useState("");
    const [text2,setText2]=useState("");
  
    
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
    className="inputTitle"
    placeholder="Title..." 
    onChange={(txt)=>{
        //console.log(txt);
        setText(txt.target.value);
    }}
    />

    <input 
    className="inputBody"
    placeholder="Add Task..." 
    onChange={(txt2)=>{
        //console.log(txt);
        setText2(txt2.target.value);}}
    /> 

    <button className="addBtn"
    onClick={()=>{
        const data={status:false,title:text+" "+text2};

        fetch("http://localhost:3001/todos",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "content-type": "application/json", 
            },
        }).then(Data);
    }}
    >Add</button>
    
    <div id="newtodo">
 
    {todos.map((e)=>(
      <div key={e.id}>
          {e.title} 

          <button id="delete"
          onClick={()=>{
              axios.delete(`http://localhost:3001/todos/${e.id}`)
              .then(Data);
          }}
          >Delete
          </button>

      </div>
    ))}

    </div>

    <button
    className="prev"
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
    className="next"
    onClick={()=>{
        setPage(page+1);
    }}    
    >Next</button>
    </div>
    );
}