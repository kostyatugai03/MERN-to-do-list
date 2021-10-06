import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './Header/header'
import ToDoList from './ToDoList//toDoList'
import {AuthPage} from './AuthPage/AuthPage'

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/toDoList" exact>
                    <Header/>
                    <ToDoList/>
                </Route>
                <Redirect to="toDoList"/>
            </Switch>


        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}