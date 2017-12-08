import React from 'react';

class ContentManagement extends React.Component {

    render() {
        return <div>
            {this.props.children}
        </div>
    }

}

export default ContentManagement;