import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { PlannedCourse } from 'reducers/types'

/** The props used for PlannerItem. */
export interface PlannerItemProps {
    id: string
    course: PlannedCourse
    index: number
    delete: () => any // The function that deletes this PlannerItem
}

export interface PlannerItemState {
    courseCode: string
    changeCode: boolean
}

class PlannerItem extends React.Component<PlannerItemProps, PlannerItemState> {
    constructor (props: PlannerItemProps) {
        super(props)
        this.state = {
            ...props,
            courseCode: props.course.course,
            changeCode: true
        }
    }

    setCourseCode () {
        this.setState({ changeCode: !this.state.changeCode })
    }

    render () {
        return (
            <Draggable
                key={this.props.course.course}
                draggableId={this.props.course.course}
                index={this.props.index}>
                {(provided: any) => (
                    <div
                        className="a class"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        {this.state.changeCode && (
                            <div>
                                <input
                                    type="text"
                                    value={this.state.courseCode}
                                    onChange={e =>
                                        this.setState({
                                            courseCode: e.target.value
                                        })
                                    }
                                    name="code"
                                />
                                <button onClick={() => this.setCourseCode()}>
                                    Add
                                </button>
                            </div>
                        )}
                        {!this.state.changeCode && this.state.courseCode}
                        <button onClick={this.props.delete}>X</button>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default PlannerItem
