import { getteall } from "../Actions/ActionUsers"
import UserForm from "../Components/UserForm";
import { auth } from '@/auth';
import Search from "../Components/search";
// import { redirect } from "next/navigation";
import Table from "../Components/Table";

const page = async ({searchParams}) => {

  const q=searchParams?.q || "";
  const result = await getteall(q);
  const session = await auth()
  if (!session || session?.user.role=='') {
    return(
      <div className="flex justify-center items-center h-screen w-full ext-center">
        <div className="h-80">
        <p className="font-bold bg-red-300 ">DENIED</p></div>
      </div>
    )
    
  }

  const columns = [
    { label: 'NOM', field: 'name' },
    { label: 'EMAIL', field: 'email' },
  ];
  return (

    <div className="flex justify-center gap-5 items-center mt-5 flex-col w-full h-full">
      <UserForm></UserForm>
      <Search placeholder={"search a user"}/>

      <Table data={result} columns={columns}         componentType ='Users'
 />

          

    </div>


  )
}

export default page