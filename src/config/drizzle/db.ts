import { drizzle } from 'drizzle-orm/node-postgres';
import { rentalPropertiesTable, addressesTable } from "@config/drizzle/schema.ts";
import "jsr:@std/dotenv/load";

const db = drizzle({
    connection: Deno.env.get('DATABASE_URL')!,
    casing: 'snake_case',
    schema: { 
        rentalProperties: rentalPropertiesTable,
        addresses: addressesTable
     }
});
 
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