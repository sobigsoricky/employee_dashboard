const { Dashboard, Person, Folder, Assignment, AccountCircle, Settings, Group } = require("@mui/icons-material");

const EmpDashboardMenu = [
    { id: "dashboard-menu-1", path: "/user/dashboard", menu: 'Dashboard', icon: <Dashboard sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-2", path: "/user/dashboard/project", menu: 'Project', icon: <Folder sx={{ color: "#F2F4F7" }} /> },
    
    { id: "dashboard-menu-3", path: "/user/dashboard/task", menu: 'Task', icon: <Assignment sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-4", path: "/user/dashboard/user", menu: 'User', icon: <Person sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-5", path: "/user/dashboard/Reporting", menu: 'Reporting', icon: <Settings sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-6", path: "/user/dashboard/profile", menu: 'Profile', icon: <AccountCircle sx={{ color: "#F2F4F7" }} /> },
    { id: "dashboard-menu-7", path: "/user/dashboard/setting", menu: 'Setting', icon: <Settings sx={{ color: "#F2F4F7" }} /> },
]

export default EmpDashboardMenu