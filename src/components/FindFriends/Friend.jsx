import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import { addFriend, deleteFriend } from "../../actions/users";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Friend = ({ user }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => {
    return user._id === User?.result._id;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("Current profile:",currentProfile)
  console.log("Users:",users)
  const isFriend = currentProfile[0]?.friends.filter((friend) => {
    return friend.friendId === user._id;
  });

  const sentRequest = currentProfile[0]?.sentRequests.filter((friend) => {
    return friend === user._id;
  });

  const recivedRequest = currentProfile[0]?.friendRequests.filter((friend) => {
    return friend.friendId === user._id;
  });

  const handleFriend = () => {
    dispatch(addFriend(User?.result._id, { friendId: user._id }));
  };

  const handleDeleteFriend = () => {
    dispatch(deleteFriend(User?.result._id, { friendId: user._id }));
  };

  return (
    <div className="user-header">
      <Avatar
        backgroundColor="#009dff"
        px="10px"
        py="7px"
        borderRadius="50%"
        color="white"
      >
        {user.name.charAt(0).toUpperCase()}
      </Avatar>
      <h5>{user.name}</h5>
      {User ? (
        <>
          {isFriend?.length === 0 ? (
            <>
              {sentRequest.length === 0 && recivedRequest.length === 0 ? (
                <button className="user-btn" onClick={handleFriend}>
                  <span> Add Friend </span> 
                  <FontAwesomeIcon icon={faPlus}/>
                </button>
              ) : (
                <button style={{ cursor: "auto" }} className="user-btn">
                  Pending
                  <FontAwesomeIcon icon={faClock} style={{marginLeft:6}}/>
                </button>
              )}
            </>
          ) : (
            <button className="user-btn" onClick={handleDeleteFriend}>
              Remove Friend
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          )}
        </>
      ) : (
        <button className="user-btn" onClick={() => {navigate("/auth")}}>
          <span> Add Friend </span>
        </button>
      )}
    </div>
  );
};

export default Friend;
