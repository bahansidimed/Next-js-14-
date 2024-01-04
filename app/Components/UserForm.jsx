'use client'
import { useEffect, useRef } from "react"
import { addUser } from "../Actions/ActionUsers" 
import Button from "./Button"
import toast from 'react-hot-toast'
import { UserSchema } from "../Utils/Schema"

const UserForm = () => {
  const formRef = useRef(null)

  const clientUserAction = async (formData) => {
    const NewUser = {
      NameField: formData.get('Name'),
      EmailField: formData.get('Email'),
      Password: formData.get('password'),
    }
    const result =UserSchema.safeParse(NewUser);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.path[0] + " : " + issue.message + '.'
      });
      toast.error(errorMessage);
      return;

    }
    const res = await addUser(result.data);
    if (res?.error) {
      toast.error(res?.error);


    } else {
      toast.success(" user added sucefuly")
      formRef.current?.reset()
    }
  }

  return (
    <>

<div className="w-full max-w-xs">
  <form
    ref={formRef}
    className="bg-white px-8 pt-6 pb-8 mb-4"
    action={clientUserAction}
  >
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
        id="username"
        type="text"
        placeholder="Username"
        name="Name"
      />
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
        id="email"
        type="text"
        placeholder="Email"
        name="Email"
      />
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="Password"
      >
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
        id="Password"
        type="text"
        placeholder="Password"
        name="password"
      />
    </div>

    <div className="flex items-center justify-between">
      <Button val="ADD USER"></Button>
    </div>
  </form>
</div>

    </>
  )
}

export default UserForm