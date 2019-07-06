import { updatePlanAction } from './planActions'
import { updateTermAction, deleteTermAction } from './termActions'
import {
    updatePlannedCourseAction,
    movePlannedCourseAction,
    deletePlannedCourseAction
} from './plannedCourseActions'
import { ActionType } from 'typesafe-actions'

export const actions = {
    updatePlanAction,
    updateTermAction,
    deleteTermAction,
    updatePlannedCourseAction,
    movePlannedCourseAction,
    deletePlannedCourseAction
}

export type RootAction = ActionType<typeof actions>

export default actions
