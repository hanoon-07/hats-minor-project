import pool from "../config/db.js";

const getUsersWithEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM "User" where email=$1`, [
    email,
  ]);

  if (result.rowCount === 0) {
    return {msg: "Error! No user found "};
  }

  return result.rows;
};

const getUsersWithUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM "User" WHERE user_id = $1', [
    userId,
  ]);

  if (result.rowCount === 0) {
    return {msg: "Error! No user found"};
  }

  return result.rows[0]; // Return the first  user
};

const getStudentWith_admission = async (admi_id) => {
  const result = await pool.query(
    "SELECT * FROM student_info WHERE admission_no = $1",
    [admi_id]
  );

  return result.rows; // Return the first  user
};
const createUserData = async (name, email, password, role) => {
  const result = await pool.query(
    `INSERT INTO "User" (name, email, password, role) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, password, role]
  );
  return result.rows[0];
};
const insertInto_student = async (Id, roll_num, admi_id, university) => {
  const result = await pool.query(
    `INSERT INTO student_info (student_id,roll_no, university, admission_no) 
         VALUES ($1, $2, $3,$4) RETURNING *`,
    [Id, roll_num, university, admi_id]
  );
  return result.rows[0];
};

const getAll = async () => {
  const result = await pool.query(`select * from "User"`);
  return result.rows;
};

const insertUser = async (name, email, password, role) => {
  const result = await pool.query(
    "INSERT INTO user (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, role]
  );
  return result.rows[0];
};
export {
  getUsersWithEmail,
  getUsersWithUserId,
  createUserData,
  insertUser,
  getStudentWith_admission,
  insertInto_student,
  getAll,
};
