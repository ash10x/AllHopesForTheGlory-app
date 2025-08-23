import { Pool } from 'pg'
import 'dotenv/config'

   const database = new Pool({
     connectionString: process.env.DATABASE_URL
   });

export default database
