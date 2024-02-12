import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { DragDropContext } from 'react-beautiful-dnd'
import { TaskList } from '@/components'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { handleMoveTaskFromSourceToAnotherDestination, handleUpdateTaskOrderSameColumn } from '@/redux/actions/admin/boardAction'

const BoardView = ({ projects, employees, tasks, isAdmin, columns, handleGetBoardColumns, userInfo, handleOpenTaskDetailModal }) => {
    const dispatch = useDispatch()
    const { error, message, actionT } = useSelector((state) => state.boardReducer)

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // Condition 1: Drag and drop to unknown destination
        if (!destination) { return; }

        // if the user drags and drops back in the same position
        if (destination?.droppableId === source?.droppableId && destination?.index === source?.index) { return; }

        // if the user drop within same column but different position
        const updatedColumns = [...columns]
        const sourceColIndex = updatedColumns.findIndex(col => col._id === source.droppableId);
        const destColIndex = updatedColumns.findIndex(col => col._id === destination.droppableId);

        const task = updatedColumns[sourceColIndex].tasks.splice(source.index, 1)[0];

        if (destination.droppableId === source.droppableId) {
            // Add the task to the destination column's tasks
            updatedColumns[destColIndex].tasks.splice(destination.index, 0, task);
            dispatch(handleUpdateTaskOrderSameColumn(updatedColumns))
        }

        // if the user moves from one column to another
        if (destination.droppableId !== source.droppableId) {
            // Add the task to the destination column's tasks
            updatedColumns[destColIndex].tasks.splice(destination.index, 0, task);
            dispatch(handleMoveTaskFromSourceToAnotherDestination(updatedColumns))
        }
    }

    useEffect(() => {
        if (!error && actionT === 'task-update-in-same-col') {
            toast.success(message)
            handleGetBoardColumns()
        } else if (error && actionT === 'task-update-in-same-col') {
            toast.error(message)
        }
    }, [error, actionT])

    useEffect(() => {
        if (!error && actionT === 'different-s-d') {
            toast.success(message)
            handleGetBoardColumns()
        } else if (error && actionT === 'different-s-d') {
            toast.error(message)
        }
    }, [error, actionT])

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box className="table-responsive board-view">
                    {
                        columns && columns !== null && columns !== undefined && columns !== "" && columns.length > 0 && columns.map(item => <TaskList key={item?._id} listName={item?.columnName} total={item?.tasks.length} employees={employees} color={item.color} listId={item?._id} tasks={tasks} listTasks={item?.tasks} userInfo={userInfo} isAdmin={isAdmin} handleOpenTaskDetailModal={handleOpenTaskDetailModal} />)
                    }
                </Box>
            </DragDropContext>
        </>
    )
}

export default BoardView