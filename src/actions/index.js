import * as types from '../constants/ActionTypes'
import * as db from './db'

// action：获取所有话题 || 更新话题
export const allTopics = (list) => ({type: types.ALL_TOPIC, list})
// action：获取当前eMail || 更新eMail
export const login = (eMail) => ({type: types.LOGIN, eMail})

// action：添加话题(保存至数据库)
export const addTopic = ( eMail, topicText, action ) => {
    db.addTopic( eMail, topicText ).then( response => {
            if(response.ok){
                db.getAllTopic().then( data => action(data, eMail) )
            }
        })
        .catch( err => console.error(err))
    return { type: 'ADDTOPIC' }
}
// action：添加回复(保存至数据库)
export const addReply = ( doc, eMail, replyText, action ) => {
    db.addReply( doc, eMail, replyText ).then( response => {
            if(response.ok){
                db.getAllTopic().then( data => action(data) )
            }
        })
        .catch( err => console.error(err))
    return { type: 'APPREPLT' }
}
// action：获取所有话题及相关回复信息(从数据库获取)
export const getAllTopic = (action) => {
    db.getAllTopic().then( 
        data => action(data) 
    ).catch( err => console.error(err))
    return { type: 'GETALLTOPIC' }
}
