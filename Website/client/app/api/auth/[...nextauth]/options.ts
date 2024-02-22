import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { redirect } from "next/navigation";
import { connectMongo } from "../../mongo/mongo";

export const options: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email:", type: "email", placeholder:"Enter your email"},
                password: {label : "Password", type: "password", placeholder: "Enter your password"}
            },
            // @ts-ignore
            async authorize(credentials: any, req) {
                    const password = credentials.password as string;
                    const email = credentials.email as string;
                    console.log("Credentials from authorize: ", credentials);
                    
                    const client = await connectMongo();
                    const db = client.db("test");

                    const user = await db.collection("users").find({password: password, email: email}).toArray();
                    console.log("User from authorize: ", user);


                    if (user.length > 0) {
                        return user
                    } else {
                        return false
                    }
                
            },
            
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            user.email = credentials?.email as string;
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                
                return true
            } else {
                return false
            }
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        },
        async session({ session, user, token }) {
            return session
        },
        
    }
    
}