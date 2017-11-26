import React from 'react';

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import {RadioGroup} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import Form from "../../components/Form/Form";

import styles from "../../../asset/scss/admin/site-management/function-set.scss";

class FunctionSet extends React.Component {

    render() {
        return <div className={styles["function-set-container"]}>

            <Breadcrumb routes={this.props.routes} params={this.props.params}/>

            <div className={styles['set-rows']}>
                <Form>
                    <div className={styles["set-row"]}>
                        <RadioGroup label="是否开放注册：" name="openRegistration" values={[
                            {label: "开放", value: 1},
                            {label: "关闭", value: 0}
                        ]}/>
                    </div>

                    <div className={styles["set-row"]}>
                        <RadioGroup label="是否开放评论：" name="openComment" values={[
                            {label: "开放", value: 1},
                            {label: "关闭", value: 0}
                        ]}/>
                    </div>
                    <Button ref="set" type="submit" text="保存设置" style={{'width': '100%'}}/>
                </Form>
            </div>

        </div>
    }

}

export default FunctionSet;