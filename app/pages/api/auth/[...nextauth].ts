import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.G_CLIENT_ID,
            clientSecret: process.env.G_CLIENT_SECRET,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
        })
    ],
    jwt : {
    	signingKey: process.env.G_JWT_SK
    },
    database: "mongodb://127.0.0.1:27017/colony",
    callbacks: {
        async signIn(user, account) {
            user.accessToken = account.accessToken
            user.refreshToken = account.refreshToken
            return true
        },
        async session(session, user) {
            user.accessToken = session.accessToken
            return user
        },
        async jwt(token, user) {
            if (user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
            }
            return token;
        }
    }
})
