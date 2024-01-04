"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
const page =  () => {
const current_user=useCurrentUser();

  return (
<div className=" font-sans h-screen w-full flex flex-row justify-center items-center">
  <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
     <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src="https://avatars.githubusercontent.com/u/67946056?v=4" alt=""/>
     <div className="text-center mt-2 text-3xl font-medium"><strong>NAME :</strong>{current_user?.name}</div>
     <div className="text-center mt-2 font-light text-sm"><strong>Email :</strong>{current_user?.email}</div>
     <div className="text-center font-normal text-lg">User</div>
     <div className="px-6 text-center mt-2 font-light text-sm">
       <p>
        
       </p>
     </div>
    
  </div>
</div>
  );
};

export default page;

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page