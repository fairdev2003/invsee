import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Mods() {
  const [mods, setMods] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setgroups] = useState<any>(["Firstname", "Lastname", "Nick"]);

  async function getAllMods() {
    try {
      setLoading(true);

      const response = await axios.get("/api/mods");

      setMods(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllMods()
  }, [])

  return (
    <div>
      <h1 className="text-2xl text-white font-[600]">Mods</h1>
      <div>
        {loading === false ? (
          <Table className="mt-5">
            <TableHeader className="bg-[#32343a]">
              <TableHead className="font-[600] text-blue-500">
                ID
              </TableHead>
              <TableHead className="font-[600] text-blue-500">
                Mod Owner
              </TableHead>
              <TableHead className="font-[600] text-blue-500">
                Mod name
              </TableHead>
              <TableHead className="font-[600] text-blue-500">
                Mod Tag
              </TableHead>
              <TableHead className="font-[600] text-blue-500">
                Items
              </TableHead>
              
            </TableHeader>
            <TableBody className="">
              {mods.map((mod: any, number: number) => {
                return (
                  <TableRow className="text-white hover:bg-none  border-none bg-[#32343a] hover:bg-[#222327] transition-none">
                    <TableCell>{mod._id}</TableCell>
                    <TableCell>{mod.mod_owner}</TableCell>
                    <TableCell>{mod.mod_name}</TableCell>
                    <TableCell>{mod.mod_tag}</TableCell>
                    <TableCell>{mod.items.length}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center mt-10">
            <span className="loader"></span>
            <p className="text-white">Loading Mods...</p>
          </div>
        )}
      </div>
    </div>
  );
}
