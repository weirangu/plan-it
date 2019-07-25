import * as planActions from './planActions'
import * as termActions from './termActions'
import * as plannedCourseActions from './plannedCourseActions'
import * as courseActions from './courseActions'
import { ActionType } from 'typesafe-actions'

export const actions = {
    planActions,
    termActions,
    plannedCourseActions,
    courseActions
}

export type RootAction = ActionType<typeof actions>
