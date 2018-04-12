import React, { Component } from 'react';
import Header from '../components/header/Header'
import Topics from '../components/content/Index'
import "./App.css"
import {Card, BackTop } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions'


class App extends Component {
    componentWillMount(){
        this.props.actions.getAllTopic( this.props.actions.allTopics )
    }
    render() {
        return (
          <div className="bg">
            <BackTop/>
            <Header {...this.props}/>
            <Card>
                <Topics {...this.props}/>
            </Card>
          </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        eMail: state.topic.eMail,
        // 按时间顺序重新排序
        topics: state.topic.topics.sort((a,b) => {return new Date(Date.parse(b.doc.createTime)) - new Date(Date.parse(a.doc.createTime))}),
        ifShowLoginBox: state.topic.ifShowLoginBox
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
