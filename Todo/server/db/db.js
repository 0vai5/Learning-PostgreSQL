import {Pool} from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todos',
    password: 'mba21345',
    port: 5432,  
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection error', err);
    }
}

export default connectDB;