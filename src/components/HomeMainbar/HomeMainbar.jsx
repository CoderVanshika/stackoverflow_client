import React from "react";
import {  useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import './HomeMainbar.css';
import { useEffect } from "react";
import QuestionList from "./QuestionList";
import { fetchAllUsers } from "../../actions/users";

const HomeMainbar = () => {
    const location = useLocation()
    //const user = 1;
    const user = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const questionsList = useSelector(state => state.questionsReducer)
    const subscribersList = useSelector(state => state.paymentReducer)
    useEffect(() => {
        dispatch(fetchAllUsers())
      },[])
   

    /*var questionsList = [{
        _id : 1,
        upVotes : 3,
        downVotes : 2,
        noOfAnswers : 2,
        questionTitle : "What is a function ?",
        questionBody : "It meant to be",
        questionTags : ["java", "node js", "react js", "mongodb","express js"],
        userPosted : "mano",
        userId: 1,
        askedOn : "jan 1",
        answer : [{
            answerBody : "Answer",
            userAnswered : "Kumar",
            answeredOn : "jan 2",
            userId : 2
        }]
    },{
        _id : 2,
        upVotes : 3,
        downVotes : 2,
        noOfAnswers : 0,
        questionTitle : "What is a function ?",
        questionBody : "It meant to be",
        questionTags : ["javascript", "R", "python"],
        userPosted : "mano",
        userId: 1,
        askedOn : "jan 1",
        answer : [{
            answerBody : "Answer",
            userAnswered : "Kumar",
            answeredOn : "jan 2",
            userId : 2
        }]
    },{
        _id : 3,
        upVotes : 3,
        downVotes : 2,
        noOfAnswers : 0,
        questionTitle : "What is a function ?",
        questionBody : "It meant to be",
        questionTags : ["javascript", "R", "python"],
        userPosted : "mano",
        userId: 1,
        askedOn : "jan 1",
        answer : [{
            answerBody : "Answer",
            userAnswered : "Kumar",
            answeredOn : "jan 2",
            userId : 2
        }]
    }]*/

    const checkAuth = ()=>{
        if(user === null)
        {
            alert("login or signup to ask a question")
            navigate('/Auth')
        }
        else{
            const getSubscribers = subscribersList.data.filter((usersubscriber) =>
            
            //console.log("Output :",usersubscriber.userId,"Data:",User?.result._id)
            (usersubscriber.userId===user?.result._id))
            //console.log("h :",getSubscribers)
            if(getSubscribers.length!==0)
            {
                navigate('/AskQuestion')
            }
            else{
                navigate('/PricingPlans')
            }
            //navigate('/AskQuestion')
           // console.log("get subscribers:", getSubscribers)
            //navigate('/AskQuestion')
        }
    }
    return(
        <div className="main-bar">
            <div className="main-bar-header">
              {
                location.pathname === '/' ? <h1>Top Questions</h1> : <h1> All Questions </h1>
              }
             <button onClick={checkAuth} className="ask-btn"> Ask Question </button>
            </div>
            <div>
                {
                    questionsList.data === null ?
                    <h1>Loading .......</h1> :
                    <>
                     <p> { questionsList.data.length } questions </p>
                     <QuestionList questionsList={questionsList.data}/>   
                     </>
                }
            </div>
            
        </div>
        
            
        
    )
}

export default HomeMainbar