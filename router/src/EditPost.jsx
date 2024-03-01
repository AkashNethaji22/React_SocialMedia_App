import React from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'



const EditPost = ({posts,editTitle,seteditTitle,editBody,seteditBody,handleEdit}) => {
  const {id}= useParams()
  const post =posts.find((post)=>(post.id).toString()===id)
  useEffect(()=>{
    if(post){
      seteditTitle(post.title)
      seteditBody(post.body)
    }
  },[post,seteditBody,seteditTitle])
  return (
    <main className='NewPost'>
      {editTitle &&
        <>
         <h2>Edit Post</h2>
        <form className='newPostForm'>
          <label htmlFor='postTitle'>title:</label>
          <input 
              id='PostTitle'
              type='text'
              required
              value={editTitle}
              onChange={(e)=>seteditTitle(e.target.value)}
          />
          <label htmlFor='PostBody'>Post:</label> 
          <textarea
            id='PostBody'
            required
            value={editBody}
            onChange={(e)=>seteditBody(e.target.value)}          
          />
          <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
      </form>     
      </>
      }
   
        {!editTitle && 
               <>
                 <h2>Post not Found</h2>
                 <p>well that's Disappointing</p>
                 <p>
                  <Link  to="/">vist our Home</Link>
                 </p>
               </>
            }
          

    </main>
  )
}

export default EditPost