import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            
            // async authorize(credentials) {
            //     const res = await fetch("https://api.escuelajs.co/api/v1/users");
            //     const users = await res.json();

            //     const user = users.find(
            //         (u) =>
            //             u.username === credentials.username &&
            //             u.password === credentials.password
            //     );

            //     if(user) {
            //         return user;
            //     }
            //     else {
            //         return null;
            //     }
            // },

            async authorize(credentials) {
                if (
                    credentials.username === "admin" &&
                    credentials.password === "123456"
                ) {
                    return { id:1, name: "Admin User" }
                }
                return null;
            }
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: user.name,
            }
            return session;
        },
        async jwt({ token, user}) {
            if(user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};