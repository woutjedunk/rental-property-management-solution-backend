import { drizzle } from 'drizzle-orm/node-postgres';
const db = drizzle(Deno.env.get('DATABASE_URL')!);
 
const result = await db.execute('select 1');