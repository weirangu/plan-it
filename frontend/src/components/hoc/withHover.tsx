import React from 'react'
import './withHover.css'

export interface WithHoverProps<P1, P2> {
    mainProps: P1
    hoverProps: P2
    showHover: boolean
}

export function withHover<P1, P2> (
    MainComponent: React.ComponentType<P1>,
    ComponentOnHover: React.ComponentType<P2>
): typeof React.Component {
    return class extends React.Component<
        WithHoverProps<P1, P2>,
        { showHover: boolean }
        > {
        constructor (props: WithHoverProps<P1, P2>) {
            super(props)
            this.state = { showHover: false }
        }

        showHoverComponent = (event: React.MouseEvent<HTMLDivElement>) => {
            this.setState({ showHover: true })
        }

        hideHoverComponent = (event: React.MouseEvent<HTMLDivElement>) => {
            this.setState({ showHover: false })
        }

        render (): JSX.Element {
            const componentsToShow = [
                <MainComponent {...this.props.mainProps as P1} />
            ]
            if (this.state.showHover) {
                componentsToShow.push(
                    <div className="overlay">
                        <ComponentOnHover {...this.props.hoverProps as P2} />
                    </div>
                )
            }

            return (
                <div
                    onMouseOver={this.showHoverComponent}
                    onMouseOut={this.hideHoverComponent}>
                    {componentsToShow}
                </div>
            )
        }
    }
}
