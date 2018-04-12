import React, { Component } from 'react';
import { Avatar } from 'antd';

class Replys extends Component {
    render() {
        const { replys } = this.props;
        return (
            <div className="replys">
                {
                    (replys.length !== 0) ? replys.map(item => {
                        return (
                            <div key={item._id}>
                                <div className="white-space"></div>
                                <div>
                                    <Avatar className="reply-avatar" size="default" src={"https://www.gravatar.com/avatar/" + item.avatar + "?s=80"} />
                                </div>
                                <div className="user-info">
                                    <span className="user-name">{item.userName}：<span className="reply-text">{item.replyText}</span></span>
                                    <span>
                                    <span className="topic-time">{item.createTime}</span>
                                </span>
                                </div>
                            </div>)
                    }): <div style={{fontSize: "0.8em", justifyContent: "center"}}>还没有人理他呢{`~~~~(>_<)~~~~`}</div>
                }
            </div>
        );
    }
}

export default Replys;