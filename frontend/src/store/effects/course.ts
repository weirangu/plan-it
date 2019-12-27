import { getCourseAPI } from 'api/course'
import { AnyAction, Dispatch } from 'redux'
import { cacheCourseAction } from 'store/actions/courseActions'

/**
 * Gets a course's information and caches it into the store.
 * @param id The ID of the course to retrieve. This can be of the form MAT135H1,
 * or MAT135H120179.
 */
export function getCourse(id: string) {
    return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        try {
            const resp = await getCourseAPI(id)
            dispatch(cacheCourseAction(id, resp))
        } catch (err) {
            console.error(err)
        }
    }
}
