import React from 'react';
import {Breadcrumb, Button, Form, Radio} from 'nr';

import config from '../../../config/config';
import styles from "../../../asset/scss/admin/site-management/function-set.scss";

const RadioGroup = Radio.RadioGroup;

class FunctionSet extends React.Component {

    onSubmit() {

    }

    render() {
        return <div className={styles["function-set-container"]}>

            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <Form onSubmit={this.onSubmit.bind(this)} ctx={this}>
                <div className={styles['set-rows']}>
                    <div className={styles["set-row"]}>
                        <RadioGroup name="test" label="是否开放注册：" values={[
                            {label: "开放", value: 0, defaultChecked: true},
                            {label: "关闭", value: 1, defaultChecked: false},
                        ]}/>
                    </div>

                    <div className={styles["set-row"]}>
                        <RadioGroup name="test" label="是否开放评论：" values={[
                            {label: "开放", value: 0, defaultChecked: true},
                            {label: "关闭", value: 1, defaultChecked: false},
                        ]}/>
                    </div>
                    <Button ref={e => this.saveBtn = e} nRef="saveBtn" text="保存设置" type="submit"/>
                </div>
            </Form>

        </div>
    }

}

export default FunctionSet;