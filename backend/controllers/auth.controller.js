import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
 

 export const signup=async (req,res)=>{
   try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    // check if user already exists
     const existEmail= await User.findOne({email})
     if (existEmail) {
         return res.status(400).json({ message: "Email already exists" });
     }

     if(password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
     }

     const hashedpassword=await bcrypt.hash(password,10); 

     const user=await User.create({
         name,
         email,
         password: hashedpassword,
         
     })

     const token = await genToken(user._id);

     res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7*24 * 60 * 60 * 1000, // 7 day
            sameSite: "None",
            secure: true, // Set to true if using HTTPS
     })

     return res.status(201).json({
       success: true,
        message: "User created successfully",
        user
     })

   } catch (error) {
      return res.status(500).json({
        message:`signup error: ${error.message}`,
        });
   }
 }

  export const login=async (req,res)=>{
   try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    // check if user already exists
     const user= await User.findOne({email})
     if (!user) {
         return res.status(400).json({ message: "Email not found" });
     }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

     const token = await genToken(user._id);

     res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7*24 * 60 * 60 * 1000, // 7 day
             sameSite: "None",
            secure: true,  // Set to true if using HTTPS
     })

     return res.status(201).json({
      success: true,
        message: "Login successful",
        user
     })

   } catch (error) {
      return res.status(500).json({
        message:`login error: ${error}`,
        });
   }
 } 

export const logout=async (req,res)=>{
      try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successful" });
      } catch (error) {
        return res.status(500).json({
          message: `Logout error: ${error}`,
        });
      }
}
