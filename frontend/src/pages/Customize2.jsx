import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";
import axios from 'axios'

const Customize2 = () => {
  const {userData,setUserData,serverUrl, backendImage,selectedImage }=useContext(userDataContext)
      const [assistantName,setAssistantName]=useState(userData?.AssistantName || "")
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
       
       const handleUpdateAssistant = async() => {
         // Logic to update the assistant name
         setLoading(true);
         try {
          let formData = new FormData();
          formData.append('assistantName', assistantName);
          if(backendImage){
            formData.append('assistantImage', backendImage); // we use the new uploaded image

          }
          else{
            formData.append('imageUrl', selectedImage); // if we not upload a new image, we use the selectedImage
          }
          const result = await axios.post(`${serverUrl}/api/user/update`, formData,{withCredentials: true});
          setLoading(false);
          console.log(result.data.user);
          setUserData(result.data.user);
          navigate("/");
          
         } catch (error) {
          setLoading(false);
           console.log(error);

         }
       }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]  '>
        <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={()=>navigate("/customize")}/>
        <h1 className='text-white mb-[40px] text-[30px] text-center '>Enter Your <span className='text-blue-200'>Assistant Name</span> </h1>
        <input type="text" placeholder='eg. shifra' className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent  text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
         required onChange={(e)=>setAssistantName(e.target.value)} value={assistantName} />
      
       {assistantName &&  <button className='min-w-[300px] h-[60px] mt-[30px] text-black font-semibold cursor-pointer  bg-white rounded-full text-[19px] '
          disabled={loading} onClick={()=>{handleUpdateAssistant()
                  navigate("/")
          }}>
            {loading ? "Creating Your Assistant..." : "Finally Create Your Assistant"}
          </button>}

    </div>
  )
}

export default Customize2
