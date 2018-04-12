import React, { Component } from 'react';
import { Avatar, Icon, Tooltip } from 'antd';

export default class Topics extends Component {
    render() {
        const { topic} = this.props
        return (
            <div>
                <div>
                    <Avatar className="avatar" size="large" src={"https://www.gravatar.com/avatar/" + topic.doc.avatar + "?s=80"} />
                </div>
                <div className="user-info">
                    <span>
                        <span className="user-name">{topic.doc.userName}</span>
                        ： {topic.doc.topicText}
                    </span>
                    <span>
                        <span className="topic-time">{topic.doc.createTime}</span>
                        <Tooltip placement="topLeft" title="点击回复" arrowPointAtCenter>
                            <Icon title="点击回复" className="topic-reply" type="message" onClick={() => this.props.showReplyInputBox(topic.id)}/>
                        </Tooltip>
                        {
                            this.props.replyInput()
                        }
                    </span>
                </div>
            </div>
        );
    }
}