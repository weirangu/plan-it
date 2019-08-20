import React from 'react'
import styles from './App.module.css'
import PlannerContainer from './Planner/PlannerContainer'

const App: React.FC = () => (
    <>
        <h1 className={styles.header}>Plan it!</h1>
        <PlannerContainer />
    </>
)
export default App
