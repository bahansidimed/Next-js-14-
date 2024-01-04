import mysql from "mysql2/promise";


const mysqlC = async (query, data) => {
  try {
    const mysqlConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    const [result] = await mysqlConnection.execute(query, data);
    return result;
  } catch (error) {
    console.error(error); 
  }
};

export default mysqlC;
