import React, { useEffect, useState } from 'react'
import { taskDashboard } from '@/nav-config/task/taskDashboard'
import { Box } from '@mui/material'
import { TaskList } from '@/components'
import { DragDropContext } from 'react-beautiful-dnd'

const BoardView = ({ tasks, projects, employees, handleAddTaskToList }) => {
    const [taskCategory, setTaskCategory] = useState({
        "todo": [], "in progress": [], "review": [], "done": []
    })

    useEffect(() => {
        if (tasks && tasks !== null && tasks !== undefined && tasks !== "" && tasks.length > 0) {
            const todoTask = tasks.filter(task => task.taskCurrentStatus === "todo")
            const inProgressTask = tasks.filter(task => task.taskCurrentStatus === "in progress")
            const reviewTask = tasks.filter(task => task.taskCurrentStatus === "review")
            const doneTask = tasks.filter(task => task.taskCurrentStatus === "done")

            setTaskCategory({ ...taskCategory, todo: todoTask, "in progress": inProgressTask, review: reviewTask, done: doneTask })
        }
    }, [tasks])


    const onDragEnd = (result) => {
        const { source, destination } = result;

        // Condition 1: Drag and drop to unknown destination
        if (!destination) {
            return;
        }

        console.log(source, destination)

    }



    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box className="table-responsive board-view">
                    {
                        taskDashboard.map(item => <TaskList key={item.id} listName={item.listName} total={taskCategory[`${item.listName.toLowerCase()}`].length} taskCategory={taskCategory[`${item.listName.toLowerCase()}`].length > 0 && taskCategory[`${item.listName.toLowerCase()}`]} employees={employees} color={item.color} handleAddTaskToList={handleAddTaskToList} id={item.id} />
                        )
                    }
                </Box >
            </DragDropContext>
        </>
    )
}

export default BoardView