import React from 'react';

import styles from '../../asset/scss/admin/footer.scss';

class Footer extends React.Component {

    render() {
        return <div className={styles["footer-container"]}>
            <p>联系方式：Nelson_Lee@outlook.com</p>
        </div>
    }

}

export default Footer;