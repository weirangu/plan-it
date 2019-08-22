import { Course } from 'store/reducers/types'
import { createAction } from 'typesafe-actions'

/** Updates the current plan. */
export const cacheCourseAction = createAction(
    'CACHE_COURSE',
    action => (course: Course, id: string) => action({ ...course, id })
)
