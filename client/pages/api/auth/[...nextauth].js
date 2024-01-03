import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize({email, password}, req) {
                const payload = {
                    email,
                    password,
                };

                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login/`, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const user = await res.json();
                if (!res.ok) {
                    throw new Error(user.message);
                }
                if (res.ok && user) {

                    return user;
                }
                return null;
            }
        })
    ],
    // secret: process.env.,
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({token, user}) {
            // console.log(user)
            if (user) {
                return {
                    ...token,
                    accessToken: user.token.access,
                    refreshToken: user.token.refresh,
                };
            }
            return token;
        },

        async session({session, token}) {
            console.log(token)
                session.user.accessToken = token.accessToken
                session.user.refreshToken = token.refreshToken
            return session;
        },
    },
});