import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign'
import appConfig from './config/index.js';
import cookie from './method/cookie.js';

import vconsole from 'vconsole';
new vconsole();

// 引入React-Router模块
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

// 自定义 less 改变ant默认theme或者增添全局的样式
// import './index.css';


/*
 * redux
 */

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';


import reducer from './reducers';

/*
 * components
 */

import Nav from './components/Navigation/index';
import Home from './components/Home/index';



//const store = createStore(reducer)
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);






// 异步获取路由
// 客服中心
const Cus = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/Service/index').default)
  }, 'Cus')
}
// 度假村指定
const village = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/village/index').default)
  }, 'village')
}
  const villageDetail = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/village/detail').default)
    }, 'villageDetail')
  }
  const villageSubmit = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/village/submit').default)
    }, 'villageSubmit')
  }
  const villageresult = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/village/result').default)
    }, 'villageresult')
  }

// 个人中心
const Cent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/My/index').default)
  }, 'Cent')
}
  const login = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/My/login/login').default)
    }, 'login')
  }
  const forget = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/My/login/forget').default)
    }, 'forget')
  }
  const signup = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/My/login/signup').default)
    }, 'signup')
  }
  const personal = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/My/personalCenter/personal').default)
    }, 'personal')
  }
  const phone = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/My/personalCenter/phone').default)
    }, 'phone')
  }
  const password = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/My/personalCenter/password').default)
    }, 'password')
  }
  const mailbox = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/My/personalCenter/mailbox').default)
    }, 'mailbox')
  }
    // 订单
    const Order = (location, callback) => {
      require.ensure([], require => {
        callback(null, require('./components/My/Order/index').default)
      }, 'Order')
    }
    const detail = (location, callback) => {
      require.ensure([], require => {
        callback(null, require('./components/My/Order/detail').default)
      }, 'detail')
    }
    const taobaoList = (location, callback) => {
      require.ensure([], require => {
        callback(null, require('./components/My/Order/taobaoList').default)
      }, 'taobaoList')
    }
    // 旅客信息
    const Passenger = (location, callback) => {
      require.ensure([], require => {
        callback(null, require('./components/My/Passenger/Passenger').default)
      }, 'Passenger')
    }
    const PassengerEdit = (location, callback) => {
      require.ensure([], require => {
        callback(null, require('./components/My/Passenger/PassengerEdit').default)
      }, 'PassengerEdit')
    }
// 详情页
const Detail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/Home/Details/index').default)
  }, 'Detail')
 }
  const travel = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/Home/Details/travel').default)
    }, 'travel')
  }
  const submit = (location, callback) => {
    require.ensure([], require => {
      callback(null, require('./components/Home/Details/submit').default)
    }, 'submit')
  }



// 路由过滤
const HomeFilter = () => {
  let _Nav = store.getState().reducer.Nav;

  let _data = assign({},_Nav);

  _data.nav = {display:"block"};

  _data.navtitle = ['潜游时光'];
  _data.PreURL = ['/'];
  _data.leftContent = {
    return:false,
    logo:'home'
  };

  _data.hidden = false;
  _data.selectedTab = 'Home';

  store.dispatch({type:'Chan_Nav',data:_data});
}
const SubmitFilter = () => {
  let _Nav = store.getState().reducer.Nav,
    _User = store.getState().reducer.user;
  if ( cookie.getItem('token')==null && cookie.getItem('digest')==null ) {
    history.push('/Cent/login');
    location.reload();
    return
  }else {
    if (_User == false ) {
      fetch(
        appConfig.getUserInfo,{
        method: "GET",
        contentType: "application/json; charset=utf-8",
        headers:{
          token:cookie.getItem('token'),
          digest:cookie.getItem('digest')
        }
       }).then(function(response) {
        return response.json()
       }).then(function(json) {
        if (json.result=="0") {
          // 数据储存到 redux
          store.dispatch({
            type: 'USER_ADD',
            data: json.data
          })
          // 获取所有旅客信息
          fetch(
            appConfig.userinfoFindByUserId,{
            method: "GET",
            contentType: "application/json; charset=utf-8",
            headers:{
              token:cookie.getItem('token'),
              digest:cookie.getItem('digest')
            }
           }).then(function(response) {
            return response.json()
           }).then(function(json) {
            if (json.result=="0") {
              // 数据储存到 redux
              store.dispatch({
                type:'Chan_Passenger',
                data:json.data
              })
            }else {
              alert("获取所有旅客信息失败");
              history.push('/');
              location.reload();
            }
          })
          return
        }else {
          // 先将 cookie 移除掉
          cookie.removeItem('token',"/");
          cookie.removeItem('digest',"/");
          history.push('/Cent/login');
          location.reload();
          return
        }
      })
      return
    }else {
      // 获取所有旅客信息
      fetch(
        appConfig.userinfoFindByUserId,{
        method: "GET",
        contentType: "application/json; charset=utf-8",
        headers:{
          token:cookie.getItem('token'),
          digest:cookie.getItem('digest')
        }
       }).then(function(response) {
        return response.json()
       }).then(function(json) {
        if (json.result=="0") {
          // 数据储存到 redux
          store.dispatch({
            type:'Chan_Passenger',
            data:json.data
          })
        }else {
          alert("获取所有旅客信息失败");
          history.push('/');
          location.reload();
        }
      })
    }
  }

}
const CentFilter = () => {
  let _Nav = store.getState().reducer.Nav,
    _User = store.getState().reducer.user;
  if ( cookie.getItem('token')==null && cookie.getItem('digest')==null ) {
    history.push('/Cent/login');
    location.reload();
    return
  }else {
    if (_User == false ) {
      fetch(
        appConfig.getUserInfo,{
        method: "GET",
        contentType: "application/json; charset=utf-8",
        headers:{
          token:cookie.getItem('token'),
          digest:cookie.getItem('digest')
        }
       }).then(function(response) {
        return response.json()
       }).then(function(json) {
        if (json.result=="0") {
          // 数据储存到 redux
          store.dispatch({
            type:'USER_ADD',
            data:json.data
          })
          return
        }else {
          // 先将 cookie 移除掉
          cookie.removeItem('token',"/");
          cookie.removeItem('digest',"/");
          history.push('/Cent/login');
          location.reload();
          return
        }
      })
      return
    }else {
      let _NavData = assign({},_Nav);

      _NavData.nav = {display:"block"};

      _NavData.RightContent = 'successful';

      _NavData.navtitle = ['个人中心'];
      _NavData.PreURL = ['/Cent'];
      _NavData.leftContent = {
        return:false,
        logo:'home'
      };

      _NavData.hidden = false;
      _NavData.selectedTab = 'Me';

      store.dispatch({type:'Chan_Nav',data:_NavData});
    }
  }
}
const DetailFilter = () => {
  let _Order = store.getState().reducer.Order;
  if (_Order.select == 'false') {
    history.push('/');
    location.reload();
  }
}
const PassengerFilter = () => {
  // 获取所有旅客信息
  fetch(
    appConfig.userinfoFindByUserId,{
    method: "GET",
    contentType: "application/json; charset=utf-8",
    headers:{
      token:cookie.getItem('token'),
      digest:cookie.getItem('digest')
    }
   }).then(function(response) {
    return response.json()
   }).then(function(json) {
    if (json.result=="0") {
      // 数据储存到 redux
      store.dispatch({
        type:'Chan_Passenger',
        data:json.data
      })
    }else {
      alert("获取所有旅客信息失败");
      history.push('/');
      location.reload();
    }
  });
}

const PassengerEditFilter = () => {
  let myNav = store.getState().reducer.Nav;

  myNav.PreURL = ['/Cent' , '/Cent/Passenger'];
  myNav.navtitle = ['个人中心', '旅客信息'];
  myNav.leftContent = { return: 'left', logo: false };

  store.dispatch({
    type: 'Chan_Nav',
    data: myNav
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={ history }>
      <Route path="/" component={Nav}>
        <IndexRoute component={Home} onEnter={HomeFilter}/>
        <Route path="/Detail">
          <IndexRoute component={require('./components/Home/Details/index').default}/>
          <Route path="/Detail/travel" component={require('./components/Home/Details/travel').default}/>
          <Route path="/Detail/submit" component={require('./components/Home/Details/submit').default} onEnter={SubmitFilter}/>
        </Route>
        <Route path="/Cus" component={require('./components/Service/index').default}/>
        <Route path="/village">
          <IndexRoute component={require('./components/village/index').default}/>
          <Route path="/village/detail" component={require('./components/village/detail').default}/>
          <Route path="/village/submit" component={require('./components/village/submit').default} onEnter={SubmitFilter}/>
          <Route path="/village/summary" component={require('./components/village/result').default}/>
        </Route>
        <Route path="/Cent">
          <IndexRoute component={require('./components/My/index').default} onEnter={CentFilter}/>
          <Route path="/Cent/forget" component={require('./components/My/login/forget').default}/>
          <Route path="/Cent/signup" component={require('./components/My/login/signup').default}/>
          <Route path="/Cent/personal" component={require('./components/My/personalCenter/personal').default}/>
          <Route path="/Cent/password" component={require('./components/My/personalCenter/password').default}/>
          <Route path="/Cent/phone" component={require('./components/My/personalCenter/phone').default}/>
          <Route path="/Cent/mailbox" component={require('./components/My/personalCenter/mailbox').default}/>

          <Route path="/Cent/Order">
            <IndexRoute component={require('./components/My/Order/index').default}/>
            <Route path="/Cent/Order/detail" component={require('./components/My/Order/detail').default} onEnter={DetailFilter}/>
          </Route>
          <Route path="/Cent/taobao" component={require('./components/My/Order/taobaoList').default}/>

          <Route path="/Cent/Passenger" onEnter={PassengerFilter}>
            <IndexRoute component={require('./components/My/Passenger/Passenger').default}  onEnter={PassengerEditFilter}/>
            <Route path="/Cent/Passenger/edit" component={require('./components/My/Passenger/PassengerEdit').default}/>
          </Route>

        </Route>
        <Route path="/Cent/login" component={require('./components/My/login/login').default}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)