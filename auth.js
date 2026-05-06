import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Mock Database Users
        const USERS = [
          {
            id: "1",
            name: "Admin Y Space",
            email: "admin@yspace.id",
            password: "$2b$10$0Lo6xysTO4iftgbq9EVKFOxvYePzDD7wRLZGKiVQENzTbfWTBKnv.", 
          },
          {
            id: "2",
            name: "Guest Research",
            email: "guest@research.id",
            password: "$2b$10$JWCGkUdQGghT3AsyLRS8DOBtMER0on0Mbv3PzFHJh8OCkL30j/hDe", // password123
          }
        ];

        const user = USERS.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());

        if (!user) {
          console.log("Login failed: User not found ->", credentials.email);
          throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          console.log("Login failed: Incorrect password for ->", credentials.email);
          throw new Error("Incorrect password");
        }

        console.log("Login success for ->", user.email);
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      // TEMPORARY: Open to public as requested
      return true;
    },
  },
});
