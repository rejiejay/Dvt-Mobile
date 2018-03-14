import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyNavBar from './../../../components/MyNavBar/index';
import SwitchBolck from './../../../components/UserSame/SwitchBolck';
import config from './../../../config';
import cookies from './../../../utils/cookies';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'address': false
    }
  }

  componentDidMount() {
    const _this = this;

    this.getAddressInfo()
    .then((val) => {
      if (val.length > 0) {
        _this.setState({'address': val});
      }
    });
  }

  getAddressInfo() {
    const _this = this;

    return new Promise((resolve, reject) => {
      fetch(`${config.URLversion}/user/address/findByUserId.do`, {
        'method': 'GET',
        'contentType': 'application/json; charset=utf-8',
        'headers':{
          'token': cookies.getItem('token'),
          'digest': cookies.getItem('digest')
        }
      }).then(
        (response) => ( response.json() ),
        (error) => ({'result': '1', 'message': error})
      ).then((json) => {
        if (json.result === '0') {
          resolve(json.data);
        } else {
          reject(Modal.alert('获取旅客信息失败', `请求服务器成功, 但是返回的旅客信息有误! 原因: ${json.message}`));
        }
      }).catch((error) => {
        reject(Modal.alert('请求出错', `向服务器发起请求旅客信息失败, 原因: ${error}`));
      })
    })
  }

  jumpToAddAddress(data) {
    localStorage.setItem('Address-Type', 'add');
    this.props.dispatch(routerRedux.push('/user/address/edit'));
  }

  jumpToEditAddress() {
    localStorage.setItem('Address-Type', 'edit');
    localStorage.setItem('Address-Info', JSON.stringify({

    }));
    this.props.dispatch(routerRedux.push('/user/address/edit'));
  }

  renderAddressList() {
    if (this.state.address) {
      return (
        <div className='address-list'>
      
        </div>
      );

    }

    return (<div className='address-none'>暂无数据</div>);
  }

  render() {
    return (
      <div className="address">
        <MyNavBar
          navName='收货地址'
          returnURL='/user/index'
        />

        {this.renderAddressList.call(this)}

        <div className='submit-bottom'>
          <div className='submit-btn' 
            onClick={this.jumpToAddAddress.bind(this)}
          >新增收货地址</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect()(Address);