import React from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import PlannerItem from 'components/Planner/PlannerItem'
import { PlannedCourse, ID, State } from 'reducers/types'
import { addPlannedCourse, deletePlannedCourse } from 'effects/plannedCourse'
import { ThunkDispatch } from 'redux-thunk'
import { withHover } from 'components/hoc/withHover'
import { CourseInfo } from 'components/CourseInfo/CourseInfo'
import AddCourseItem, { AddCourseItemProps } from './AddPlannerItem'

/** The props for PlannerList. */
export interface PlannerListProps {
    id: string
    items: (PlannedCourse & ID)[]
    delList: () => any // Deletes this PlannerList
    add: (course: string, term: string) => any // Provided by mapDispatchToProps
    delItem: (id: string) => any // Provided by mapDispatchToProps
}

export interface PlannerListState {
    addPlannerItems: AddCourseItemProps | null
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, AnyAction>) {
    return {
        add: (course: string, term: string) =>
            dispatch(addPlannedCourse(course, term)),
        delItem: (id: string) => dispatch(deletePlannedCourse(id))
    }
}

const PlannerItemWithHover = withHover(PlannerItem, CourseInfo)

class ConnectedPlannerList extends React.Component<
    PlannerListProps,
    PlannerListState
> {
    constructor(props: PlannerListProps) {
        super(props)
        this.state = { addPlannerItems: null }
    }

    createAddPlannerItem = () => {
        this.setState({
            addPlannerItems: {
                index: this.props.items.length,
                add: this.addCourse,
                delete: () => this.setState({ addPlannerItems: null })
            }
        })
    }

    addCourse = (course: string) => {
        this.props.add(course, this.props.id)
        this.setState({ addPlannerItems: null })
    }

    render() {
        const components = this.props.items.map(
            (item: PlannedCourse & ID, index: number) => (
                <PlannerItemWithHover
                    mainProps={{
                        id: item.id,
                        course: item,
                        index: index,
                        key: item.id,
                        delete: () => this.props.delItem(item.id)
                    }}
                    hoverProps={{
                        id: item.course
                    }}
                />
            )
        )
        if (this.state.addPlannerItems !== null) {
            components.push(<AddCourseItem {...this.state.addPlannerItems} />)
        }
        return (
            <Droppable
                droppableId={this.props.id}
                key={this.props.id}
                direction="horizontal"
            >
                {(provided: any) => (
                    <div>
                        <div
                            className="name container"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {components}
                            {provided.placeholder}
                        </div>
                        <div>
                            <button onClick={this.createAddPlannerItem}>
                                Add Course
                            </button>
                            <button onClick={this.props.delList}>
                                Delete Term
                            </button>
                        </div>
                    </div>
                )}
            </Droppable>
        )
    }
}

export const PlannerList = connect(
    null,
    mapDispatchToProps
)(ConnectedPlannerList)

export default PlannerList
