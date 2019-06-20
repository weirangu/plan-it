import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Course } from 'reducers/types'
import { render } from 'react-dom';

/** The props used for PlannerItem. */
export interface PlannerItemProps {
    course: Course
    index: number
    delete: () => any // The function that deletes this PlannerItem
}

export interface PlannerItemState {
    courseCode: string,
    changeCode: boolean
}

// const PlannerItem: React.FC<PlannerItemProps> = (
//     props: PlannerItemProps
// ) => {
//     return (
//         <Draggable
//             key={props.course.code}
//             draggableId={props.course.code}
//             index={props.index}>
//             {(provided: any) => (
//                 <div
//                     className="a class"
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}>
//                     {props.course.code}
//                     <button onClick={props.delete}>X</button>
//                 </div>
//             )}
//         </Draggable>
//     )
// }

class PlannerItem extends React.Component<PlannerItemProps, PlannerItemState> {
    constructor(props: PlannerItemProps) {
        super(props)
        this.state = {
            ...props,
            courseCode: props.course.code,
            changeCode: true
        }
    }

    setCourseCode() {
        this.setState({ changeCode: !this.state.changeCode })
    }

    render() {
        return (
            <Draggable
                key={this.props.course.code}
                draggableId={this.props.course.code}
                index={this.props.index}>
                {(provided: any) => (
                    <div
                        className="a class"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        {/* {!this.state.changeCode &&
                            <input value={this.state.courseCode} onClick={() => this.getCourseCode()}/>} */}
                        {this.state.changeCode &&
                            <div>
                                <input type="text" value={this.state.courseCode} onChange={(e) => this.setState({ courseCode: e.target.value })} name="code" />
                                <button onClick={() => this.setCourseCode()}>Add</button>
                            </div>
                        }
                        {!this.state.changeCode && this.state.courseCode}
                        <button onClick={this.props.delete}>X</button>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default PlannerItem
