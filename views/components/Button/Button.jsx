import React from 'react';

import fonts from '../../../asset/scss/fonts.scss';
import styles from './button.scss';

/**
 * 通用按钮组件
 *
 * [String]     Props.type [normal]     按钮类型
 * [String]     Props.text              按钮文本
 * [Boolean]    Props.disabled          是否可用
 * [Function]   Props.onClick           点击回调
 *
 *
 * Object.disable()         设置按钮为不可用状态
 * Object.enable()          设置按钮为可用状态
 * Object.startLoading()    显示按钮所在表单正在提交的状态动画
 * Object.endLoading()      停止显示按钮所在表单正在提交的状态动画
 *
 */

class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * @description 按钮点击事件
     */
    buttonClick() {
        this.props.onClick && this.props.onClick();
    }

    /**
     * @description 设置按钮为不可用状态
     */
    disable() {
        const button = this.refs.button;
        button.setAttribute('disabled', 'disabled');
    }

    /**
     * @description 设置按钮为可用状态
     */
    enable() {
        const button = this.refs.button;
        button.removeAttribute('disabled');
    }

    /**
     * @description 显示按钮所在表单正在提交的状态动画
     */
    startLoading() {
        let buttonLoading = this.refs.buttonLoading;
        buttonLoading.classList.add(styles['n-active']);
        this.disable();
    }

    /**
     * @description 停止显示按钮所在表单正在提交的状态动画
     */
    endLoading() {
        let buttonLoading = this.refs.buttonLoading;
        buttonLoading.classList.remove(styles['n-active']);
        this.enable();
    }

    render() {
        return <div className={styles['n-buttons']} style={this.props.style}>
            <button ref='button'
                    className={styles['w-button-' + (this.props.mode || 'normal')]}
                    onClick={this.buttonClick.bind(this)}
                    disabled={this.props.disabled}
                    type={this.props.type}
            >
                {this.props.text}
            </button>
            <div ref='buttonLoading' className={styles['n-button-loading']}>
                <i className={fonts['icon-loading']} data-icon> </i>
            </div>
        </div>;
    }
}

export {Button};