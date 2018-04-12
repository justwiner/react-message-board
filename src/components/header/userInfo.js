import React, {Component} from 'react'
import {Tooltip, Icon} from 'antd'

class UserInfo extends Component {
  render() {
    const {eMail} = this.props
    return (
      <div className="eMail">
          <span>当前：{eMail !== "" ? eMail : "无用户"}</span>
          <Tooltip title="切换邮箱">
              <Icon onClick={this.props.login} type="sync" />
          </Tooltip>
      </div>
    );
  }
}

export default UserInfo