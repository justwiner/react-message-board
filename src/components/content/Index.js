import React, { Component } from 'react';
import Reply from './Replys'
import Topics from './Topics'
import './Index.css'

export default class Index extends Component {
    render() {
        const { topics } = this.props;
        return (
            <div>
                {
                    (topics.length !== 0) ? topics.map(item => {
                        return(
                            <div className="topicBox" key={item.id}>
                                <Topics {...this.props} topic={item}/>
                                <Reply replys={item.doc.replys}></Reply>
                            </div>
                        )}) : <div className="noTopic">快发布几个话题吧~~~</div>
                }
            </div>
        );
    }
}