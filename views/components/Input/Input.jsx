import React from 'react';

import fonts from '../../../asset/scss/fonts.scss';
import styles from './input.scss';


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

/**
 * 通用输入组件
 *
 * [String|Boolean] Props.defaultValue   默认值
 * [String]         Props.type           输入框类型
 * [Boolean]        Props.disabled       是否可用
 * [String]         Props.placeholder    占位文字
 * [Boolean]        Props.ignore         是否忽略空值
 * [String]         Props.leftIcon       左侧图标名(名称来自/asset/font/中的字体文件)
 *
 */

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

/**
 * 通用多选组件
 *
 * [String]         Props.label          标签值
 * [String]         Props.forItem        全选对象data-item值
 * [String]         Props.item           被全选对象data-item值
 */
class Checkbox extends React.Component {

    onChange(){
        let forItem = this.props.forItem;
        if(forItem){
            let items = document.querySelectorAll('input[type=checkbox][data-item=' + forItem + ']');
            for(let i = 0 ; i < items.length ; i++){
                items[i].checked = this.refs.checkbox.checked;
            }
        }
    }

    render() {
        return <div className={styles["n-checkbox-container"]} style={this.props.style}>
            <div className={styles["n-checkbox"]}>
                <input ref='checkbox' type="checkbox" data-item={this.props.item} onChange={this.onChange.bind(this)} />
                <span className={styles["n-checkbox-background"]}></span>
            </div>
            {this.props.label && <label>{this.props.label}</label>}
        </div>
    }

}

class Radio extends React.Component {

    render() {
        return <div className={styles["n-radio-container"]} style={this.props.style}>
            <div className={styles["n-radio"]}>
                <input type="radio" name={this.props.name}/>
                <span className={styles["n-radio-background"]}></span>
            </div>
            <label>{this.props.label}</label>
        </div>
    }

}

class RadioGroup extends React.Component {
    render() {

        const values = this.props.values || [];
        const radios = values.map((item, index) => <span
            className={styles["n-radio-item-container"]}><Radio
            key={"radio-" + item.value}
            label={item.label}
            name={this.props.name}
            value={item.value}/>
        </span>);

        return <div className={styles["n-radio-group-container"]}>
            <label>{this.props.label}</label>
            {radios}
        </div>
    }
}

class NumberBox extends React.Component {

    render(){
        return <div className={styles['n-number-box-container']}>
            <input type="number" />
            <div ref='loading' className={styles['n-number-box-loading']}>
                <i className={fonts['icon-loading']} data-icon> </i>
            </div>
        </div>
    }

}

export {LiteralInput, Checkbox, Radio, RadioGroup,NumberBox};