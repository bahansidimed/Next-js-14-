'use server'

import { cache } from 'react'
import mysqlC from "../Utils/Mysql"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { TodoSchema } from '../Utils/Schema'




export const getTodos = cache(async (q) => {
  try {
    if (q!='') {
      const Todos = await mysqlC('SELECT * FROM todos where tittle like?', [`%${q}%`])
      return Todos

    }
    const Todos = await mysqlC('SELECT * FROM todos', [])
  return Todos
  } catch (error) {
    console.log(error);
  }
  
})

export const addTodo = async (NewTodo) => {
  const result =TodoSchema.safeParse(NewTodo);
  if (!result.success) {
    let errorMessage="";
    result.error.issues.forEach((issue)=>{
      errorMessage=errorMessage + issue.path[0 ]+" : "+ issue.message +'.'
    });
    return{
      error :errorMessage
    }
    
  }
  try {
    
   await mysqlC('INSERT INTO todos( tittle, completed) VALUES (?,?)',  [result.data.NameField, result.data.EmailField]);
  revalidatePath('/todos');

  } catch (e) {
   console.log(e);
  }
 
 
}


export const UpdateTodo = async (upT) => {
  
  const result =TodoSchema.safeParse(upT);
  if (!result.success) {
    let errorMessage="";
    result.error.issues.forEach((issue)=>{
      errorMessage=errorMessage + issue.path[0 ]+" : "+ issue.message +'.'
    });
    return{
      error :errorMessage
    }
    
  }
  try {
    
  await mysqlC('UPDATE todos SET tittle=? ,completed=? WHERE id=?', [result.data.NameField, result.data.EmailField,result.data.id]);
  revalidatePath('/todos');

  } catch (e) {
    console.log(e);
  }

  redirect('/Todos')

}
export const DeleteTodo = async (formData) => {
  const ids = formData.get('ids');
  try {
    await mysqlC(`DELETE FROM todos WHERE id=${ids}`);
    revalidatePath('/todos');

  } catch (error) {
    console.log(error);
  }
   
  
 
}

export const ReadTodo = async (id) => {
  try {
   const todo= await mysqlC(`SELECT * FROM todos WHERE id=${id}`);
   return todo;

  } catch (error) {
    console.log(error);
  }
   
  
 
}

export const getTFunodos = async () => {
 const maxP=await mysqlC('SELECT completed ,tittle FROM `todos` ORDER by completed DESC LIMIT 1', [])
 const totalP=await mysqlC('SELECT count(*) as numbreP  FROM `todos` ', []);
 return {maxP,totalP}
}