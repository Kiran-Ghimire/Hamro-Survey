import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () =>  async (dispatch) => {
        const res= await axios.get('/api/current_user');

        dispatch({ type: FETCH_USER, payload: res.data});
};

export const handleToken = (token)  => async (dispatch) => {
        const res= await axios.post('/api/stripe', token); //Api post req for billingroute.js

        dispatch({type:FETCH_USER, payload: res.data}); //helps to update the value in reducer
};


export const submitSurvey = (values, history) => async dispatch => {
        const res= await axios.post('/api/surveys', values); //sending the survey to db 

        history.push('/surveys');
        dispatch({type: FETCH_USER, payload: res.data });
};

export const fetchSurveys= () => async dispatch => { //fetching surveys from db to front end
        const res= await axios.get('/api/surveys');

        dispatch({ type: FETCH_SURVEYS, payload: res.data });
};