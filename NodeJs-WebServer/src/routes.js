import Person from "@material-ui/icons/Person";
import UserProfile from "views/UserProfile/UserProfile.js";
import Dashboard from "views/TableList/TableList.js";

const dashboardRoutes = [
  {
    path: "/table",
    name: "Dashboard",
    icon: "content_paste",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
