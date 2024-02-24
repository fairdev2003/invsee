import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceStore } from "@/stores/workspace_store";
import { X } from "lucide-react";
import { useRef } from "react";




const WorkspaceTabs = () => {
    const { workspace, workspaces, setWorkspace, addWorkspace, setWorkspaces }: any = useWorkspaceStore()

    const [nameRef, descriptionRef] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ]

    return (
    <ScrollArea type="hover" className="text-white flex gap-x-2  mt-4 overflow-hidden bg-none border-gray-800 border-[1px] rounded-lg p-4">
        <div className="flex gap-x-4 px-2">
            {/* <input placeholder="name" className="text-black" ref={nameRef}></input>
            <input placeholder="description" className="text-black" ref={descriptionRef}></input> */}
            {workspaces && workspaces.length > 0 ? workspaces.map((work: any, index: number) => {
                return ( 
                    <Button draggable variant='secondary' className={`p-1 px-2 flex gap-4 ${workspace === work ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => {
                        setWorkspace(work)
                    }}>
                        {work.name}
                        <Separator color="black" className='h-4' orientation="vertical"/>
                        <X size={15} onClick={() => {
                            const new_workspaces = workspaces.filter((w: any) => w !== work)
                            setWorkspaces(new_workspaces)
                            setWorkspace(1)
                        }}/>
                    </Button>
                )
            }) : null}
            <Button variant='secondary' className="p-1 px-2 flex gap-4" onClick={() => {
                const work = workspaces ? [...workspaces, {name: nameRef?.current?.value || `Tab ${workspaces.length + 1}` , description: descriptionRef?.current?.value || `Description ${workspaces.length + 1}`}] : [{name: `Workspace 1`, description: "Twoj tete 2"}];

                addWorkspace(work);

                
                
            }}>
                Add Workspace
            </Button>
        </div>

        <ScrollBar orientation="horizontal"/>
        
        
        
    </ScrollArea>)
};

export default WorkspaceTabs;