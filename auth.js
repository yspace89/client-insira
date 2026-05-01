import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

        // Mock Database User - IN PRODUCTION: Fetch from your real database
        const mockUser = {
          id: "1",
          name: "Admin Y Space",
          email: "admin@yspace.id",
          password: "$2a$10$X9qW1rY.U7G1E5J4R3tK2u9L6m0P1o2N3a4B5v6C7d8E9f0G1h2I3", 
        };

        if (credentials.email !== mockUser.email) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          mockUser.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        return { id: mockUser.id, name: mockUser.name, email: mockUser.email };
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
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = !nextUrl.pathname.startsWith('/login');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
});
