import jwt from "jsonwebtoken";

//function to generate a token for a user
export const generatetoken =(userID)=>{
    const token = jwt.sign({userID},process.env.JWT_SECRET);
    return token;
}