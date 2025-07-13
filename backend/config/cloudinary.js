import cloudinary from "cloudinary";
import fs from "fs";


// Function to configure and connect to Cloudinary
export const uploadOnCloudinary = async(filePath) => {

  try {
    // Configuring cloudinary with credentials from environment variables
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECURE,
    });

    
        const uploadResult=await cloudinary.v2.uploader
        .upload(filePath)
        fs.unlinkSync(filePath); // Delete the file after upload
         return uploadResult.secure_url;

  } catch (error) {
    // Logging any errors that occur during configuration
    console.log(error);
            fs.unlinkSync(filePath); // Delete the file after upload
      return res.status(500).json({
        success: false,
        message: "Error uploading to Cloudinary",
      });
  }
};