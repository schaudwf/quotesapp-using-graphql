import { model } from "mongoose"
import {quotes, users} from "./fakedb.js"
import {randomBytes} from "crypto"
import mongoose from "mongoose"
import bcrypt from"bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js"

 const User = mongoose.model("user")
 const Quote = mongoose.model("QUOTE")
const resolvers = {
    Query:{
       users: async ()=> await User.find({}),
       user: async (_,{_id})=>await User.findOne({_id:_id}),
       quotes:async ()=>await Quote.find({}).populate("by","_id firstName"),
       iquote: async (_,{by})=> await Quote.find({by}),
       myProfile: async (_,args,{userId})=>{
        if(!userId) throw new Error("you must be logged in first");
        return await User.findOne({_id:userId})
       }
    },
    User:{
        quotes:async  (ur)=> await Quote.find({by:ur._id})
    },
    Mutation:{
        singupUser :async (_,{userNew}) => {
         const user = await User.findOne ({email:userNew.email})
         if(user){
            throw new Error("User already exists with that email")
         }
      const hashedpassword=  await  bcrypt.hash(userNew.password,12)

      const newUser = new User({
        ...userNew,
        password : hashedpassword,
      })
     return  await newUser.save()
        },
        signinUser :async (_,{userSignin}) => {
          const user =  await User.findOne({email : userSignin.email})
          if(!user){
            throw new Error("USER doesn't Exists with that email")
          }
         const doMatch = await bcrypt.compare(userSignin.password, user.password)
         if(!doMatch){
            throw new Error("email or password is invalid");
         }
const token = jwt.sign({userId:user._id},JWT_SECRET)
return {token}
           },
           createQuote: async (_,{name},{userId})=>{
            if(!userId) throw new Error("you must be logged in first");
         const newQuote=   new Quote({
                name,
                by:userId,
            })
            await newQuote.save()
            return "Quote Saved Successfully"

           },

         
        /////Delete User
        deleteUser: async (_, { userId }) => {
         try {
           // Validate user ID
           if (!userId) {
             throw new Error("User ID is required.");
           }
   
           // Attempt to delete the user
           const deletedUser = await User.findByIdAndDelete(userId);
   
           // If no user is found, return an error
           if (!deletedUser) {
             return {
               success: false,
               message: "User not found. Deletion unsuccessful.",
             };
           }
   
           // Return success response
           return {
             success: true,
             message: "User deleted successfully.",
           };
         } catch (error) {
           // Handle errors gracefully
           return {
             success: false,
             message: `Failed to delete user: ${error.message}`,
           };
         }
       },
        
    }
}



export default resolvers