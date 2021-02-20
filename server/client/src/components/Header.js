import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    //Making the Header dynamic by checking the authentication
    renderContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                //array of lis
                return   [
                    <li key="1"><Payments/></li>, //top-bottom 0 left right 10
                    <li key="3" style={{margin: '0 10px'}}> 
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
   render() {
       return (
           //Linking the routes based on auth
        <nav>
            <div className="nav-wrapper">
            
            <Link 
                to={this.props.auth ? '/surveys' : '/'} 
            className="left brand-logo"
            >
            Hamro Survey
            </Link>
            <ul className="right">
                {this.renderContent()}  
            </ul>
            </div>
      </nav>
    );
   } 
}

const mapStateToProps= (state) => {
    return { auth: state.auth};
}

export default connect(mapStateToProps)(Header);