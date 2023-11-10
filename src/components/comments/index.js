import React from 'react'

const Comments = ({comments}) => {
    console.log(comments)
  return (
    <>
    {comments
   
   
        .map((comment, index) => (
          <>
           <p>{comment.pseudo}</p>
           <p>{comment.body}</p>
           <p>{comment.date}</p>
          </>
        ))}
    </>
  )
}

export default Comments