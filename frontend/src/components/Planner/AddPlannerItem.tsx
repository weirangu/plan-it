import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

/** The props used for PlannerItem. */
export interface AddCourseItemProps {
    index: number
    add: (course: string) => any // The function that adds a PlannedCourse
    delete: () => any // The function that deletes this PlannerItem
}

export interface AddCourseItemState {
    courseCode: string
}

class AddCourseItem extends React.Component<
    AddCourseItemProps,
    AddCourseItemState
> {
    constructor(props: AddCourseItemProps) {
        super(props)
        this.state = {
            courseCode: ''
        }
    }

    render() {
        return (
            <Draggable
                key={'my props'}
                draggableId={'my props'}
                index={this.props.index}
            >
                {(provided: any) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
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
                            <button
                                onClick={() =>
                                    this.props.add(this.state.courseCode)
                                }
                            >
                                Add
                            </button>
                        </div>
                        <button onClick={this.props.delete}>X</button>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default AddCourseItem
