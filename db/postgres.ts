import { Pool } from "pg";
import { config } from "../config/env";

/**
 * creating an instance of the connection pool for our postgres db
 */
const pool = new Pool({ connectionString : config.dburl });

export { pool };