// 封装的全局提示组件
import {message} from 'antd'

const mesg = {
    success: (str) => {
        message.success(str)
    },
    error: (str) => {
        message.error(str)
    },
    warning: (str) => {
        message.warning(str)
    }
}
export default mesg