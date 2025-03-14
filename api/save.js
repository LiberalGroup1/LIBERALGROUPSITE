// api/save.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;
    const { GITHUB_REPO, TARGET_FILE, GITHUB_TOKEN } = process.env;

    try {
      // Получаем SHA файла, чтобы обновить его
      const getUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${TARGET_FILE}`;
      const getResp = await axios.get(getUrl, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      const sha = getResp.data.sha;

      // Отправляем PUT-запрос для обновления файла
      const putResp = await axios.put(
        getUrl,
        {
          message: 'Changes from web editor',
          content: Buffer.from(content).toString('base64'),
          sha: sha,
        },
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error while saving:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
