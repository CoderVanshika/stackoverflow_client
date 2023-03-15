import React from 'react';
import Post from './Post';

const UserPostList = ({postsList}) => {
  
    return(
        <>
           {
                postsList?.map((post) => (
                <Post post={post} key={post._id} />
                

            ))
           }
           
        </>
  )
}

export default UserPostList


