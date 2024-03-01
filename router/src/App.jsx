import {  Route, Routes, useNavigate } from 'react-router-dom'
import About from './About'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import Missing from './Missing'
import Nav from './Nav'
import Newpost from './Newpost'
import PostPage from './PostPage'
import { useState } from 'react'
import { format } from 'date-fns'
import { useEffect } from 'react'
import axios from 'axios'
import EditPost from './EditPost'
import { createContext } from 'react'


export const DataContext =createContext()
function App() {
  const [posts,setposts]=useState([])
  const [search,setsearch]=useState('')
  const[searchresults,setsearchresults]=useState([])
  const[postTitle,setpostTitle]=useState()
  const[PostBody,setPostBody]=useState()
  const[editTitle,seteditTitle]=useState()         
  const[editBody,seteditBody]=useState('')
  const navigate =useNavigate()


  useEffect(()=>{

    const fetchpost = async() =>{
      try{
        const response=await axios.get("http://localhost:3500/posts")
        // console.log(response);
        setposts(response.data)
        // console.log(posts);      
      }
      catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.Header);
        }
        else{
          console.log(`error:${err.message}`);
        }
           
      }
     

    }
    fetchpost()

  },[])
 
 

  useEffect(()=>{
    const filterresults =posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setsearchresults(filterresults.reverse())   
  },[posts,search])
  
  const handlesubmit = async(e)=>{
    e.preventDefault();
    const id=posts.length ?posts[posts.length-1].id+1 :1
    const datetime = format(new Date(),"MMMM dd ,yyyy pp")
    const newpost={id,title:postTitle,datetime,body:PostBody}
       try{
        const response =await axios.post("http://localhost:3500/posts",newpost)
        const allposts=[...posts,response.data]
        setposts(allposts)
        setpostTitle('')
        setPostBody('')
       }
       catch(err){
          console.log(`error:${err.message}`);
        }
  }
  const handledelete=async(id)=>{
   try{
    await axios.delete(`http://localhost:3500/posts/${id}`)
    const postsList = posts.filter((post)=>post.id!==id)
    setposts(postsList)
    navigate('/')
   }
   catch(err){
    console.log(`error:${err.message}`);
  }
  }
  const handleEdit = async(id)=>{
    const datetime = format(new Date(),"MMMM dd ,yyyy pp")
    const updatedpost={id,title:editTitle,datetime,body:editBody}
    try{
      const response =await axios.put(`http://localhost:3500/posts/${id}`,updatedpost)
      setposts(posts.map((post)=>post.id===id?{...response.data}:post))
      seteditTitle('')
      seteditBody('')
      navigate('/')

    }
    catch(err){
      console.log(`error:${err.message}`);
      
    }
  }

  return (
    <div className='App'>
<DataContext.Provider value={
  {title:"Social Media",search,setsearch,postTitle,setpostTitle
  ,PostBody,setPostBody,handlesubmit,posts,handledelete
  }}>  
      <Header />
      <Nav/>
  <Routes>
    <Route path='/' element={
        <Home posts={searchresults}/>
      }/>
    <Route path='/post' >  
    <Route index element={
      < Newpost />
    }/>
    <Route path=":id" element={<PostPage /> }/>
    </Route>
    <Route path='/edit/:id'element=
        {<EditPost
          posts={posts}
          handleEdit={handleEdit}
          editTitle={editTitle}
          seteditTitle={seteditTitle}        
          editBody={editBody}
          seteditBody={seteditBody}
        />}/>
    <Route path='/about' element={
        <About/>
    }/>
    <Route path='*' element={
        <Missing/>
    }/>
    </Routes>

        <Footer/> 
  </DataContext.Provider>      
    </div>
  )
  }
export default App


{/* <nav>
<ul>
 <li><Link to="/">home</Link></li>
 <li><Link to="/about">About</Link></li>
 {/* <li><Link to="/newpost">newpost</Link></li> */}
//  <li><Link to="/postpage">Postpage</Link></li>
// </ul>
// </nav>
// <Routes> */}
// <Route path='/' element={<Home/>}/>
// <Route path='/about' element={<About/>}/>
// <Route path='/newpost' element={<Newpost/>}/>
// <Route path='/postpage' element={<Postlayout/>}>
//   <Route index element={<PostPage/>}/>
//   <Route path=':id' element={<Post/>}/>
//   <Route path='newpost' element={<Newpost/>}/>
// </Route>  

// <Route path='*' element={<Missing/>}/>
// </Routes>