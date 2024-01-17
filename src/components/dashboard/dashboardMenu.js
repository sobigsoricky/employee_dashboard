import React from 'react'
import { useRouter } from 'next/router'
import { AdminDashboardMenu, UserDashboardMenu } from '@/nav-config'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const DashboardMenu = ({ isAdmin }) => {
    const router = useRouter()
    return (
        <>
            <Box className="side-panel-menu">
                {isAdmin && <List className='d-flex flex-column p-0' sx={{ height: "100%" }}>
                    {
                        AdminDashboardMenu !== null && AdminDashboardMenu !== undefined && AdminDashboardMenu !== "" && AdminDashboardMenu.length > 0 && AdminDashboardMenu.slice(0, -1).map(item => <ListItem className='p-0' key={item.id}>
                            <ListItemButton className='px-0' onClick={() => router.push(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.menu} sx={{ color: "#F2F4F7" }} />
                            </ListItemButton>
                        </ListItem>)
                    }
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        AdminDashboardMenu !== null && AdminDashboardMenu !== undefined && AdminDashboardMenu !== "" && AdminDashboardMenu.length > 0 && AdminDashboardMenu.slice(-1).map(item => <ListItem className='p-0' key={item.id}>
                            <ListItemButton className='px-0' onClick={() => router.push(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.menu} sx={{ color: "#F2F4F7" }} />
                            </ListItemButton>
                        </ListItem>)
                    }
                </List>}
                {
                    !isAdmin && <List className='d-flex flex-column p-0' sx={{ height: "100%" }}>
                        {
                            UserDashboardMenu !== null && UserDashboardMenu !== undefined && UserDashboardMenu !== "" && UserDashboardMenu.length > 0 && UserDashboardMenu.slice(0, -1).map(item => <ListItem className='p-0' key={item.id}>
                                <ListItemButton className='px-0' onClick={() => router.push(item.path)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.menu} sx={{ color: "#F2F4F7" }} />
                                </ListItemButton>
                            </ListItem>)
                        }
                        <Box sx={{ flexGrow: 1 }} />
                        {
                            UserDashboardMenu !== null && UserDashboardMenu !== undefined && UserDashboardMenu !== "" && UserDashboardMenu.length > 0 && UserDashboardMenu.slice(-1).map(item => <ListItem className='p-0' key={item.id}>
                                <ListItemButton className='px-0' onClick={() => router.push(item.path)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.menu} sx={{ color: "#F2F4F7" }} />
                                </ListItemButton>
                            </ListItem>)
                        }
                    </List>
                }
            </Box >
        </>
    )
}

export default DashboardMenu