import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';
 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Hono();

 
const FILE_PATH = path.join(__dirname, 'file.txt');

 
app.get('/read', async (c) => {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');  
    return c.text(data); 
  } catch (error) {
    return c.json({ message: "Internal Server Error" }, 500); 
  }
});

 
const port = 3000;
serve({
  fetch: app.fetch,
  port
});
