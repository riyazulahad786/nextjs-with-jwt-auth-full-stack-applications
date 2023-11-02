import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/Login' || path ==='/Register' 
  const token = request.cookies.get("tokenUser")?.value || ''
  console.log(token,"middlware get token request")

  if(isPublicPath && token){
    // return NextResponse.redirect('/')
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }
  if(!isPublicPath && !token){
    // return NextResponse.redirect('/Login')
    return NextResponse.redirect(new URL('/Login',request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/Profile',
    '/Login',
    '/Register'
  ],
}