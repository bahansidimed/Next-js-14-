'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../Actions/authAction';
import Button from './Button';
const LoginForm = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <>
     
   
    <section className="bg-gray-50 dark:bg-gray-900">
  
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  {errorMessage && (
            
            <div className="text-center p-4 w-1/4 mb-10 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span className="font-medium  ">{ errorMessage}</span>
</div>
          
        )}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg  px-6 pb-4 pt-8">
        
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded py-[9px] border  focus:border-blue-500 focus:ring-blue-500  pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-4">

        <Button val={'sing in'} /></div>
      
      </div>
    </form>
          </div>
      </div>
  </div>
</section></>
  )
}

export default LoginForm

