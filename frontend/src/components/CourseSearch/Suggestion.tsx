import React, { MouseEvent } from 'react'

export interface SuggestionProps {
    code: string
    name: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Suggestion: React.FC<SuggestionProps> = (
    props: SuggestionProps
) => {
    return (
        <button onClick={props.onClick}>
            <h6>{props.name}</h6>
            {props.code}
        </button>
    )
}

export default Suggestion
