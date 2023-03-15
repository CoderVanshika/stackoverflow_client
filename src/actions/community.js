import * as api from '../api/index'

export const addNewPost = (postData,navigate) => async (dispatch) => {
    try {
      const { data } = await api.addNewPost(postData);
      console.log("Action of post:",data)
      dispatch({ type: "ADD_POST", payload: data });
      dispatch(fetchAllPosts())
      navigate('/Community')
    } catch (error) {
      console.log(error);
    }
  };


  export const fetchAllPosts = () => async (dispatch) => {
    try {
      const { data } = await api.getAllPosts();
      dispatch({ type:'FETCH_ALL_POSTS' , payload: data });
      
    }
     catch (error) {
      console.log(error);
    }
  };

  export const deletePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.deletePost(id);
      dispatch(fetchAllPosts());
    } catch (error) {
      console.log(error);
    }
  };
  

  export const likePost = (id, userId) => async (dispatch) => {
    try {
      await api.likePost(id, userId);
      dispatch(fetchAllPosts());
    } catch (error) {
      console.log(error);
    }
  };


  export const postComment = (commentData) => async (dispatch) => {
    try {
      const { id, commentBody, userCommented, commentedto, userId } = commentData;
      const { data } = await api.postComment(
        id,
        commentBody,
        userCommented,
        commentedto,
        userId
      );
      dispatch({ type: "POST_COMMENT", payload: data });
      dispatch(fetchAllPosts());
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteComment = (id, commentId) => async (dispatch) => {
    try {
      const { data } = await api.deleteComment(id, commentId);
      dispatch(fetchAllPosts());
    } catch (error) {
      console.log(error);
    }
  };
 
 