import { getDataFromToken } from "@/app/helpers/getDataFromToken";

getDataFromToken
import { NextResponse,NextRequest } from "next/server";
import User from "@/app/models/userModels";
import { connect } from "@/app/dbConfig/dbConfig";
connect();

export async function GET(request:NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId}).
        select("-password")
        return NextResponse.json({
           message:"user found",
           data:user
        })
    } catch (error :any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}
