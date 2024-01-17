import { NextResponse } from 'next/server'

export function middleware(request) {
    const authenticate = request.cookies.get('next-auth.session-token')?.value

    if (authenticate && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    if (authenticate && request.nextUrl.pathname === '/signup') {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    if (!authenticate && request.nextUrl.pathname === '/profile') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (!authenticate && request.nextUrl.pathname === '/todos') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // if (!authenticate) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }
}

// export const config = {
//     matcher: ['/profile', '/todos'],
// }
