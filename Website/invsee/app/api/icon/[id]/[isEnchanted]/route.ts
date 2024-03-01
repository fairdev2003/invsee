import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
      isEnchanted: string;
    };
  },
  res: NextApiResponse
) {


  const mod_name = String(params.id).split("__")[0];
  const item_name = String(params.id).split("__")[1];

  const item_data = {
    mod_name: mod_name,
    item_name: item_name,
    item_tag: String(params.id),
    isEnchanted: String(params.id),
  };

  return NextResponse.json(item_data);
}
