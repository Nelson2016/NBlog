import React from 'react';

/**
 * 表单组(子元素必须设置ref属性)
 *
 * 检测表单包含的元素是否符合提交标准
 *
 * [Function] Props.onSubmit(canSubmit:Boolean,children:Object)    [是否可提交,子元素]    调用提交表单回调函数
 *
 */

class Form extends React.Component {

    onSubmit(e) {
        e.preventDefault();

        let canSubmit = true;

        let refs = this.refs;

        console.log(refs)
        for (let i in refs) {
            if (refs[i].checkValue && !refs[i].checkValue()) {
                canSubmit = false
            }
        }

        this.props.onSubmit && this.props.onSubmit(canSubmit, this.refs);
    }

    render() {
        return <form className="n-form" onSubmit={this.onSubmit.bind(this)}>
            {
                React.Children.map(this.props.children, (item, index) => {
                    return React.cloneElement(item, {
                        ref: item.ref
                    })
                })
            }
        </form>
    }

}

export default Form;