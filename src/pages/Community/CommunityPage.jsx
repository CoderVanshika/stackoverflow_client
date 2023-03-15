import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Community.css";
import Feed from "../../components/CommunityMainbar/Feed";
import Posts from "../../components/CommunityMainbar/Posts";

const CommunityPage = () => {
  const user = useSelector((state) => state.currentUserReducer);

  

  return (
    <div>
      <div className="main-bar-community">
        <div className="main-bar-community-header">
          <Link to={user === null ? "/Auth" : "/Friends"} className="friend-btn">
            Friend Requests
          </Link>
          <Link to={user === null ? "/Auth" : "/FindFriends"} className="friend-btn">
            Friends Section
          </Link>
        </div>

            <div className="post-container-outer">
              <Feed/>
              
            </div>
            <Posts/>
          
        
      </div>
    </div>
  );
};

export default CommunityPage;
