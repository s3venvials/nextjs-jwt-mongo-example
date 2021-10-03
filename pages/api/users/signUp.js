import Users from '../../../models/User';
import { dbConnect } from '../../../lib/dbConnect';

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case 'POST':
            const user = await Users.findOne({ phone: req.body.user.phone });
            if (!user) {
                await Users.create({ ...req.body.user });
                return res.status(201).json({ success: true });
            }
            return res.status(200).json({ success: false });
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;