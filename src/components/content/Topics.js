import React, { Component } from 'react';
import { Input } from 'antd';
import msg from '../../lib/message'
import EMailInput from './EmailInput'
import Topic from './Topic'
const { TextArea } = Input;

export default class Topics extends Component {
    constructor (props) {
        super(props)
        this.state = {
            replyText: "",
            visible: false,
            confirmLoading: false,
            topicId: '',
            postType: 'addReply',
        }
    }
    // 添加回复
    addReply = () => {
        const {replyText} = this.state
        const {topic, eMail} = this.props
        if(replyText === "" || replyText === "\n"){
            this.setState({replyText: ""})
            msg.error("请输入回复内容！")
            return
        }
        try{
            if(eMail === ""){
                this.setState({ifShowReplyInput: true})
                msg.warning("请输入邮箱!")
                this.setState({visible: true})
            }else{
                this.props.actions.addReply(topic.doc, eMail, replyText, this.props.actions.allTopics)
                msg.success("成功回复！")
                this.onCloseReplyInput()
            }
        }catch(error){
            msg.error(error)
        }
    }
    // 渲染回复输入框
    replyInput = () => {
        const { replyText } = this.state;
        if(this.state.ifShowReplyInput){
            return (
                <TextArea
                    autoFocus  
                    value={replyText}
                    onChange={this.onChangeReplyText}
                    onBlur={() => this.setState({ifShowReplyInput: false})}
                    onPressEnter={this.addReply}
                    size='small'
                    className="reply-input"
                    placeholder="评论一下" />
            )
        }
    }
    // 登录邮箱或者回复信息
    handleOk = (eMail) => {
        const {postType, replyText} = this.state
        const {topic} = this.props
        switch(postType){
            case "login" : 
                this.props.actions.login(eMail)
                this.setState({visible:false, postType:"addTopic",eMail: ""});
                msg.success("当前邮箱设置成功！")
                break;
            case "addReply" :
                this.props.actions.addReply(topic.doc, eMail, replyText, this.props.actions.allTopics)
                msg.success("成功回复！")
                this.onCloseReplyInput()
                break;
            default : break;
        }
    }
    // 重置eMail输入框
    reSetInput = () => {this.setState({confirmLoading: false})}
    // 绑定reply回复信息
    onChangeReplyText = (e) => {this.setState({replyText: e.target.value})}   
    // 关闭eMail弹框
    handleCancel = () => {this.setState({confirmLoading: false, visible: false});} 
    // 显示回复输入框框
    showReplyInputBox = (id) => {this.setState({topicId: id,ifShowReplyInput:true})}
    // 关闭回复输入框
    onCloseReplyInput = () => {this.setState({replyText: "", ifShowReplyInput: false})}    
    render() {
        const {visible, confirmLoading} = this.state
        return (
            <div className="topic">
                <Topic 
                {...this.props}
                showReplyInputBox={this.showReplyInputBox}
                replyInput={this.replyInput}/>
                <EMailInput
                    {...this.props} 
                    visible={visible} 
                    confirmLoading = {confirmLoading} 
                    closeInput = {this.handleCancel}
                    reSetInput = {this.reSetInput}
                    handleOk = {this.handleOk}/>
            </div>
        );
    }
}