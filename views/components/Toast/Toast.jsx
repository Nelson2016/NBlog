import React from 'react';
import './toast.css';

/**
 * Toast component description
 *
 * Common style toast component
 *
 * Object.error()
 * Object.waring()
 * Object.success()
 *
 */

const toastTimer = 2000;

class Toast {

    constructor() {
        this.preFix = ['', 'webkit', 'moz', 'ms', 'o'];
    }

    /**
     * @description 插入HTML
     * @param dom 目标节点
     * @param htmlStr HTML字符串
     * @param type [insertBefore|append] 操作类型
     */
    insertHTML(aimDom, htmlStr, type) {

        if (type !== 'append' && type !== 'insertBefore') {
            return false;
        }

        let [container, nodes, fragment] = [document.createElement("div"), nodes = null, fragment = document.createDocumentFragment()];

        container.innerHTML = htmlStr;
        nodes = container.childNodes;

        for (let i = 0, length = nodes.length; i < length; i += 1) {
            fragment.appendChild(nodes[i].cloneNode(true));
        }

        type === 'append' ? aimDom.appendChild(fragment) : aimDom.insertBefore(fragment, aimDom.children[0]);

        nodes = null;
        fragment = null;
    }

    /**
     * @description 创建一条提示
     * @param message 提示信息
     * @param type 提示类型
     * @returns {Element} 提示条目的实例
     */
    createItem(message, type) {
        let toastId = "nui-toast-" + new Date().valueOf();

        let itemTpl = `<div class="nui-toast-item" id="${toastId}"><div class="nui-toast-inner"><i class="icon icon-toast-${type}"></i><p>${message}</p></div></div>`;

        this.insertHTML(this.toastContainer, itemTpl, 'append');

        return document.getElementById(toastId);
    }

    destroy(toastItem) {
        let _this = this;

        toastItem.classList.add('nui-toast-inactive');

        for (let i = 0; i < this.preFix.length; i++) {
            toastItem.addEventListener(this.preFix[i] + (this.preFix[i] ? 'A' : 'a') + "nimationEnd", function () {
                _this.toastContainer.removeChild(toastItem);
                if (_this.toastContainer.children.length <= 0) {
                    _this.toastContainer.parentNode.removeChild(_this.toastContainer);
                    _this.toastContainer = null;
                }
            })
        }
    }

    /**
     * @description 创建警告类型额Toast
     * @param message 提示信息
     */
    warning(message) {
        this.create(message, 'warning')
    }

    /**
     * @description 创建错误类型额Toast
     * @param message 提示信息
     */
    error(message) {
        this.create(message, 'error')
    }

    /**
     * @description 创建成功类型额Toast
     * @param message 提示信息
     */
    success(message) {
        this.create(message, 'success')
    }

    /**
     * @description 创建Toast
     * @param message 提示信息
     * @param type Toast类型
     */
    create(message, type) {
        let _this = this;
        //创建Toast容器
        if (!this.toastContainer) {
            this.insertHTML(document.body, '<div class="nui-toast" id="nui-toast"></div>', 'insertBefore');
            this.toastContainer = document.getElementById('nui-toast');
        }
        //创建Toast条目
        let toastItem = this.createItem(message, type);

        //显示Toast条目
        toastItem.classList.add('nui-toast-active');

        setTimeout(function () {
            // _this.destroy(toastItem);
        }, toastTimer)
    }

}

export default new Toast;