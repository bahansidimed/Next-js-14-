'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from '../Actions/authAction'

const Navbar = () => {
  const user = useCurrentUser();


  const isClientMemberAccessible = () => {
    const isAdmin = user?.role === 'admin';
    const isDeputy = user?.role === 'deputy';
    return isAdmin || isDeputy;
  };
  const pathname = usePathname();
  const isActive = (path) => path === pathname;

  const NavLinks = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Products', path: '/Todos' },
    { id: 3, name: 'Profile', path: '/ClientMember' },
  ];

  return (

    <>
      <div className="w-full h-20 bg-blue-500 bg-opacity-25 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full w-full">
            <ul className='hidden md:flex gap-x-6 text-white '>
              {NavLinks.map((link) => {
                return (
                  <li key={link.id}>
                    <Link
                      href={link.path}
                      className={isActive(link.path) ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' : 'py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 hover:bg-blue-700 hover:text-white'}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
              {user && (
                <li>
                  {isClientMemberAccessible() && (
                    <Link
                      href='/Users'
                      className={
                        isActive('/Users')
                          ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                          : 'py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 hover:bg-blue-700 hover:text-white'
                      }
                    >
                      Users
                    </Link>
                  )}
                </li>
              )}

            </ul>
            <ul className='hidden  md:flex gap-x-6 text-white items-end justify-end w-full'>
              {!user && <li >
                <Link
                  href='/login'
                  className={isActive('/login') ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' : 'hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}
                >
                  LOGIN
                </Link>
              </li>}
              {user && <li>
                <form
                  action={logout}
                >
                  <button className='hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '>

                    <div className="hidden md:block ">Sign Out</div>
                  </button>
                </form>
              </li>}
            </ul>
          </div>
        </div>
      </div>
    </>

  );
};

export default Navbar;
