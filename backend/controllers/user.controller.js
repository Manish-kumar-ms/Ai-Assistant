import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import moment from "moment";
import { geminiResponse } from "../gemini.js";
export const getCurrentUser = async (req, res) => {
    try {
        const userId=req.userId
        const user=await User.findById(userId).select("-password -__v");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "we cant get the current user"
        });
    }
}

export const updateAssistant = async (req, res) => {
    try {
        const userId = req.userId;
        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { assistantName, imageUrl } = req.body;
        let assistantImage 
        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path); // Assuming the file is uploaded and stored in req.file.path
        } else {
            assistantImage = imageUrl; // Use the provided image URL if no file is uploaded
        } 

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {  assistantName, assistantImage },
            { new: true }).select("-password");

            console.log(updatedUser);
            console.log(updatedUser.assistantImage);
            console.log(updatedUser.assistantName);
            return res.status(200).json({
                success: true,
                message: "Assistant updated successfully",
                user: updatedUser
            });
            

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error updating assistant: ${error.message}`,
        });
    }
}


export const askToAssistant = async (req, res) => {
    try {

        const {command} = req.body;
        const user = await User.findById(req.userId);
        user.history.push(command);
        await user.save();
        const userName = user.name;
        const assistantName = user.assistantName;
        const result = await geminiResponse(command,assistantName, userName);
        
        const jsonMatch = result.match(/{[\s\S]*}/);
        if (!jsonMatch) {
            return res.status(400).json({ response: "Sorry, I can't understand" });
        }
        const gemResult = JSON.parse(jsonMatch[0]);
         const type = gemResult.type;

         switch (type) {
             case 'get-date' :
                        return res.json({
                           type,
                           userInput:gemResult.userInput,
                           response:`current date is ${moment().format("YYYY-MM-DD")}`
                        });
              case 'get-time':
                            return res.json({
                           type,
                           userInput:gemResult.userInput,
                           response:`current time is ${moment().format("hh:mm A")}`
                        });
              case 'get-day':
                            return res.json({
                           type,
                           userInput:gemResult.userInput,
                           response:`today is ${moment().format("dddd")}`
                        });
              case 'get-month':
                            return res.json({
                           type,
                           userInput:gemResult.userInput,
                           response:`today is ${moment().format("MMMM")}`
                        });

             case 'google-search':
           case 'youtube-search':
           case 'youtube-play':
           case 'general':
           case  "calculator-open": 
           case "instagram-open": 
           case "facebook-open": 
           case "weather-show" :

           return res.json({
            type,
            userInput:gemResult.userInput,
            response:gemResult.response,
           });

         default:
            return res.status(400).json({ response: "I didn't understand that command." })
      
         }



    } catch (error) {
          return res.status(500).json({ response: "ask assistant error"+error })

    }
}