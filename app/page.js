import { getTFunodos } from "./Actions/ActionsTodos";

export default  async function Home () {
 const {
  totalP ,
  maxP,
} = await getTFunodos(); 

  return (
    <>
     
     
<div className="flex justify-evenly flex-wrap w-full  gap-1 mt-10">
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">the PRODUCT have max price</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{maxP[0].tittle}</p>
       
</div>
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">the total number of PRODUCT </h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalP[0].numbreP}</p>
       
</div>
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">the total number of PRODUCT </h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalP[0].numbreP}</p>
       
</div>
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">the total number of PRODUCT </h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalP[0].numbreP}</p>
       
</div>
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">the total number of PRODUCT </h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalP[0].numbreP}</p>
       
</div>
</div>
    </>
  )
}
