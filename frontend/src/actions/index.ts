import * as planActions from './planActions'
import * as termActions from './termActions'
import * as plannerCourseActions from './plannerCourseActions'
import * as courseActions from './courseActions'
import { ActionType } from 'typesafe-actions'

export const actions = {
    planActions,
    termActions,
    plannerCourseActions,
    courseActions
}

export type RootAction = ActionType<typeof actions>
