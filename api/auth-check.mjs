export const runtime = "nodejs";

import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const token = req.cookies.token;
    const jwtSecret = process.env.JWT_SECRET;

    if (!token || !jwtSecret) {
      return res.status(401).json({ isAuthenticated: false });
    }

    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        return res.status(401).json({ isAuthenticated: false });
      }
      return res.status(200).json({ isAuthenticated: true });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ isAuthenticated: false, error: "Internal Server Error" });
  }
}
