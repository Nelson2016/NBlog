import React from 'react';

import fonts from '../../../asset/scss/fonts.scss';
import styles from './input.scss';

/**
 * 通用输入组件
 *
 * [String|Boolean] Props.defaultValue   默认值
 * [String]         Props.type           输入框类型
 * [Boolean]        Props.disabled       是否可用
 * [String]         Props.placeholder    占位文字
 * [Boolean]        Props.ignore         是否忽略空值
 *
 */

const dataTypes = {
    'nullMessage': '该项不可为空',
    'password': {
        message: '密码为6-16位字符，可包含.或_',
        regExp: /^[a-zA-Z0-9._]{6,16}$/
    },
    'username': {
        message: '用户名为4-16字母或数字。',
        regExp: /^[a-zA-Z0-9]{4,16}$/
    }
}

class LiteralInput extends React.Component {

    /**
     * @description 输入框内容变动
     */
    onInput() {
        this.hideNotice();
        this.props.onInput && this.props.onInput();
    }

    /**
     * @description 输入框失去焦点
     */
    onBlur() {
        this.checkValue();
        this.props.onBlur && this.props.onBlur();
    }

    /**
     * @description 检验输入款内容是否合法
     */
    checkValue() {
        const input = this.refs.input;
        const ignore = this.props.ignore || false;
        const dataType = this.props.dataType || 'text';
        const val = input.value;
        const dataTypeObj = dataTypes[dataType];

        if (!this.props.ignore) {
            if (!val) {
                this.showNotice(dataTypes.nullMessage);
                return false;
            } else {
                this.hideNotice();
            }
        }

        if (dataType !== 'text') {
            if (!dataTypeObj.regExp.test(val)) {
                this.showNotice(dataTypeObj.message);
                return false;
            } else {
                this.hideNotice();
            }
        }

        return true;
    }

    /**
     * @description 关闭错误提示
     */

    hideNotice() {
        const notice = this.refs.notice;
        notice.classList.remove(styles['n-active']);
    }

    /**
     * @description 打开错误提示
     * @param message 错误提示信息
     */
    showNotice(message) {
        const notice = this.refs.notice;
        notice.innerText = message;
        notice.classList.add(styles['n-active']);
    }

    render() {

        let type = this.props.type || "text";
        let defaultValue = this.props.defaultValue || "";
        let disabled = this.props.disabled || false;
        let placeholder = this.props.placeholder || "";
        let leftIconDom = [];

        const leftIconClassName = this.props.leftIcon;
        leftIconClassName && (leftIconDom = [
            <span className={styles.icon} key='leftIcon'>
                <i className={fonts["icon-" + leftIconClassName]} data-icon> </i>
            </span>
        ]);

        return <div className={styles['n-literal-input']} style={this.props.style}>
            {leftIconDom}
            <div className={styles['n-literal-input-container']}>
                <input
                    ref="input"
                    type={type}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    placeholder={placeholder}
                    onBlur={this.onBlur.bind(this)}
                    onInput={this.onInput.bind(this)}
                />
                <span ref='notice' className={styles['n-input-notice']}> </span>
            </div>
        </div>
    }

}

export {LiteralInput};