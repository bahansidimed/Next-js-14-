
'use client'
import { UpdateUser } from "../Actions/ActionUsers"
import Button from "./Button"
import toast from 'react-hot-toast'
import {  UserSchema } from "../Utils/Schema"

const UpdateFormU = ({ user }) => {
  const clientActionU = async (formData) => {
    const Updateuser = {
        NameField: formData.get('Name'),
        EmailField: formData.get('Email'),
        Password: formData.get('pasword'),
        id:formData.get('id'),
      }
    const result = UserSchema.safeParse(Updateuser);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.path[0] + " : " + issue.message + '.'
      });
      toast.error(errorMessage);
      return;

    }
    const res = await UpdateUser(result.data);
    if (res?.error) {
      toast.error(res?.error);


    } else {
      toast.success("Update user sucefuly")
    }
  }

  return (
    <>
      <div className="w-full max-w-xs flex justify-center items-center h-full ">
        <form className="bg-white   px-8 pt-6 pb-8 mb-4" action={clientActionU} >
          <input defaultValue={user[0].id} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="id" type="hidden" placeholder="ADD TODO" name="id" />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              username
            </label>
            <input defaultValue={user[0].name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="username" name="Name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              email
            </label>
            <input defaultValue={user[0].email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" name="Email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">
              Password
            </label>
            <input defaultValue={user[0].pas} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Password" type="text" placeholder="Password" name="pasword" />
          </div>



          <div className="flex items-center justify-between">
            <Button val='UPDATE USER'></Button>


          </div>
        </form>

      </div>
    </>
  )
}

export default UpdateFormU