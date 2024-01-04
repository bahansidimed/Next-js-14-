'use client'
import { useEffect, useRef } from "react"
import { addTodo } from "../Actions/ActionsTodos"
import Button from "./Button"
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { TodoSchema } from "../Utils/Schema"

const TodoForm = () => {
  const formRef = useRef(null)

  const clientAction = async (formData) => {
    const NewTodo = {
      NameField: formData.get('todoT'),
      EmailField: formData.get('todoC'),
    }
    const result = TodoSchema.safeParse(NewTodo);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.path[0] + " : " + issue.message + '.'
      });
      toast.error(errorMessage);
      return;

    }
    const res = await addTodo(result.data);
    if (res?.error) {
      toast.error(res?.error);


    } else {
      toast.success("added sucefuly")
      formRef.current?.reset()

    }
  }

  return (
    <>

      <div className="w-full max-w-xs">
        <form ref={formRef} className="bg-white   px-8 pt-6 pb-8 mb-4" action={clientAction} >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              title
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" id="title" type="text" placeholder="title" name="todoT" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              price
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" id="email" type="text" placeholder="price" name="todoC" />
          </div>

          <div className="flex items-center justify-between">
            <Button val='ADD'></Button>


          </div>
        </form>

      </div>
    </>
  )
}

export default TodoForm