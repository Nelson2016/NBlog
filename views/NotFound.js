import React from 'react';

class NotFound extends React.Component {

    render() {
        return <div className="container">
            <span
                style={{
                    width: '300px',
                    textAlign: "center",
                    color: "#999999",
                    fontSize: '250px',
                    display: 'block',
                    marginTop: "100px",
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
            404
            </span>
        </div>
    }

}

export default NotFound;