const { Dashboard, Person, Folder, Assignment, AccountCircle, Settings, Group } = require("@mui/icons-material");

const adminDashboardMenu = [
    { id: "dashboard-menu-1", path: "/admin/dashboard", menu: 'Dashboard', icon: <Dashboard sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-2", path: "/admin/dashboard/profile", menu: 'Profile', icon: <AccountCircle sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-3", path: "/admin/dashboard/project", menu: 'Project', icon: <Folder sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-4", path: "/admin/dashboard/team", menu: 'Team', icon: <Group sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-5", path: "/admin/dashboard/task", menu: 'Task', icon: <Assignment sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-6", path: "/admin/dashboard/user", menu: 'User', icon: <Person sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-7", path: "/admin/dashboard/setting", menu: 'Setting', icon: <Settings sx={{ color: "#F2F4F7" }} /> },
]

export default adminDashboardMenu