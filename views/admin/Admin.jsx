import React from 'react';

import Header from './Header';
import Footer from './Footer';

class Admin extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.refs["main-container"].style.minHeight = document.documentElement.clientHeight - 140 + 'px';
    }

    render() {
        return <div className="admin-container">
            <Header/>
            <div ref='main-container' className="main-container">
                {this.props.children}
            </div>
            <Footer/>
        </div>
    }

}

export default Admin;