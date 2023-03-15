import React,{useState, useEffect} from "react";
import "./Feed.css";
import { useDispatch,useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addNewPost, fetchAllPosts } from "../../actions/community";
import app from "../../firebase"
import { getStorage, ref , uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import './SocialCommunity.css';
import Avatar from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo} from "@fortawesome/free-solid-svg-icons";


const Feed = () => {

  const dispatch = useDispatch()
  const User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()

    const [postdescription, setPostDescription] = useState('')
    const [imageFile, setImageFile] = useState(null);
    //console.log("Image:", imageFile?.name)
    const [videoFile, setVideoFile] = useState(null)
    console.log("Video:", videoFile?.name)

    const [fileUrl, setFileUrl] = useState(null);
    const [videoPerc, setVideoPerc] = useState(0);
    const [imagePerc, setImagePerc] = useState(0);
    
   

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imageType"
          ? setImagePerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("URL:",downloadURL)
          setFileUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (User) {
      imageFile && uploadFile(imageFile, "imageType");
      setVideoFile(null);
      setVideoPerc(0);
    }
  }, [imageFile]);

  useEffect(() => {
    if (User) {
      videoFile && uploadFile(videoFile, "videoType");
      setImageFile(null);
      setImagePerc(0);
    }
  }, [videoFile]);

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    if (User) {
      dispatch(addNewPost({ postdescription, imageUrl: fileUrl ,userPosted: User.result.name,}));
    } else {
      alert("Please login");
    }
    window.location.reload()
  };

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    if (User) {
      dispatch(addNewPost({ postdescription, videoUrl: fileUrl, userPosted: User.result.name, }));
    } else {
      alert("Please login");
    }
    window.location.reload()
  };
    
  return (
    <div className="post-container">
          <form action=""
            onSubmit={imagePerc > 0 ? handleSubmitImage : handleSubmitVideo}> 
        
        <div className="post-header">
        <Link to={`/Users/${User?.result?._id}`} className="user-Profile-Link">
        
        <Avatar
          backgroundColor="#009dff"
          px="10px"
          py="7px"
          borderRadius="50%"
          color="white"
        >
       {User?.result.name.charAt(0).toUpperCase()} 
        </Avatar>
        </Link>
       
        <div className="user-detail">
          <h4> {User?.result.name} </h4>
        </div>
        <button className="add-friend-btn" >
          <span> Post </span>
       </button>
        </div>
        <textarea  name='postDescription'  id="postDescription"  onChange={(e)=>{setPostDescription(e.target.value)}}
              placeholder="Share your experience"  cols="30" rows="10"></textarea>

        <div className="post-bottom">
          <div className="left">
            <label htmlFor="image">  
              <div className="like-comment">
                <FontAwesomeIcon icon={faImage}/>
                <input type="file" id="image" name="image" style={{display:"none"}} onChange={(e)=>setImageFile(e.target.files[0])}/>
                <p>&nbsp;   {imagePerc > 0  ? "Uploading " + imagePerc + "%"  :  "   Add Image"}</p>
              </div>
              </label>

              <label htmlFor="video">
              <div className="like-comment">
              <FontAwesomeIcon icon={faVideo}/>
                <input type="file" id="video" name="video" style={{display:"none"}} onChange={(e)=>setVideoFile(e.target.files[0])}/>
                <span> &nbsp; {videoPerc > 0 ? "Uploading " + videoPerc + "%" : "Add Video"}</span> 
              </div>
            </label>

            
          
          </div>
          
          
        </div>
        </form>
        
      </div>
    
  )
};

export default Feed;


 /*const handlePost = (e) => {
      e.preventDefault();
      if(imageFile !== null)
      {
      const fileName = new Date().getTime()+ imageFile?.name
      const storage = getStorage(app)
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + '% done')
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          //Handle unsuccessful uploads
        },
        () => {
          //Handle unsuccessful uploads on complete
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL)
            setFileUrl(downloadURL);
          });
        }
      ); 
    }
    else if(videoFile !== null)
    {
      const fileName = new Date().getTime()+ videoFile?.name
      const storage = getStorage(app)
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, videoFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + '% done')
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          //Handle unsuccessful uploads
        },
        () => {
          //Handle unsuccessful uploads on complete
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(" Video File available at", downloadURL)
            setFileUrl(downloadURL);
          });
        }
      ); 
    }
  }
    

    
  const handleSubmitImage = async (e) => {
    e.preventDefault();
    setImageFile(e.target.files[0])
    if (User) {
      dispatch(addNewPost({ postdescription, imageUrl: fileUrl }));
    } else {
      alert("Please login");
    }
    //dispatch(fetchAllPosts());
    //setRefresh(!refresh);
  };

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    if (User) {
      dispatch(addNewPost({ postdescription, videoUrl: fileUrl }));
    } else {
      alert("Please login");
    }
    //dispatch(fetchAllPosts());
    //setRefresh(!refresh);
  };*/
//<input type="file" id="file" name="image" style={{display:"none"}} onChange={handlePicture}/>
//onChange={(e)=>{setPostImage(e.target.files[0])}}
//  <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setItem({ ...item, image: base64 })}/>
// onChange={e => setItem({ ...item, postdescription: e.target.value })}
//<button onClick={uploadImage}> Upload </button>


    /*const uploadImage = () => {
      if(imageUpload == null)
        return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4() }`)
      uploadBytes(imageRef, imageUpload).then(()=>{
         alert("Image uploaded")
      })*/

       //const [postImage, setPostImage] = useState({ filename: ' ', bytes: '' })
    //const [imageUpload,setImageUpload]= useState(null)
    
    /*const upload = async()=>{
      try{
        const formData = new FormData();
        formData.append("image",file)
        const res= await API.post('/post/upload',formData);
        return res.data

      }
      catch (err) {
        console.log(err)
      }
    }*/

    //const handlePicture =(e) => {
      //setImageUpload(e.target.files[0])
     //setPostImage(e.target.files[0])
      //setPostImage(e.target.files[0])
     //setPostImage({ filename: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
   //}
   
   /*const handleClick = async (e) => {
     e.preventDefault();
     let imgUrl = "";
     if (file) 
     imgUrl = await upload();
     dispatch(communityPost({ postdescription, file:imgUrl, userId: User?.result._id}, navigate))
     setPostDescription("");
     setFile(null);
   }*/

    /*const handleClick= async(e)=>{
     e.preventDefault()
      var formData = new FormData();
      formData.append('postDescription',postdescription)
      formData.append('image',postImage)
      var response = await postData('community/CreatePost', formData)
      alert(response.status)
      //dispatch(communityPost({ postdescription, postImage, userId: User?.result._id}, navigate))
      alert("Post uploaded")
    }*/
     
   
    /*const [item, setItem] = useState({ postdescription: '', image: '' });
    const [items, setItems] = useState([])
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      const result = await createPost(item);
  
      setItems([...items, result]);
    }*/