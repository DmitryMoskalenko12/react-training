import { useState, useEffect, Fragment, useMemo } from "react";
import './love.scss';
import axios from "axios";

const Love = () =>{

const [data, setData] = useState([]);
const [limit, setLimit] = useState(10);
const [page, setPage] = useState(1);
const [totalCount, setTotalCount] = useState(0);
const [search, setSearch] = useState('');
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [fetching, setFetching] = useState(true);
const [filter, setFilter] = useState('all');

/* постраничная пагинация */

const postData = async(limit = 10, page = 1) =>{
const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
return res
}

const getData = async() =>{
  const res = await postData(limit, page)
  setData(res.data)
  setTotalCount(res.headers['x-total-count'])

}

function totalCounts() {
  return Math.ceil(totalCount / limit)
}

const pages = totalCounts(); 

const result = []
for (let i = 0; i < pages; i++) {
  result.push(i + 1);
}
/* удаление */
const delItem = (id) =>{
setData(data.filter(item =>  item.id !== id))
}
/* поиск */
const onSearch = (data, word) =>{
  if (word.length === 0) {
    return data
  }
  return data.filter(item => item.title.includes(word))
}
/* добавление */
const setItem = () =>{
  let item = {
    title,
    body,
    id: Date.now()
  }
  setData([...data, item])
  setTitle('');
  setBody('');
}
/* фильтры */
const onFilterChange = (data, filter) =>{
 switch (filter) {
  case 'dolorem dolore est ipsam':
    return data.filter(item => item.title === filter)

  case 'qui est esse':
    return data.filter(item => item.title === filter)

  case 'all':
    return data.filter(item => item)
  default:
    break;
}
}

useEffect(() =>{
 getData()
},[page])

console.log('ger')
const res = onFilterChange(onSearch(data, search), filter); 


 /* лента водопад  */

/*  useEffect( () => {
  if (fetching) {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
    .then(res => {
      setData([...data, ...res.data])
      setPage( page => page + 1)
    })
    .finally(() => setFetching(false))
  }
},[fetching])

useEffect(() =>{
window.addEventListener('scroll', () => scroll());

return function () {
  window.removeEventListener('scroll', () => scroll())
}
  
},[])

function scroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 3) {
    setFetching(true);
  }
} */

  return(
    <>
    {/* создание нового персонажа */}
    <form onSubmit={(e) => {e.preventDefault(); setItem()}} className="form">
      <input onChange={(e) => setTitle(e.target.value)} value={title} className="name" placeholder="Title" name='name'  required type="text" />
      <input onChange={(e) => setBody(e.target.value)} type ='text' value={body} className="tel" placeholder="Body" name='tel' required/>
      <button className="but">Click</button>
    </form>

    {/* кнопки фильтров */}
    <div className="btnswrap">
      <button onClick={(e)=> setFilter(e.target.textContent)} className="but1">dolorem dolore est ipsam</button>
      <button onClick={(e)=> setFilter(e.target.textContent)} className="but1">qui est esse</button>
      <button onClick={(e)=> setFilter(e.target.textContent)} className="but1">all</button>
    </div>

     {/* поисковой инпут */}
    <input onChange={(e) => {
      setSearch(e.target.value)
      }} className="inp" type="text" placeholder="Enter here" />

     {/*посты */}
       {
         res.map(({body, title, id})=>{
            return(
              <Fragment key={id}>
               <div  className="love">
                 <div className="love__number">{id}</div>
                <div className="love__title">{title}</div>
                <div className="love__body">{body}</div>
              </div>
              <div onClick={() => delItem(id)} className="delete">Delete</div>
              </Fragment>
              
            )
         })
        }

         {/* формирование кнопок */}
          <div className="box">
          {    
          result.map(i =>{
              return (          
              <div key={i} onClick={()=> {getData(); setPage(i)}} className={page === i ? 'but active': 'but'}>
                {i}
              </div>
             )
          })
        }
          </div>
    </>

 )
}
export default Love;