import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import PFP from '@/assets/Avatar.png'
import Image from "next/image";

export default function Allies() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setgroups] = useState<any>(["Firstname", "Lastname", "Nick"]);

  async function getAllUsers() {
    try {
      setLoading(true);

      const response = await axios.get("/api/users/get_all_users");

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-white font-[600]">Allies</h1>
      <div className="flex flex-col gap-3">
        {loading === false ? (
          <Table className="mt-5">
            <TableHeader className="bg-[#32343a]">
                <TableHead className="font-[600] text-white">ID</TableHead>
                <TableHead className="font-[600] text-white">Firstname</TableHead>
                <TableHead className="font-[600] text-white">Lastname</TableHead>
                <TableHead className="font-[600] text-white">Nickname</TableHead>
                <TableHead className="font-[600] text-white">Role</TableHead>
            </TableHeader>
            <TableBody className="">
                {users.map((item: any, number: number) => {
                    return (
                        <TableRow className="text-white hover:bg-none  border-none bg-[#32343a] hover:bg-[#222327] cursor-pointer transition-none">
                            <TableCell>{number + 1}</TableCell>
                            <TableCell >{item.first_name}</TableCell>
                            <TableCell>{item.last_name}</TableCell>
                            <TableCell>{item.nick}</TableCell>
                            <TableCell>{item.role}</TableCell>
                        </TableRow>
                    )
                })}
                
            </TableBody>
          </Table>
        ) : (
            <div className="flex flex-col gap-4 justify-center items-center mt-10">
                <span className="loader"></span>
                <p className="text-white">Loading Users...</p>
            </div>
        )}
      </div>
    </div>
  );
}
