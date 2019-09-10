import store from 'store' // Must be the first import
import PlannerContainer from 'components/Planner/PlannerContainer'
import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.css'

const App: React.FC = () => (
    <BrowserRouter>
        <Provider store={store}>
            <h1 className={styles.header}>Plan it!</h1>
            <Route exact path={['/', '/:plan']} component={PlannerContainer} />
        </Provider>
    </BrowserRouter>
)
export default App
