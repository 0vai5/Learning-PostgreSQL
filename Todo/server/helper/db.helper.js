import { pool } from "../db/db.js";

export const queryExecutor = async (query, params) => {
  try {
    const response = await pool.query(query, params);

    return response;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};
