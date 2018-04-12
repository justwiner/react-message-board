import React, { Component } from 'react';
import { Input } from 'antd';
import EmailInput from '../content/EmailInput'
import UserInfo from './userInfo'
import msg from "../../lib/message"
import './Header.css'
const { TextArea } = Input;

class Header extends Component {
    constructor (props) {
      super(props)
      this.state = {
          visible: false,
          confirmLoading: false,
          topicText: "",
          eMail: this.props.eMail,
          postType: "addTopic"
      }
    }
    // 添加话题
    createTpoic = () => {
        const {topicText} = this.state
        const {eMail} = this.props
        if(topicText === "" || topicText === "\n"){
            this.setState({topicText: ""})
            msg.error("请输入内容！")
            return
        }
        else if(eMail !== ""){
            try {
                this.setState({ topicText: ""});
                this.props.actions.addTopic(eMail, topicText, this.props.actions.allTopics)
                msg.success("创建话题成功！")
            }catch(erro){
                console.log(erro)
                msg.error("创建话题出现问题...")
            }
        }
        else{
            this.setState({visible: true});
        }
    }
    // 判断是否登录还是添加话题
    handleOk = (eMail) => {
        const {postType, topicText} = this.state
        switch(postType){
            case "login" : 
                this.props.actions.login(eMail)
                this.setState({visible:false, postType:"addTopic",eMail: ""});
                msg.success("当前邮箱设置成功！")
                break;
            case "addTopic" :
                this.props.actions.addTopic(eMail, topicText, this.props.actions.allTopics)
                this.setState({ topicText: ""});
                msg.success("创建话题成功！")
                break;
            default : break;
        }
    }
    // 绑定话题内容
    onChangeTopic = (e) => {this.setState({topicText: e.target.value})}
    // 重置eMail输入框
    reSetInput = () => {this.setState({confirmLoading: false,eMail: ""})}
    // 显示eMail输入框
    login = () => {this.setState({visible:true, postType:"login",eMail: ""})}
    // 关闭eMail输入框
    handleCancel = () => {this.setState({confirmLoading: false, visible: false, postType:"addTopic", eMail: ""})}
    render() {
      const { visible, confirmLoading, topicText} = this.state;
      const {eMail} = this.props
      return (
        <div>
            <UserInfo eMail = {eMail} login={this.login}/>
            <TextArea
              onPressEnter={this.createTpoic}
              onChange={this.onChangeTopic}
              value={topicText}
              className="create-topic"
              placeholder="请输入话题内容，Enter发布" />
            <EmailInput 
                {...this.props} 
                visible={visible} 
                confirmLoading = {confirmLoading} 
                closeInput = {this.handleCancel}
                reSetInput = {this.reSetInput}
                handleOk = {this.handleOk}
            />
        </div>
      );
    }
}

export default Header