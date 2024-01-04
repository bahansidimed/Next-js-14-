import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import mysqlC from './app/Utils/Mysql';
import { z } from 'zod';

import bcrypt from 'bcrypt';

async function getUser(email, password) {
  try {
    const user = await mysqlC('SELECT * FROM cruds WHERE email = ?', [email]);

    if (!user || user.length === 0) {
      return null; // User not found
    }

    const hashedPasswordFromDB = user[0].pas;

    // Compare the hashed password from the database with the provided password
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!passwordMatch) {
      return null; // Passwords don't match
    }

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}



export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth
} = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null; // Return null when credentials are not valid
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email, password);

        if (!user || user.length === 0) {
          return null; // Return null when user is not found
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user ) {
        token.role = user[0].role;
        token.name = user[0].name;
        token.email = user[0].email;
      } 

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
      

      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
    }
      return session;
    },
  },
});
