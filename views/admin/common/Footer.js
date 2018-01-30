import React from 'react';

import styles from '../../../asset/scss/admin/common/footer.scss';

class Footer extends React.Component {

    componentDidMount() {
        this.footer.classList.add(styles['n-active']);
    }

    render() {
        return <div ref={e => this.footer = e} className={styles["footer-container"]}>
            <p>联系方式：Nelson_Lee@outlook.com</p>
        </div>
    }

}

export default Footer;