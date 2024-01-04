'use server'

import { cache } from 'react'
import mysqlC from "../Utils/Mysql"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UserSchema } from '../Utils/Schema'
import bcrypt from 'bcrypt';


export const getteall = async (q) => {
  if (q!='') {
    const result = await mysqlC('SELECT * FROM cruds where name like?', [`%${q}%`])
    return result

  }
  const result = await mysqlC('SELECT * FROM cruds', [])
return result
  }

  
  
  export const addUser = async (NewUser) => {
    const result = UserSchema.safeParse(NewUser);
  
    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.path[0] + ' : ' + issue.message + '.';
      });
      return {
        error: errorMessage,
      };
    }
  
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(result.data.Password, 10);
  
      await mysqlC('INSERT INTO cruds (name, email, pas) VALUES (?, ?, ?)', [
        result.data.NameField,
        result.data.EmailField,
        hashedPassword, // Use the hashed password in the query
      ]);
  
      // Assuming `revalidatePath` is a function to trigger revalidation of data
      revalidatePath('/Users');
    } catch (e) {
      console.error(e);
      return {
        error: 'An error occurred while adding the user.',
      };
    }
  };
  
  
  export const DeleteUser = async (formData) => {
    const idu = formData.get('iduser');
    try {
      await mysqlC(`DELETE FROM cruds WHERE id=${idu}`);
      revalidatePath('/Users');
  
    } catch (error) {
      console.log(error);
    }
     
    
   
  }

  export const ReadUser = async (id) => {
    try {
     const User= await mysqlC(`SELECT * FROM cruds WHERE id=${id}`);
     return User;
  
    } catch (error) {
      console.log(error);
    }
     
    
   
  }

  export const UpdateUser = async (Updateuser) => {
    const result = UserSchema.safeParse(Updateuser);
  
    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.path[0] + ' : ' + issue.message + '.';
      });
      return {
        error: errorMessage,
      };
    }
  
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(result.data.Password, 10);
  
      await mysqlC('UPDATE cruds SET name=?, email=?, pas=? WHERE id=?', [
        result.data.NameField,
        result.data.EmailField,
        hashedPassword, // Use the hashed password in the query
        result.data.id,
      ]);
  
      // Assuming `revalidatePath` is a function to trigger revalidation of data
      revalidatePath('/Users');
    } catch (e) {
      console.error(e);
      return {
        error: 'An error occurred while updating the user.',
      };
    }
  
    // Assuming `redirect` is a function to redirect the user
    redirect('/Users');
  };