import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

class Dashboard extends Component {
    render(){
        return (
            <div>
                <SurveyList />
                <Link
                    style={{ position: 'absolute', bottom : '50px', right: '50px'}}
                to="/surveys/new" className="btn-floating btn-large waves-effect waves-light red">
                    <i className="material-icons">add</i>
                </Link>
            </div>
            
        );
    };
    }
    

export default Dashboard;
