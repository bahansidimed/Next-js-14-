import Link from "next/link";
import { getTodos, addTodo } from "../Actions/ActionsTodos"
import Button from "../Components/Button";
import TodoForm from "../Components/TodoForm";
import DelteTodo from "./DelteTodo";
import Search from "../Components/search";
import Table from "../Components/Table";

const Todospage = async ({searchParams}) => {
  const q=searchParams?.q || "";
  console.log(q);
  const todos = await getTodos(q);
  const columns = [
    { label: 'Title', field: 'tittle' },
    { label: 'Completed', field: 'completed' },
  ];
  return (
    <div className="flex justify-center gap-5 items-center mt-5 flex-col w-full h-full">
      <TodoForm />
      <Search placeholder={"search a product"}/>
      <Table
        data={todos}
        columns={columns}
        componentType ='Products'
       
      />
   

    </div>
  )
}

export default Todospage