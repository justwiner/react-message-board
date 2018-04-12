import md5 from 'md5'
import PouchDB from 'pouchdb'
import moment from 'moment'

// 创建数据库连接
const db =  new PouchDB('message_board');

export const getAvatar = (email) => {
    return md5( email.trim().toLowerCase() )
}

export const getAllTopic = () => {
    return db.allDocs({
        include_docs: true,
        attachments: true
    })
}

export const addTopic = ( eMail, topicText ) => {
    let word = {
        _id: new Date().getTime().toString(),
        topicText: topicText,
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        userName: eMail,
        avatar: getAvatar(eMail),
        replys: []
    }
    return db.put(word);
}

export const addReply = ( doc, eMail, replyText ) => {
    let reply = {
        _id: new Date().getTime().toString(),
        replyText: replyText,
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        userName: eMail,
        avatar: getAvatar(eMail),
    }
    return db.get(doc._id).then(function(doc) {
        return db.put({
            _id: doc._id,
            topicText: doc.topicText,
            _rev: doc._rev,
            createTime: doc.createTime,
            userName: doc.userName,
            avatar: doc.avatar,
            replys: [
                reply,
                ...doc.replys
            ]
        });
    })
}