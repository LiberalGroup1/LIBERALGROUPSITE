// api/file.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'frontend', process.env.TARGET_FILE);

  if (req.method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error reading file' });
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
