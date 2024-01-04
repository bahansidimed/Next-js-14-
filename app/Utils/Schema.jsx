 
 import {z} from 'zod'

 export const TodoSchema=z.object({
    NameField:z.string().trim().min(1,{
      message:'filed can not empty'
    }).max(100,{
      message:'todo must to be at least >100 caracter'
    }),
    EmailField:z.string().min(1,{message:"price must be +1"}).trim().toLowerCase(),
    id:z.string().optional()
  })
  export const UserSchema=z.object({
    NameField:z.string().trim().min(1,{
      message:'filed can not empty'
    }).max(100,{
      message:'todo must to be at least >100 caracter'
    }),
    EmailField:z.string().email({message:"email not valide"}).trim().toLowerCase(),
    Password:z.string().min(8,{
        message:"password must be at ltest 8 character"
    }).trim(),
     id:z.string().optional()
  })