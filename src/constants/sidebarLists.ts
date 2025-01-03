import { Home, Inbox, Waypoints, NotebookText } from "lucide-react";

const SidebarLists = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Projects",
    url: "portal/projects",
    icon: Inbox,
  },
  {
    title: "API Management",
    url: "portal/api-management",
    icon: Waypoints,
  },
  {
    title: "Documentation",
    url: "portal/documentation",
    icon: NotebookText,
  },
];

export default SidebarLists;
