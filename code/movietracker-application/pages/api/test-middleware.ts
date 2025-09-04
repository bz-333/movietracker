import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "middleware/db-connect";

import { findAllMovies } from "@/mongoose/movies/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();
  const movies = await findAllMovies();
  res.status(200).json(movies);
}
