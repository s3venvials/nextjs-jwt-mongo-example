import Users from '../../../models/User';
import { dbConnect } from '../../../lib/dbConnect';

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case 'PUT':
            await Users.findOneAndUpdate({ phone: req.body.phone }, { passCode: req.body.passCode }, { new: true, runValidators: true, });
            return res.status(200).json({ success: true });
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;