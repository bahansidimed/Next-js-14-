import { ReadTodo } from "@/app/Actions/ActionsTodos";
import UpdateForm from "@/app/Components/UpdateForm"

const page = async ({ params }) => {

  const id = params.id;
  const Utodos = await ReadTodo(id);

  return (
    <div className="w-full flex justify-center items-center h-full">
      <UpdateForm todos={Utodos}></UpdateForm></div>
  )
}

export default page