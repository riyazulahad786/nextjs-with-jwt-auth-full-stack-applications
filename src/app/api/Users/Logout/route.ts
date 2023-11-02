import { NextResponse } from 'next/server';


export async function GET(){
    try {
        const response = await NextResponse.json({
            message:"Logout success",
            success:true
             })
             response.cookies.set("tokenUser","",{
                httpOnly:true,
                expires:new Date(0)
             });
             return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}