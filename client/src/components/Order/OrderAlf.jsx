import React from 'react';
import { useDispatch } from 'react-redux';
import { sortAlf } from '../../actions/actions';
import classes from './order.module.css'

export default function OrderAlf({ order, setOrder }) {

    const dispatch = useDispatch()

    function handleOnClick(e) {
        if (order === "ASC") {
            dispatch(sortAlf(order))
            return setOrder("DESC");
        } else if (order === "DESC") {
            dispatch(sortAlf(order))
            return setOrder("ASC")
        }
    }

    return (
        <button className={classes.btnOrderAlf} onClick={(e) => { handleOnClick(e) }} >ORDENAR ALFABETICAMENTE</button>
    )
}