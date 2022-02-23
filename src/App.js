import {useEffect, useState} from "react";

import "./styles/App.css"


function App(){
  const [apiData,setApiData]=useState([]);
  const[search,setSearch] = useState('');
  const[loading,setLoading] =useState(false);
  const[error,setError] = useState('');
  const[showRandom,setShowRandom] = useState(false);
  const[show,setShow]=useState([]);
  const [suffleData,setSuffleData] =  useState([])
  let randomIndex = 0;
  // for random meal generator::-
  
  const[name,setName] = useState('');
  const[pic,setPic] = useState('');
  const[type,setType] = useState('');
  const[procedure,setProcedure] = useState('');
  const[ingradient,setIngradient] = useState('');


  
 useEffect(()=>{
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
  .then((response)=>{return response.json()})
   .then((d)=>{ setSuffleData(d.meals)  })
   .catch((e)=>{return e});
 },[showRandom])

  const fetchData =()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((response)=>{return response.json()})
     .then((d)=>{  setApiData(d.meals);setSuffleData(d.meals);setLoading(false);  })
     .catch((e)=>{ setSearch('') });
 }

function showResult(){
  setShowRandom(false);
  setShow([]);
  if(search===''){
    alert('enter valid item!')
   
    
  }
  else{
    setLoading(true);
    fetchData() 
    setSearch('');
  } 
}

function showIngredient(id){
  setShow([]);
  apiData.map((e)=>{
    if(e.idMeal===id){
      setShow([e])
    }
  }) 
}
 // function for showing random meal items.. 
function showran(){
  setShow([])
  setSearch('')
  setShowRandom(true);
  randomIndex= Math.floor(Math.random() * 25) + 1
  console.log(randomIndex)
  console.log(suffleData[randomIndex])
  setName(suffleData[randomIndex].strMeal)
  setPic(suffleData[randomIndex].strMealThumb)
  setType(suffleData[randomIndex].strCategory)
  setProcedure(suffleData[randomIndex].strInstructions)
  setIngradient(`${suffleData[randomIndex].strIngredient1} ${suffleData[randomIndex].strIngredient2}
  ${suffleData[randomIndex].strIngredient3} ${suffleData[randomIndex].strIngredient4} ${suffleData[randomIndex].strIngredient5} ${suffleData[randomIndex].strIngredient6} ${suffleData[randomIndex].strIngredient7} ${suffleData[randomIndex].strIngredient8} ${suffleData[randomIndex].strIngredient9} ${suffleData[randomIndex].strIngredient10} ${suffleData[randomIndex].strIngredient11} ${suffleData[randomIndex].strIngredient12}${suffleData[randomIndex].strIngredient13} ${suffleData[randomIndex].strIngredient14} ${suffleData[randomIndex].strIngredient15} ${suffleData[randomIndex].strIngredient16} ${suffleData[randomIndex].strIngredient17} ${suffleData[randomIndex].strIngredient18} ${suffleData[randomIndex].strIngredient19} ${suffleData[randomIndex].strIngredient20}`)
}

  return(
    <div className="box-container">
      <h1 className="text">meal finder</h1>
    <div className="input-container">
      
    <input placeholder="search food " type="text" className="input" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
    
    <button className="btn" onClick={showResult}>Search</button>
    <button className="btn" onClick={showran}> Random</button>
    </div>
    
    <div className="container">


    {showRandom?
    <div className="random-container">
      <h1 className="para">{name}</h1>
      <img className="img2" src={pic} width="200px" height="200px"/>
      <h3 className="para">{type}</h3>
      <p className="para">making procedure</p>
      <br/>
      <h4>{procedure}</h4>
      <br/>
      <br/>
      <p className="para">ingradients:</p>
      <h5>{ingradient}</h5>
    </div>: loading?(<div className="loading-text"><h3 className="loading-text">loading...</h3></div>):
    apiData?  apiData.map((ele)=>{
    return (
    <div className="ListItem-container">
      <img  className="img middle"  key={ele.idMeal} onClick={()=>{showIngredient(ele.idMeal)}}   
       src={ele.strMealThumb} width={"200px"} height={"200px"}
       />
      <h3 className="meal-title font" >{ele.strMeal}</h3>
    </div>
    )
  }): <div className="noresult-text"><h3> result not found!!</h3></div>
  
}
</div>
{ show.map((el)=>{return <div className="search-container">
  <ul>
  <li className="para" key={el.idMeal}>{el.strMeal}</li>
   <li><img className="search-img"  src={el.strMealThumb} height="200px" width={"200px"}/></li> 
   <li className="para">{el.strCategory}</li>
   <br/>
   <br/>
   <p className="para">instructions:</p>
   <li > {el.strInstructions}</li> 
   <br/>
   <br/>
   <br/>
  <p className="para para2">ingradients:</p>
   <li>{`${el.strIngredient1}
   ${el.strIngredient2}
   ${el.strIngredient3}
   ${el.strIngredient4}
   ${el.strIngredient5}
   ${el.strIngredient6}
   ${el.strIngredient7}
   ${el.strIngredient8}
   ${el.strIngredient9}
   ${el.strIngredient10}
   ${el.strIngredient11}
   ${el.strIngredient12}
   ${el.strIngredient13}
   ${el.strIngredient14}
   ${el.strIngredient15}
   ${el.strIngredient16}`}</li>                      
</ul>
</div>

}
)
 }

</div>
   
  )
}

export default App;