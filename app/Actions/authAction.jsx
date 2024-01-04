'use server'
import { signIn, signOut } from '../../auth';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState,
  formData
) {
  try {
    await signIn('credentials', formData);

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'كلمة المرور او البريد الالكتروني خاطئه';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
 export const logout= async  () => {
  await signOut();
}