import { useEffect, useState } from "react"
import axios from "axios"

const GetgitubUser=(query,page=1)=>{
    console.log("q",query)
   return  axios(`https://api.github.com/users/${query}/repos`,{
        method:"GET",
        params:{
        per_page:5,
         page
        }
    }
    )

}
 const GitRepo = ()=>{
    const [data,setdata] =useState([])
    const [error,setError] =useState(false)
    const [text,setText] =useState('')
    const [query,setquery]=useState("github")
    const [page,setPage] =useState(1)

    const handlesearch =(query)=>setquery(query)

    useEffect(()=>{
        GetgitubUser(query,page)
        .then((res)=>{
      setdata(res.data)
        })
        .catch((err)=>{
         setError(true)
        })

    },[query,page])

   
    return(
        <div>
            <div>
                <input type="text" value={text} onChange={e=>{setText(e.target.value)}}/>
                <button onClick={()=>{handlesearch(text)}}>Search</button>
            </div>
        { data.map((el)=>{
              return(
                 
                  <div style={{display:"flex" , direction:"col"}}>
                      <img height={"50px"} width="100px" src={el.owner.avatar_url} alt="" />
                      <br></br>
                      <p>{el.name}</p>
                      <p></p>
                     
                  </div>
                  
              )
          })}
          <button disabled={page==1} onClick={()=>setPage(page-1)}>Prev</button>
          <button onClick={()=>setPage(page+1)}>Next</button>
        </div>

    )

    
}
export default GitRepo