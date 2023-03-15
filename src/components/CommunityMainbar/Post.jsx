import React, {useState} from 'react'
import './Post.css'
import './SocialCommunity.css'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Comments from './Comments';
import Avatar from '../../components/Avatar/Avatar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { likePost, deletePost } from '../../actions/community';
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { addFriend, acceptFriend, deleteFriend } from '../../actions/users';
import copy from 'copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import { WhatsappShareButton, WhatsappIcon} from "react-share";



  const Post = ({ post }) => {
    const { id } = useParams()
      const [commentOpen, setCommentOpen] = useState(false);
      const User = useSelector((state) => state.currentUserReducer);
      const dispatch = useDispatch()
      const [shareOpen, setShareOpen] = useState(false)

      const location = useLocation()
      //console.log(location)
      
      const url = 'http://localhost:3000'
      
      const handleShare = () => {
        copy(url+location.pathname)
        alert('Copied url : '+url+location.pathname )
        console.log("Pathanme:",location.pathname)
        //alert('Copied url : '+url+location.pathname + '/'+`${post._id}`)
        setShareOpen(true)
      }
      const handleLike = () => {
        User === null
          ? alert("Login to like post")
          : dispatch(likePost(post._id, User?.result._id));
      };
     
      
      const liked = true;
      const handleDelete = () => {
        dispatch(deletePost(post._id));
      };


      const users = useSelector((state) => state.usersReducer);
      const currentProfile = users.filter((user) => {
    return user._id === User?.result._id;
  });

  const isFriend = currentProfile[0]?.friends.filter((friend) => {
    return friend.friendId === post.userId;
  });

  const sentRequest = currentProfile[0]?.sentRequests.filter((friend) => {
    return friend === post.userId;
  });

  const recivedRequest = currentProfile[0]?.friendRequests.filter((friend) => {
    return friend.friendId === post.userId;
  });

  const handleFriend = () => {
    dispatch(addFriend(User?.result._id, { friendId: post.userId }));
  };

  const handleDeleteFriend = () => {
    dispatch(deleteFriend(User?.result._id, { friendId: post.userId }));
  };
      
  return (
    <div className="post-container">
      <div className="post-header">
    
        <Link to={`/Users/${post.userId}`} className="user-Profile-Link">
          <Avatar
            backgroundColor="#009dff"
            px="10px"
            py="7px"
            borderRadius="50%"
            color="white"
          >
            {post.userPosted.charAt(0).toUpperCase()}
          </Avatar>
          <div className="user-detail">
            <h4>{post.userPosted}</h4>
            <p>
              Posted {moment(post.postedOn).fromNow()}
            </p>
          </div>
        </Link>
        {User && (
          <>
            {post.userId !== User?.result._id ? (
              <>
                {isFriend?.length === 0 ? (
                  <>
                    {sentRequest.length === 0 && recivedRequest.length === 0 ? (
                      <button className="add-friend-btn" onClick={handleFriend}>
                        <span> Add Friend </span>{" "}
                        <FontAwesomeIcon
                          className="plus-display"
                          icon={faPlus}
                        />
                      </button>
                    ) : (
                      <button
                        style={{ cursor: "auto" }}
                        className="add-friend-btn"
                      >
                        Pending
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="add-friend-btn"
                    onClick={handleDeleteFriend}
                  >
                    Remove Friend
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                className="delete-post-btn"
                onClick={handleDelete}
              >
                Delete Post
              </button>
            )}
          </>
        )}
      </div>
      
      <p>{post.postdescription}</p>
              {post.imageUrl?
              <img src={post.imageUrl} alt="" /> : post.videoUrl ?
              <video controls>
              <source src={post.videoUrl} type="video/mp4" width="50" />
              </video> : <></> }
      
      <div className="liked-by">
        <p>{post.likedBy.length} likes</p>
        <p>{post.comments.length} comments</p>
      </div>
      <div className="post-bottom">
        <div className="like-comment" onClick={handleLike}>
          {post.likedBy.findIndex((id) => id === String(User?.result._id)) ===
          -1 ? (
            <FontAwesomeIcon icon={faHeart} style={{ color:"black", transition: "0.3s" }} />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "red", transition: "0.3s" }}
            />
          )}
          <p>like</p>
        </div>
        <div
          className="like-comment"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <FontAwesomeIcon icon={faComment} />
          <p>comment</p>
        </div>
           
            
      </div>
      {commentOpen && 
              <Comments
              userId={User?.result._id}
              postId={post._id}
              commentedTo={post.userPosted}
              id={post._id}
              user={User?.result.name}
              commentList={post.comments.reduce((acc, item)=> [item].concat(acc), [])}
            />
           }
    </div>
  );
      
    };
    
    export default Post;
