import Mods from "@/components/dashboard/sections/Mods";
import DashboardError from "./(components)/sections/DashboardError";
import Workspaces from "./(components)/sections/Workspaces";
import Overview from "./(components)/sections/Overview";
import { SectionListType } from "./(stores)/types/dashboardTypes";

const sectionList: SectionListType[] = [
  {
    id: 1,
    name: "overview",
    component: <Overview />,
  },
  {
    id: 2,
    name: "mods",
    component: <Mods />,
  },
  {
    id: 2,
    name: "workspaces",
    component: <Workspaces />,
  },
  {
    id: 99,
    name: "dashboard_auth_error",
    component: (
      <DashboardError
        title="Your role is too low!"
        message="You do not have the required permissions to access this section. Please refresh the page and try again."
        errorCode={403}
      />
    ),
  },
  {
    id: 4,
    name: "user_roles",
    component: (
      <div className="text-white">nakurwiam zonke kablem od zasilania</div>
    ),
  },
];

export default sectionList;
