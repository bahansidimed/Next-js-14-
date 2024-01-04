import { auth } from "@/auth";
import DelteUser from "../Users/DelteUser";
import Button from "./Button";
import Link from "next/link";
import DelteTodo from "../Todos/DelteTodo";


const Table = async ({ data, columns, componentType }) => {
  const session = await auth()

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.field} className="px-4 py-2">
              {column.label}
            </th>
          ))}
          {session?.user?.role == 'admin' && <th colSpan={4} className="px-4 py-2 col-span-4">Action</th>}
          {componentType == 'Products' && <th colSpan={4} className="px-4 py-2 col-span-4">Action</th>}

        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map(item => (
            <tr key={item.id}>
              {columns.map(column => (
                <td key={column.field} className="border px-4 py-2">
                  {item[column.field]}
                </td>

              ))}
              {componentType == 'Users' &&
                session.user?.role == 'admin' &&
                <>
                  <td className="border px-4 py-2 "><DelteUser idu={item.id} /></td>
                  <td className="border px-4 py-2"><Link href={`Users/UpdateUser/${item.id}`}><Button val='UPDATE'></Button></Link>
                  </td>
                </>
              }
              {componentType == 'Products' &&
                <>
                  <td className="border px-4 py-2 "><DelteTodo ids={item.id}></DelteTodo></td>
                  <td className="border px-4 py-2"><Link href={`Todos/UpdateTodo/${item.id}`}><Button val='UPDATE'></Button></Link></td>
                </>}
            </tr>
          )

          )

        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center">
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
