import React from 'react'
import { Course } from 'reducers/state-types'

export interface CourseSearchProps extends React.HTMLProps<CourseSearch> {
    callback: (course: Course) => any
}

export default class CourseSearch extends React.Component<
    CourseSearchProps,
    CourseSearchProps
    > {
    constructor (props: CourseSearchProps) {
        super(props)
        this.state = { value: '', callback: props.callback }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event: React.FormEvent<HTMLInputElement>) {
        this.setState({ value: event.currentTarget.value })
    }

    handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        alert(`submitted ${this.state.value}`)
        event.preventDefault()
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
