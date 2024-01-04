import { ReadUser } from "@/app/Actions/ActionUsers";
import UpdateFormU from "@/app/Components/UpdateFormU";

const page = async ({ params }) => {

  const id = params.id;
  const user =await ReadUser(id);

  return (
    <div className="w-full flex justify-center items-center h-full">
      <UpdateFormU user={user}></UpdateFormU>
      </div>
  )
}

export default page