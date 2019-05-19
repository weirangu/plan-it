import React from 'react'
import {
    DragDropContext,
    DropResult,
    ResponderProvided
} from 'react-beautiful-dnd'
import PlannerList, { PlannerListProps } from 'components/Planner/PlannerList'
import { PlannerItemData } from 'components/Planner/PlannerItem'

export interface PlannerState {
    lists: PlannerListProps[]
}

class Planner extends React.Component<any, PlannerState> {
    constructor (props: any) {
        super(props)
        this.state = {
            lists: [
                {
                    items: [
                        { name: 'csc108', id: 'a'},
                        { name: 'csc148', id: 'b'},
                        { name: 'csc207', id: 'c'}
                    ]
                }
            ]
        }

        this.onDragEnd = this.onDragEnd.bind(this)
    }

    public onDragEnd (result: DropResult, provided: ResponderProvided): void {
        if (!result.destination) {
            return
        }
        const newItems: Array<PlannerItemData> = Array.from(
            this.state.lists[0].items
        )

        const removed: PlannerItemData[] = newItems.splice(
            result.source.index,
            1
        )
        newItems.splice(result.destination.index, 0, removed[0])

        this.setState({
            lists: [{ items: newItems }]
        })
    }

    render () {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.lists.map((list: PlannerListProps) => (
                    <PlannerList {...list} />
                ))}
            </DragDropContext>
        )
    }
}

export default Planner
