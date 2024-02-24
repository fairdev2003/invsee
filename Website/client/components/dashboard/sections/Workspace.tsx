import { useWorkspaceStore } from "@/stores/workspace_store";
import WorkspaceTabs from "../cards/WorkspaceTabs";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export default function Workspace() {

    const { workspace, workspaces, setWorkspaces, setWorkspace }: any = useWorkspaceStore()

    return (
        <div>
            <h1 className="text-3xl text-white font-[600] ml-1">Workspace</h1>
            <div>
                <WorkspaceTabs></WorkspaceTabs>
                <div className="border-gray-800 border-[1px] h-[100%] w-[100%] mt-5 rounded-md">
                <h1 className="text-white text-2xl font-[600] h-[570px] ">
                        <div className="flex items-center justify-between m-5">
                            <div className="flex gap-4 items-center">
                                <h1 className="">{workspaces.length !== 0 ? `${workspace.name}` : "No Workspace Selected"}</h1>
                                <p className="text-red-600 text-sm">{workspaces && workspaces.length > 0 ? "Not saved" : null}</p>
                            </div>
                            <div>
                                {workspaces && workspaces.length > 0 ? <X className="cursor-pointer" onClick={() => {
                                    console.log(workspaces)
                                    const new_workspaces = workspaces.filter((w: any) => w !== workspaces[workspace])
                                    setWorkspaces(new_workspaces)
                                    setWorkspace(0)
                                }}/> : null}
                            </div>
                        </div>
                        <Separator orientation="horizontal" className="bg-gray-800"/>
                        <h1 className="text-white text-[20px] m-5">{workspace.description}</h1>
                    </h1>
                    
                </div>
            </div>
        </div>
    )
}