import axios from 'axios';


//const API = axios.create({ baseURL:'https://server-stackoverflow.onrender.com'})
//const API = axios.create({ baseURL:'http://localhost:5000'})
//https://internship-satck-overflow.onrender.com/
const API = axios.create({ baseURL:'https://internship-satck-overflow.onrender.com'})

//const API = axios.create({ baseURL:'https://app-stack-overflow-final.onrender.com'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup',authData);


export const sendOtp = (data) => API.post('/otpverify/userOtp',data);

export const userPricingPlan = (userSubscriptionData) => API.post('/userplan/Subscriptions', userSubscriptionData)
export const getAllSubscribedUsers = () => API.get('/userplan/getSubscribers');

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId })

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId ) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId })
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})


export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)


//--Post--//
export const addNewPost = (postData) => API.post("/community/createPost", postData);
export const getAllPosts = () => API.get('/community/fetchAllPosts');
export const deletePost = (id) => API.delete(`/community/delete/${id}`);


//--Comments--//
export const postComment = (id,commentBody,userCommented,commentedto,userId) =>API.patch(`/comment/post/${id}`, {id,commentBody,userCommented,commentedto,userId});
export const deleteComment = (id, commentId) =>API.patch(`/comment/delete/${id}`, commentId);


//-Like--//
export const likePost = (id, userId) =>API.patch(`/community/like/${id}`, { userId });

//-Friends--//
export const addFriend = (id, postId) => API.patch(`/user/addfriend/${id}`,postId)
export const acceptFriend = (id, friendId) => API.patch(`/user/addfriend/accept/${id}`,friendId)
export const deleteFriend = (id, friendId) => API.patch(`/user/addfriend/delete/${id}`,friendId)