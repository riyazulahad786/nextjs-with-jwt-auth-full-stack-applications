import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";

export const getDataFromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("tokenUser")?.value || ""
      const decodedtoken:any =  Jwt.verify(token,process.env.TOKEN_SECRET!);
      return decodedtoken.id;

    } catch (error:any) {
        throw new Error(error.message);
        
    }

}