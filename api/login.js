export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    if (password === process.env.DEV_PASSWORD) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}