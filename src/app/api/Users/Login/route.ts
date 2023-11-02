import { connect } from "@/app/dbConfig/dbConfig";
import User from '@/app/models/userModels'
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();
export async function POST(request:NextResponse){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;

        //check user exist
        const user =await User.findOne({email})
        if(!user){
            return NextResponse.json({error:'user does not exist'},{status:500})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:'user does not have valid password'},{status:500})
        }


        //create token data
         
        const tokenData = {
            id:user._id ,
             username:user.username,
             email:user.email
        }

        //genrate token
         const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'});

         const response = NextResponse.json({
            message:"Login is successfull",
            success:true
         })
         //cookies
         response.cookies.set("tokenUser",token,{
            httpOnly:true,
         })
         return response;


    } catch (error :any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}