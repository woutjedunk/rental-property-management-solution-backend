import { drizzle } from 'drizzle-orm/node-postgres';
import "jsr:@std/dotenv/load";

const db = drizzle(Deno.env.get('DATABASE_URL')!);
 
async function logCurrentTime() {
    try {
      const result = await db.execute('SELECT NOW()');
      console.log('Current time from the database:', result.rows[0].now);
    } catch (error) {
      console.error('Error fetching current time:', error);
    }
  }
  
await logCurrentTime();

export default db;