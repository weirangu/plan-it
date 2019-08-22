import { cacheCourseAction } from 'store/actions/courseActions'
import { getCourseAPI } from 'api/course'
import { RootState } from 'store/reducers/types'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

/**
 * Gets a course's information and caches it into the store.
 * @param id The ID of the course to retrieve. This can be of the form MAT135H1,
 * or MAT135H120179.
 */
export function getCourse(id: string) {
    return async (
        dispatch: ThunkDispatch<RootState, void, AnyAction>
    ): Promise<void> => {
        const resp = await getCourseAPI(id)
        dispatch(cacheCourseAction(resp, id))
    }
}
