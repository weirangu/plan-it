import { Course } from 'store/reducers/types'
import { createAction } from 'typesafe-actions'

/**
 * Caches the course in the state.
 * @param course The information of the course to cache.
 * @param id The ID of the course.
 */
export const cacheCourseAction = createAction(
    'CACHE_COURSE',
    (id: string, course: Course | null) => ({ course, id })
)()
