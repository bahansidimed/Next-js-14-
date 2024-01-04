export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname === '/';
      const isOnTodosOrUsers = nextUrl.pathname.startsWith('/Todos') || nextUrl.pathname.startsWith('/Users')||nextUrl.pathname === '/ClientMember' ;

      if (isOnHome) {
        return true; // Allow access to the exact home page for both logged in and non-logged in users
      } else if (isOnTodosOrUsers) {
        if (isLoggedIn) {
          return true; // Allow access to Todos and Users pages for logged in users
        } else {
          return false; // Redirect unauthenticated users to login page
        }
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl)); // Redirect logged in users to Todos page if they try to access other pages
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};
