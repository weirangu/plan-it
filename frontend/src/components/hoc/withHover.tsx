import React, { useState } from 'react'
import './withHover.css'

export interface WithHoverProps<P1, P2> {
    mainProps: P1
    hoverProps: P2
}

export function withHover<P1, P2>(
    MainComponent: React.ComponentType<P1>,
    ComponentOnHover: React.ComponentType<P2>
): React.FC<WithHoverProps<P1, P2>> {
    return function(props: WithHoverProps<P1, P2>) {
        const [hover, setHover] = useState(false)
        let hoverComponent = null
        if (hover) {
            hoverComponent = (
                <div className="overlay">
                    <ComponentOnHover {...(props.hoverProps as P2)} />
                </div>
            )
        }

        return (
            <div
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
            >
                <MainComponent {...(props.mainProps as P1)} />
                {hoverComponent}
            </div>
        )
    }
}
