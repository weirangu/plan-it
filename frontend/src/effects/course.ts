import { cacheCourseAction } from 'actions/courseActions'
import { getCourseAPI } from 'api/course'
import { RootState } from 'reducers/types'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export function getCourse(id: string) {
    return async (
        dispatch: ThunkDispatch<RootState, void, AnyAction>
    ): Promise<void> => {
        const resp = await getCourseAPI(id)
        dispatch(cacheCourseAction(resp, id))
    }
}
