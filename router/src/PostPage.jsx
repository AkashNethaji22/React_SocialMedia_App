import React from 'react'
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import { DataContext } from './App';

const PostPage = () => {
   const {posts,handledelete}=useContext(DataContext)
   const{id}=useParams();
   const post =posts.find(post=>(post.id).toString()===id)
  return (
     <main className='PostPage'>
         <article className='Post'>
      {
            post && 
               <>
               <h2>{post.title}</h2>
               <p className='postDate'>{post.datetime}</p>
               <p className='postBody'>{post.body}</p>

             <Link to={`/edit/${post.id}`} > <button style={{backgroundColor:"grey"}}
               >Edit</button></Link>

               <button onClick={()=>handledelete(post.id)} 
               className='deleteButton'>Delete</button>
               </>
      }   
            {!post && 
               <>
                 <h2>Post not Found</h2>
                 <p>well that's Disappointing</p>
                 <p>
                  <Link  to="/">vist our Home</Link>
                 </p>
               </>
            }
               
         </article>
        
     </main>
  )
}

export default PostPage