import React, { MouseEvent } from 'react'
import styles from './Suggestion.module.css'

export interface SuggestionProps {
    code: string
    name: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Suggestion: React.FC<SuggestionProps> = (
    props: SuggestionProps
) => {
    return (
        <button className={styles.suggestion} onClick={props.onClick}>
            <span className={styles.courseName}>{props.name}</span>
            <span className={styles.courseCode}>{props.code}</span>
        </button>
    )
}

export default Suggestion
