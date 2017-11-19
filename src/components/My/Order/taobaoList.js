import assign from 'lodash.assign'
import { connect } from 'react-redux'
import React, {Component} from 'react';
import { WhiteSpace, List, Tabs } from 'antd-mobile';

import appConfig from './../../../config/index.js';
import cookie from './../../../method/cookie.js';

import styles from './styles.scss'


const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;


class taobaoList extends Component {
  constructor(props, context) {
    super(props,context);
    this.state = {
      List:[]
    };

    this.pageNum = 1;
    this.pages;
    this.pagetotalCountNum;
  }
  componentWillMount(){
    let _this = this;

    getTaobaoList()
    .then(function(json) {
      if (json.result == '0') {
        _this.setState({'List': json.data.list});
      } else {
        alert(`获取所有订单失败, 原因 ${json.message}`);
      }
    });

    const bindScroll = () => {
      let isLoding = false;
      const ProductDOM = document.documentElement || window,
        clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
        OrderAll = document.getElementById("OrderAll");

      window.onscroll = (event) => {
        const documentScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        const myScrollTop = documentScrollTop + clientHeight,
          OrderAlloffsetTop = OrderAll.offsetHeight + 110;

        if (myScrollTop > OrderAlloffsetTop && isLoding === false && _this.props.Order.data.length !== _this.totalCount) {
          isLoding = true;
          Toast.loading('加载中...');
          _this.pageNum++;

          getTaobaoList(_this.pageNum)
          .then((json) => {
            if (json.result == '0') {
              _this.setState({'list': _this.state.list.concat(json.data.list)});
              isLoding = false;
              Toast.hide();
            } else {
              alert(`获取所有订单失败, 原因 ${json.message}`);
            }
          })
        }
      }
    }
    bindScroll();
  }
  
  componentWillUnmount() {
    window.onscroll = (event) => {};
  }

  render() {
    return (
      <div>
        <div style={{height:"1px",background:"#ddd"}}></div>
        <div className={styles.NavR}>
          <div className={styles.NavRL} onClick={function(){
            this.context.router.push('/Cent/Order');
          }.bind(this)}>商城订单</div>
          <div className={styles.NavRR}>淘宝订单</div>
        </div>
        <div style={{
          position: 'absolute',
          textAlign: 'center',
          width: '100%',
          padding: '20px 0px 0px 0px'
        }}>暂无数据</div>
        <div id='OrderAll'>{this.state.List.map(function(index, elem) {
          if (index.payStatus == 1) {
            return <div onClick={() => {
              localStorage.setItem('_token',cookie.getItem('token'));
              localStorage.setItem('_digest',cookie.getItem('digest'));
              localStorage.setItem('_uniqueKey',index.uniqueKey);
              localStorage.setItem('loginSuccessful',JSON.stringify(index));
              // 页面跳转
              // window.open("./../info/gather.html");
              // 手机端测试的
              window.location.href="./../Dvt-web/info/gather.html";
            }}>
             <List className="my-list">
                <Item arrow="horizontal" multipleLine>
                  <div className={styles.taobaotitle}>
                    <div>订单号:{index.orderSn}<span>状态:已付全款</span></div>
                  </div>
                  <Brief>
                    <div className={styles.taobaoList}>
                      <div>{index.orderName}</div>
                      <div>{index.orderDesc}</div>
                      <div>{dateToFormat(index.checkIn)}到{dateToFormat(index.checkOut)}<span>{index.roomNum}间房/{index.adultNum}成人/{index.childNum}儿童</span></div>
                      <div>产品总金额:{index.productAmount}RMB</div>
                      <div>优惠金额:{index.discount}RMB<span>订单总金额:{index.orderAmount}RMB</span></div>
                    </div>
                  </Brief>
                </Item>
              </List>
              <WhiteSpace size="lg" />
            </div>
          }else {
            return <div onClick={() => {
              localStorage.setItem('_token',cookie.getItem('token'));
              localStorage.setItem('_digest',cookie.getItem('digest'));
              localStorage.setItem('_uniqueKey',index.uniqueKey);
              localStorage.setItem('loginSuccessful',JSON.stringify(index));
              // 页面跳转
              // window.open("./../info/gather.html");
              // 手机端测试的
              window.location.href="./../Dvt-web/info/gather.html"
            }}>
             <List className="my-list">
                <Item arrow="horizontal" multipleLine>
                  <div className={styles.taobaotitle}>
                    <div>订单号:{index.orderSn}<span>状态:已付定金</span></div>
                  </div>
                  <Brief>
                    <div className={styles.taobaoList}>
                      <div>{index.orderName}</div>
                      <div>{index.orderDesc}</div>
                      <div>{dateToFormat(index.checkIn)}到{dateToFormat(index.checkOut)}<span>{index.roomNum}间房/{index.adultNum}成人/{index.childNum}儿童</span></div>
                      <div>产品总金额:{index.productAmount}RMB</div>
                      <div>优惠金额:{index.discount}RMB<span>订单总金额:{index.orderAmount}RMB</span></div>
                    </div>
                  </Brief>
                </Item>
              </List>
              <WhiteSpace size="lg" />
            </div>
          }
          // stamp 转换 xxxx-xx-xx 字符串
          function dateToFormat(stamp) {
            var _data = new Date(stamp);

            var year = _data.getFullYear();//获取完整的年份(4位,1970)

            var month = _data.getMonth()+1;//获取月份(0-11,0代表1月,用的时候记得加上1)

            if( month <= 9 ){
              month = "0"+month;
            }

            var date = _data.getDate();//获取日(1-31)

            if( date <= 9 ){
              date = "0"+date;
            }

            return year+"-"+month+"-"+date;
          }
        })}</div>
      </div>
    )
  }
}


const getTaobaoList = (pageNum, pageSize) => (
  fetch( `${appConfig.URLversion}/gather/link/${pageNum ? pageNum : 1}/${pageSize ? pageSize : 10}/listOrder.do`, {
    method: "GET",
    contentType: "application/json; charset=utf-8",
    headers:{
      token:cookie.getItem('token'),
      digest:cookie.getItem('digest')
    }
   }).then(
    (response) => ( response.json() ),
    (error) => ({'result': 1, 'message': error})
  )
)

taobaoList.contextTypes = {
  router: Object
}

const mapStateToProps = (state, ownProps) => ({
  Nav:state.reducer.Nav,
  village:state.reducer.village,
  routing:state.routing.locationBeforeTransitions
})


export default taobaoList = connect(
  mapStateToProps
)(taobaoList)

