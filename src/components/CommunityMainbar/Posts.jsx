import React from "react";
import Post from "./Post";
import "./Posts.css";
import { useSelector } from "react-redux";
import { useLocation,useNavigate} from "react-router-dom";
import UserPostList from "./UserPostList";
import { Link } from "react-router-dom";


const PostDetails = () => {
  const location = useLocation()
  const postsList = useSelector((state) => state.postReducer);
  //console.log("Post list:",postsList)
  const User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()

 
 

  return(
    <div className='posts'>
    
   
    {
                    postsList?.data === null ?
                    <h1>Loading .......</h1> :
                    <>
                       
                     <h1> { postsList?.data.length } Posts </h1>
                     <UserPostList postsList={postsList?.data}/> 
                   
                     </>
                }
  </div>
  

)

}
export default PostDetails;

/*<Link to={User === null ? "/Auth" : "/Friends"} className="friend-btn">
                      <button style={{marginTop:4,background:"#81ecec", fontSize: "18px" }}>  Check your Friends list </button>
                       </Link> */
/*
PostsList.data?.map((post) => {
      return <Post post={post} key={post._id} />;
      
       <div className="posts">
       {PostsList.map((post) => {
                  return <Post post={post} key={post._id} />;*/
