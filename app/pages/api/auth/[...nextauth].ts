import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters, { TypeORMAccountModel, TypeORMSessionModel }  from "next-auth/adapters";
import Models from "../../../models";

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
    adapter: Adapters.TypeORM.Adapter(
      "mongodb://127.0.0.1:27017/colony",
       {
        models: <any>{
            User: Models.users,
        },
      }
   ),
    callbacks: {
        async signIn(user, account) {
            return true
        },
        async session(session, token) {
            token.accessToken = session.accessToken
            return token
        }
    }
})
