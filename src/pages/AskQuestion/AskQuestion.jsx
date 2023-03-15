import React, {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import './AskQuestion.css';
import { askQuestion } from '../../actions/question';
import { fetchAllSubscribers } from "../../actions/payment";

        
const AskQuestion = () => {
   const [questionTitle, setQuestionTitle] = useState('')
   const [questionBody, setQuestionBody] = useState('')
   const [questionTags, setQuestionTags] = useState('')

   const dispatch = useDispatch()
   const User = useSelector((state) => (state.currentUserReducer))
   const navigate = useNavigate()

  
   useEffect(function()
   {
    fetchAllSubscribers()
   },[])

  const subscribersList = useSelector(state => state.paymentReducer)

   const handleSubmit=(e)=>{
    e.preventDefault()
    console.log('Subscribers:', subscribersList)
    const getSubscribers = subscribersList.data.filter((usersubscriber) =>
       //console.log("Output :",usersubscriber.userId,"Data:",User?.result._id)
       (usersubscriber.userId===User?.result._id)
    )
    console.log("Get subscribers : ",getSubscribers)
    
    if(getSubscribers[0].noOfQuestions>=1)
    {
     
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result._id, noOfQuestions:(getSubscribers[0].noOfQuestions)-1}, navigate)) 
        navigate('/')
        window.location.reload();
        if(getSubscribers[0].noOfQuestions==0)
        {
          alert("Sorry you can't post")
          navigate('/') 
        }
      }
    else if(getSubscribers[0].noOfQuestions==0)
      {
        alert("Sorry, your today's validitiy of posting questions is over")
        navigate('/')
      }
    else if(getSubscribers[0].noOfQuestions==-1){
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result._id, noOfQuestions:getSubscribers[0].noOfQuestions}, navigate))
        navigate('/')
      }
    else
    { 
      alert("Your todays limit is exhausted")
      navigate('/')
    }
    window.location.reload();
  }

/*if(getSubscribers[0].noOfQuestions>0 || getSubscribers[0].noOfQuestions==-1)
    {
      if(getSubscribers[0].noOfQuestions==-1)
      {
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result._id, noOfQuestions:getSubscribers[0].noOfQuestions}, navigate)) 
      }
       else if(getSubscribers[0].noOfQuestions==0)
      {
        //dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result._id, noOfQuestions:getSubscribers[0].noOfQuestions}, navigate)) 
        alert("Sorry you can't post")
        navigate('/')
        
        
      }
      else{
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result._id, noOfQuestions:(getSubscribers[0].noOfQuestions)-1}, navigate))
      }
      
    }
    else
    { 
      //if(getSubscribers[0].noOfQuestions==0)
      //{
        //alert("Can't post")
      //}
      alert("Your todays limit is exhausted")
      navigate('/')
    }
    //console.log({ questionTitle, questionBody, questionTags})
   
  }*/

   const handleEnter = (e) => {
     if(e.key === 'Enter'){
       setQuestionBody(questionBody + "\n")
     }
    
   }

    return(
          <div className="ask-question">
            <div className="ask-ques-container">
            <div className="ask-question-header">
              <h1> Ask a public question</h1>
            </div>
              <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor="ask-ques-title">
                        <h4> Title </h4>
                        <p>Be specific and imagine you're asking a question to another person</p>
                        <input type="text" id='ask-ques-title' onChange={(e)=>{setQuestionTitle(e.target.value)}} placeholder="e.g. Is there an R function for finding the index of an element in a vector ?"/>     
                    </label>

                    <label htmlFor="ask-ques-body">
                        <h4> Body </h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <textarea name=" " id="ask-ques-body" onChange={(e)=>{setQuestionBody(e.target.value)}} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
                          
                    </label>

                    <label htmlFor="ask-ques-tags">
                        <h4> Tags </h4>
                        <p>Add up to 5 tags to describe what your question is about </p>
                        <input type="text" id='ask-ques-tags' onChange={(e)=>{setQuestionTags(e.target.value.split(" "))}} placeholder="e.g. (xml typescript wordpress)"/>     
                    </label>
                </div>
                <input type="submit" value="Review your question" className="review-btn"/>

              </form>
            </div>

          </div>
       
        
    )
}

export default AskQuestion