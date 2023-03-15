import React from "react";
import '../../App.css';
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Posts from "../../components/CommunityMainbar/Posts";
import Feed from "../../components/CommunityMainbar/Feed";
import FindFriends from "../../components/FindFriends/FindFriends";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Community.css'
import CommunityPage from "./CommunityPage";

const Community= () => {
  const User = useSelector((state) => state.currentUserReducer);

    return(
      <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
       <CommunityPage/>
       
        <FindFriends />
      </div>
    </div>
   
            
     
    
    )
}

export default Community

/* <div className='home-container-1'> 
        <LeftSidebar/>
        <div className='home-container-2'>
             <Feed/>
             <Posts/>
             </div>
            <div style={{width:'40%'}}>
              <FindFriends />
            </div>*/
//
//