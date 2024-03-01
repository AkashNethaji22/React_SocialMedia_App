import React from 'react'
import { useContext } from 'react'
import { DataContext } from './App'

const Newpost = () => {
  const {postTitle,setpostTitle,PostBody,setPostBody,handlesubmit}=useContext(DataContext
  )
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form  className='newPostForm' onSubmit={handlesubmit}>
      <label htmlFor='postTitle'>Title:</label>
      <input 
          id='postTitle'
          type='text'
          required
          value={postTitle}
          onChange={(e)=>setpostTitle(e.target.value)}
      />
      <label htmlFor='PostBody'>PostBody</label>
     <textarea
     id="PostBody" 
     value={PostBody}
     onChange={(e)=>setPostBody(e.target.value)}
     />
     <button type="submit">Submit</button>
       
        

      
      
      
      </form>
    
    </main>
   
  )
}

export default Newpost