import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { profileReducer } from "./admin/profileReducer"
import { adminEmployeeReducer } from "./admin/adminEmployeeReducer"
import { teamReducer } from "./admin/teamReducer"
import { projectReducer } from "./admin/projectReducer"
import { taskReducer } from './taskReducer'
import { employeeAuthReducer } from "./employeeAuthReducer"
import { userProfileReducer } from "./user/userProfileReducer"
import { adminReducer } from "./admin/adminReducer"
import { boardReducer } from "./admin/boardReducer"

const rootReducer = combineReducers({
    authReducer, profileReducer, adminEmployeeReducer, teamReducer, projectReducer, taskReducer, employeeAuthReducer, userProfileReducer, adminReducer, boardReducer
})

export default rootReducer