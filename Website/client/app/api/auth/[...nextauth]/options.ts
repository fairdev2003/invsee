import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { redirect } from "next/navigation";

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
            async authorize(credentials, req) {
                try {
                    const password = credentials?.password.trim();
                    const email = credentials?.email.trim();
                    console.log(`'${email}'`)
                    console.log(`'${password}'`)
                    const response: any = await axios.post(`http://localhost:3000/api/login`, {password: password, email: email});
                    credentials
                    
                    console.log("response: ", response.data);

                    if (response.data) {
                        return response.data
                    } else {
                        return null
                    }
                    
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
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
        
    }
    
}
