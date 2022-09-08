import { NextApiHandler } from "next";

const handler: NextApiHandler = (_request, response) => {
  return response.json({ message: "Hello World" });
};

export default handler;
