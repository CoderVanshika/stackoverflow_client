import { useState } from "react";
import "./Comments.css";
import { useSelector,useDispatch } from "react-redux";
import { postComment, deleteComment } from "../../actions/community";
import moment from "moment/moment";
import Avatar from '../../components/Avatar/Avatar'

const Comments = ({id, commentList, user, commentedTo, postId, userId }) => {
 
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const User = useSelector((state) => state.currentUserReducer);
 
const handleComment = () => {
  if (comment === '') {
    alert("Enter answer")
  }else{
    setComment("");
    dispatch(postComment({ id, commentBody: comment , userCommented: user, commentedto: commentedTo, userId}))
  }
};

const handleDelete = () => {
  dispatch(deleteComment(postId, { commentId: comment._id }));
};

  return (
    <div className="comments">
      <div className="write">
      {user && (
          <>
        <Avatar backgroundColor="orange" px='8px' py='5px'>{user.charAt(0).toUpperCase()}</Avatar>
        <input type="text" value={comment} onChange={(e) => {setComment(e.target.value)}} />
        <button onClick={handleComment}>Comment</button>
        </>
      )}
      </div>
      
      {commentList.map((comment) => (
        <div className="comment">
          <Avatar backgroundColor="orange" px='8px' py='5px'> {comment.userCommented.charAt(0).toUpperCase()}</Avatar>
          <div className="info">
            <span>{comment.userCommented}</span>
            <p>{comment.commentBody}</p>
          </div>
        
          <span className="date">Commented {moment(comment.commentedOn).fromNow()}</span>
        </div>
      ))}
      
    </div>
  );
};

export default Comments;
