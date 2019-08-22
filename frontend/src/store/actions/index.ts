import * as planActions from 'store/actions/planActions'
import * as termActions from 'store/actions/termActions'
import * as plannerCourseActions from 'store/actions/plannerCourseActions'
import * as courseActions from 'store/actions/courseActions'
import { ActionType } from 'typesafe-actions'

export const actions = {
    planActions,
    termActions,
    plannerCourseActions,
    courseActions
}

export type RootAction = ActionType<typeof actions>
