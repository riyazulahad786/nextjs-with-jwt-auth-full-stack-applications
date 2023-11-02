import { connect } from "@/app/dbConfig/dbConfig";
import User from '@/app/models/userModels'
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password}=reqBody
        console.log(reqBody,"post userdata")

        // check useralready exist
        const userExist = await User.findOne({email})

        if(userExist){
            return NextResponse.json({error:"user already exist"}, {status:400})
        }


        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser,"saveduser hash")

        return NextResponse.json({
            message:"user created successfully",
            success:true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},
           { status:500})
        
    }
}