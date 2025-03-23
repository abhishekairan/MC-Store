import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    const [users] = await db.execute('SELECT * FROM todos');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}