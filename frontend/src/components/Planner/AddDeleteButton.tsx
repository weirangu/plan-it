import React from 'react'
import styles from './AddDeleteButton.module.css'

export interface AddDeleteButtonProps {
    onAdd?: () => any
    onDelete?: () => any
}

export const AddDeleteButton: React.FC<AddDeleteButtonProps> = (
    props: AddDeleteButtonProps
) => {
    let addButton: JSX.Element | undefined
    let deleteButton: JSX.Element | undefined

    if (props.onAdd !== undefined) {
        addButton = (
            <button onClick={props.onAdd} className={styles.delete}>
                +
            </button>
        )
    }
    if (props.onDelete !== undefined) {
        deleteButton = (
            <button onClick={props.onDelete} className={styles.add}>
                -
            </button>
        )
    }

    return (
        <div className={styles.container}>
            {addButton}
            {deleteButton}
        </div>
    )
}

export default AddDeleteButton
