import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import PlannerList from 'components/Planner/PlannerList'
import { PlannerItemData } from 'components/Planner/PlannerItem'

class Planner extends React.Component<
    any,
    { [id: string]: PlannerItemData[] }
    > {
    constructor (props: any) {
        super(props)
        this.state = {
            droppable1: [
                { name: 'csc108', id: 'a' },
                { name: 'csc148', id: 'b' },
                { name: 'csc207', id: 'c' }
            ],
            droppable2: [
                { name: 'csc209', id: 'd' },
                { name: 'csc369', id: 'e' },
                { name: 'csc469', id: 'f' }
            ]
        }

        this.onDragEnd = this.onDragEnd.bind(this)
    }

    public onDragEnd (result: DropResult): void {
        if (!result.destination) {
            return
        }
        if (result.source.droppableId === result.destination.droppableId) {
            const items: Array<PlannerItemData> = Array.from(
                this.state[result.destination.droppableId]
            )

            const removed: PlannerItemData[] = items.splice(
                result.source.index,
                1
            )
            items.splice(result.destination.index, 0, removed[0])

            this.setState({ [result.source.droppableId]: items })
        } else {
            const source: PlannerItemData[] = Array.from(
                this.state[result.source.droppableId]
            )
            const dest: PlannerItemData[] = Array.from(
                this.state[result.destination.droppableId]
            )

            const removed: PlannerItemData[] = source.splice(
                result.source.index,
                1
            )

            dest.splice(result.destination.index, 0, ...removed)

            const res: { [id: string]: PlannerItemData[] } = {}
            res[result.source.droppableId] = source
            res[result.destination.droppableId] = dest
            this.setState(res)
        }
    }

    render () {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {Object.entries(this.state).map(
                    (val: [string, PlannerItemData[]]) => (
                        <PlannerList items={val[1]} id={val[0]} />
                    )
                )}
            </DragDropContext>
        )
    }
}

export default Planner
