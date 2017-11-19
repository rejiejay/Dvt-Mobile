import moment from 'moment';
import assign from 'lodash.assign';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import {DatePicker, WhiteSpace , List , InputItem , Radio , Flex , Picker , WingBlank , Toast} from 'antd-mobile';

import styles from './../index.scss';
import cookie from './../../../method/cookie.js';
import appConfig from './../../../config/index.js';
import dateToFormat from './../../../method/dateToFormat.js';


class personal extends Component {
  constructor(props, context) {
    super(props,context);
    this.state = {
      nickname: null,
      sexList: [
        {
          label: '男',
          value: 'Boy',
        },
        {
          label: '女',
          value: 'Girl',
        }
      ],
      sex: ["Boy"],
      birthday:  null,//生日
      telephone: null,
      webchat: null,
      qq: null,

      userName: null,
      mobile: null,
      email: null,
      userInfor: {},

      isShowBaseInfor: true
    };
  }

  componentDidMount() {
    let _data = assign({},this.state);
    if (this.props.user != false) {
      // 初始化昵称
      _data.nickname = this.props.user.nickname
      // 初始化性别
      if (this.props.user.gender == 1) {
        _data.sex = ['Boy']
      }else {
        _data.sex = ['Girl']
      }
      // 初始化出生日期
      if (this.props.user.birthday) {
        let nawDate = new Date(this.props.user.birthday);
        nawDate = dateToFormat(nawDate)+' +0800';
        const _Date = moment(nawDate,'YYYY-MM-DD Z');
        _data.birthday = _Date
      }
      // 初始化电话号码
      _data.telephone = this.props.user.telephone
      // 初始化微信
      _data.webchat = this.props.user.webchat
      // 初始化QQ号码
      _data.qq = this.props.user.qq


      // 初始化用户名
      _data.userName = this.props.user.userName
      // 初始化手机
      if (this.props.user.mobile) {
        _data.mobile = this.props.user.mobile
      }else {
        _data.mobile = '未绑定'
      }
      // 初始化邮箱
      if (this.props.user.email) {
        _data.email = this.props.user.email
      }else {
        _data.email = '未绑定'
      }

      // 初始化所有信息
      _data.userInfor = this.props.user
      this.setState(_data);
    }
  }

  componentWillReceiveProps(nextProps) {
    let _data = assign({},this.state);
    if (nextProps.user != false) {
      // 初始化昵称
      _data.nickname = nextProps.user.nickname
      // 初始化性别
      if (nextProps.user.gender == 1) {
        _data.sex = ['Boy']
      }else {
        _data.sex = ['Girl']
      }
      // 初始化出生日期
      if (nextProps.user.birthday) {
        let nawDate = new Date(nextProps.user.birthday);
        nawDate = dateToFormat(nawDate)+' +0800';
        const _Date = moment(nawDate,'YYYY-MM-DD Z');
        _data.birthday = _Date;
      }
      // 初始化电话号码
      _data.telephone = nextProps.user.telephone
      // 初始化微信
      _data.webchat = nextProps.user.webchat
      // 初始化QQ号码
      _data.qq = nextProps.user.qq


      // 初始化用户名
      _data.userName = nextProps.user.userName
      // 初始化手机
      if (nextProps.user.mobile) {
        _data.mobile = nextProps.user.mobile
      }else {
        _data.mobile = '未绑定'
      }
      // 初始化邮箱
      if (nextProps.user.email) {
        _data.email = nextProps.user.email
      }else {
        _data.email = '未绑定'
      }


      // 初始化所有信息
      _data.userInfor = nextProps.user
      this.setState(_data);
    }
  }

  renderNav() {
    const _this = this,
      isShowBaseInfor = this.state.isShowBaseInfor;

    if (isShowBaseInfor) {
      return <div className={styles.Nav}>
        <div className={styles.NavL_active}>基本信息</div>
        <div className={styles.NavR} onClick={() => {
          _this.setState({'isShowBaseInfor': false});
        }}>账号信息</div>
      </div>
    } else {
      return <div className={styles.Nav}>
        <div className={styles.NavL} onClick={() => {
          _this.setState({'isShowBaseInfor': true});
        }}>基本信息</div>
        <div className={styles.NavR_active}>账号信息</div>
      </div>
    }
  }

  renderBaseInfor() {
    const _this = this,
      isShowBaseInfor = this.state.isShowBaseInfor;

    if (isShowBaseInfor) {
      return <div>
        <List renderHeader={() => '基本信息'}>
          <InputItem
            placeholder='请输入你的昵称'
            value={this.state.nickname}
            onChange={function(val){
              let _data = assign({},this.state);
              _data.nickname = val
              this.setState(_data)
            }.bind(this)}
            >
            昵称
          </InputItem>
        </List>
        <List>
          <InputItem
            placeholder='请输入你的用户名'
            value={this.state.userName}
            onChange={function(val){ this.setState({userName: val}) }.bind(this)}
          >用户名</InputItem>
        </List>
        <List>
          <Picker
            data={this.state.sexList}
            cols={1}
            value={this.state.sex}
            title="请选择您的性别"
            onChange={function(val){
              let _data = assign({},this.state);
              _data.sex = val
              this.setState(_data)
            }.bind(this)}
            >
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
        </List>
        <List>
          <DatePicker
            mode="date"
            title="选择出生日期"
            extra="请选择"
            value={this.state.birthday}
            minDate={_minDate}
            maxDate={_maxDate}
            onChange={function(val){
              this.setState({ birthday: val })
            }.bind(this)}
          >
          <List.Item arrow="horizontal">出生日期</List.Item>
          </DatePicker>
        </List>
        <List>
          <InputItem
            placeholder='请输入你的电话号码'
            value={this.state.telephone}
            onChange={function(val){
              let _data = assign({},this.state);
              _data.telephone = val
              this.setState(_data)
            }.bind(this)}
            >
            电话号码
          </InputItem>
        </List>
        <List>
          <InputItem
            placeholder='请输入你的微信'
            value={this.state.webchat}
            onChange={function(val){
              let _data = assign({},this.state);
              _data.webchat = val
              this.setState(_data)
            }.bind(this)}
            >
            微信
          </InputItem>
        </List>
        <List>
          <InputItem
            placeholder='请输入你的QQ号码'
            value={this.state.qq}
            onChange={function(val){
              let _data = assign({},this.state);
              _data.qq = val
              this.setState(_data)
            }.bind(this)}
            >
            QQ号码
          </InputItem>
        </List>
      </div>
    }
  }

  renderAccountInfor() {
    const _this = this,
      isShowBaseInfor = this.state.isShowBaseInfor;

    if (isShowBaseInfor === false) {
      return <div>
        <List renderHeader={() => '账号信息'}>
          <Item
            extra={'修改'}
            arrow="horizontal"
            onClick={() => {
              let myNavData = assign({}, _this.props.Nav);

              myNavData.navtitle.push('修改密码');
              myNavData.PreURL.push('/Cent/password');

              _this.props.dispatch({
                'type': 'Chan_Nav',
                'data': myNavData
              });

              _this.context.router.push('/Cent/password');
            }}
          >密码</Item>
          <Item>
            <WingBlank size="md">*********</WingBlank>
          </Item>
        </List>
        <List>
          <Item
            extra={'修改/绑定'}
            arrow="horizontal"
            onClick={() => {
              let myNavData = assign({}, _this.props.Nav);

              myNavData.navtitle.push('修改/绑定邮箱');
              myNavData.PreURL.push('/Cent/mailbox');

              _this.props.dispatch({
                'type': 'Chan_Nav',
                'data': myNavData
              });

              _this.context.router.push('/Cent/mailbox');
            }}
          >邮箱</Item>
          <Item>
            <WingBlank size="md">{this.state.email}</WingBlank>
          </Item>
        </List>
        <List>
          <Item
            extra={'修改/绑定'}
            arrow="horizontal"
            onClick={() => {
              let myNavData = assign({}, _this.props.Nav);

              myNavData.navtitle.push('修改/绑定邮箱');
              myNavData.PreURL.push('/Cent/phone');

              _this.props.dispatch({
                'type': 'Chan_Nav',
                'data': myNavData
              });

              _this.context.router.push('/Cent/phone');
            }}
          >手机</Item>
          <Item>
            <WingBlank size="md">{this.state.mobile}</WingBlank>
          </Item>
        </List>
      </div>
    }      
  }

  submitData() {
    const _this = this;
    let myGender = null;
    if (this.state.sex == ["Boy"]) {
      myGender = 1;
    }else if (this.state.sex == ["Girl"]) {
      myGender = 2;
    }

    if (this.state.birthday === null) {
      Toast.info('生日为必填', 1);
      return
    }

    const myFetchData = {
      'userName': this.state.userName,
      'nickname': this.state.nickname,
      'gender': myGender,
      'birthday':  dateToFormat(Date.parse(this.state.birthday._d)),
      'telephone': this.state.telephone,
      'webchat': this.state.webchat,
      'qq': this.state.qq
    }

    fetch( appConfig.updateUser, {
      method: 'POST',
      headers: {
        token: cookie.getItem('token'),
        digest: cookie.getItem('digest')
      },
      contentType:  'application/json; charset=utf-8',
      body: JSON.stringify(myFetchData)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      if (json.result=="0") {
        // 这里返回上一页
        let _data = assign({},_this.props.Nav);
        let _Url = _this.props.Nav.PreURL[(_data.PreURL.length-2)]
        _data.PreURL.pop();
        _data.navtitle.pop();
        _this.props.dispatch({type:'Chan_Nav',data:_data})
        _this.context.router.push(_Url);
      }else {
        Toast.fail('提交失败，原因'+json.message, 1);
      }
    })
  }

  renderBottomPay() {
    const _this = this,
      isShowBaseInfor = this.state.isShowBaseInfor;

    if (isShowBaseInfor) {
      return <div>
        <div className={styles.bottomPay}>
          <div className={styles.bottomPay} onClick={_this.submitData.bind(_this)}>保存信息</div>
        </div>
      </div>
    }
  }

  render() {
    return (
      <div>
        {this.renderNav.call(this)}
        {this.renderBaseInfor.call(this)}
        {this.renderAccountInfor.call(this)}
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        {this.renderBottomPay.call(this)}
      </div>
    )
  }
}

const Item = List.Item;
const RadioItem = Radio.RadioItem;

let minDate = new Date(-1351929600000);
minDate = dateToFormat(minDate)+' +0800';
const _minDate = moment(minDate,'YYYY-MM-DD Z');

let maxDate = new Date();
maxDate = dateToFormat(maxDate)+' +0800';
const _maxDate = moment(maxDate,'YYYY-MM-DD Z');

personal.contextTypes = {
  router: Object
}


const mapStateToProps = (state, ownProps) => ({
  Nav:state.reducer.Nav,
  user:state.reducer.user,
  routing:state.routing.locationBeforeTransitions
})

export default personal = connect(
  mapStateToProps
)(personal)



