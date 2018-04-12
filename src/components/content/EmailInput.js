import React, { Component } from 'react';
import { Input, Modal, Icon  } from 'antd';
import msg from "../../lib/message"
import '../header/Header.css'

function EmailException(message) {
    this.message = message;
    this.name = "EmailException";
 }

class EmailInput extends Component {
    constructor (props) {
      super(props)
      this.state = {
          eMail: ""
      }
    }
    // 提交eMail信息
    handleOk = () => {
        const myreg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/
        const {eMail} = this.state
        try{
            if(!myreg.test( eMail ))
              throw new EmailException("请输入正确的邮箱！")
            this.props.handleOk(eMail)
            this.props.actions.login(eMail)
            this.props.closeInput()
        }catch(erro){
            msg.error(erro.message)
            this.props.reSetInput()
        }
    }
    // 绑定eMail属性
    onChangeEMail = (e) => {this.setState({eMail: e.target.value})}
    // 关闭eMail弹框
    hideModal = () => {this.props.closeInput()}
    render() {
      const {eMail} = this.state;
      return (
        <Modal title="Email"
              visible={this.props.visible}
              onOk={this.handleOk}
              confirmLoading={this.props.confirmLoading}
              onCancel={this.hideModal}
          >
              <Input
                onPressEnter={this.handleOk}
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                onChange={this.onChangeEMail}
                value={eMail}
                className="input-eMail"
                placeholder="请输入邮箱" />
          </Modal>
      );
    }
}

export default EmailInput