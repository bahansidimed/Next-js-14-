
'use client'
import { UpdateTodo } from "../Actions/ActionsTodos"
import Button from "./Button"
import toast from 'react-hot-toast'
import { TodoSchema } from "../Utils/Schema"

const UpdateForm = ({ todos }) => {
  const clientAction = async (formData) => {
    const upT = {
      NameField: formData.get('todoT'),
      EmailField: formData.get('todoC'),
      id: formData.get('id')
    }
    const result = TodoSchema.safeParse(upT);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.path[0] + " : " + issue.message + '.'
      });
      toast.error(errorMessage);
      return;

    }
    const res = await UpdateTodo(result.data);
    if (res?.error) {
      toast.error(res?.error);


    } else {
      toast.success("Update sucefuly")
    }
  }

  return (
    <>
      <div className="w-full max-w-xs flex justify-center items-center h-full ">
        <form className="bg-white   px-8 pt-6 pb-8 mb-4" action={clientAction} >
          <input defaultValue={todos[0].id} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="id" type="hidden" placeholder="ADD TODO" name="id" />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tittle" >
              tittle
            </label>
            <input defaultValue={todos[0].tittle} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tittle" type="text" placeholder="tittle" name="todoT" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              price
            </label>
            <input defaultValue={todos[0].completed} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Price" name="todoC" />
          </div>


          <div className="flex items-center justify-between">
            <Button val='UPDATE'></Button>


          </div>
        </form>

      </div>
    </>
  )
}

export default UpdateForm