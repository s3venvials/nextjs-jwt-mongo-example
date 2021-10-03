const jwt = require("jsonwebtoken");
import getConfig from "next/config";
import Users from "../../../models/User";
import { dbConnect } from "../../../lib/dbConnect";

import { apiHandler } from "helpers/api";

const { serverRuntimeConfig } = getConfig();

// users in JSON file for simplicity, store in a db for production applications
//const users = require('data/users.json');

const handler = async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST":
      return await authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    const { phone, passCode } = req.body;
    const user = await Users.find({ phone, passCode });

    if (!user) throw "Unable to process your request.";
    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ user }, serverRuntimeConfig.secret, {
      expiresIn: "1d",
    });
    const decodedUser = { ...jwt.decode(token) };
    // return basic user details and token
    return res.status(200).json({ success: true, ...decodedUser, token });
  }
};

export default apiHandler(handler);
