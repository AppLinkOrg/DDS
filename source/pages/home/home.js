// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      allshow: 1,
      state_id: 0,
      today: this.Base.util.FormatDate(new Date())
    });

    wx.setStorageSync("lastlogin", "Q");

    var orderapi = new OrderApi();
    orderapi.orderstatus({
      orderby: "r_main.id desc"
    }, (statuslist) => {
      statuslist.push({
        id: "",
        odrstatusname: "所有发布"
      });
      this.Base.setMyData({
        statuslist
      })
    })

  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    var num = [];
    var UserInfo = this.Base.getMyData().UserInfo;
    var all = [];
   
    orderapi.list({
      orderby: "r_main.created_date desc"
    }, (list) => {

      orderapi.applylist({}, (applylist) => {
        for (var i = 0; i < list.length; i++) {
          all[i] = 0;
          for (var j = 0; j < applylist.length; j++) {
            if (list[i].id == applylist[j].order_id) {
              all[i]++;
              console.log(all);
            }
          }
        }
        this.Base.setMyData({
          applylist,
          all: all
        });
      });
      
      this.Base.setMyData({
        list
      });

    });

    orderapi.list({
      member_id_name: UserInfo.nickName,
      orderby: "r_main.created_date desc"
    }, (minelist) => {
      orderapi.applylist({}, (applylist) => {
        for (var i = 0; i < minelist.length; i++) {
          num[i] = 0;
          for (var j = 0; j < applylist.length; j++) {
            if (minelist[i].id == applylist[j].order_id) {
              num[i]++;
              console.log(num);
            }
          }
        }
        this.Base.setMyData({
          applylist,
          num: num
        });
      });
      this.Base.setMyData({
        minelist
      });
    });
  }
  bindall(e) {
    console.log(e);
    this.Base.setMyData({
      allshow: 1,
      mineshow: 1
    });
  }
  bindmine(e) {
    console.log(e);
    this.Base.setMyData({
      allshow: 2,
      mineshow: 2
    });
  }

  bindpickerstate(e) {
    console.log(e);
    var statuslist = this.Base.getMyData().statuslist;
    this.Base.setMyData({
      state_idx: e.detail.value,
      state_id: statuslist[e.detail.value].id,
      state_name: statuslist[e.detail.value].odrstatusname
    });
    var state_id = this.Base.getMyData().state_id;
    var orderapi = new OrderApi();
    orderapi.list({
      taskstatus: state_id,
      orderby: "r_main.created_date"
    }, (list) => {
      this.Base.setMyData({
        list
      });
    });
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.list({
      member_id_name: UserInfo.nickName,
      taskstatus: state_id,
      orderby: "r_main.created_date"
    }, (minelist) => {
      this.Base.setMyData({
        minelist
      });
    });

  }
  one(e){
    var orderapi = new OrderApi();
    var UserInfo=this.Base.getMyData().UserInfo;
    orderapi.enterpriselist({ member_id: UserInfo.nickName }, (errlist) => {
      this.Base.setMyData({ errlist })

      console.log(errlist[0].status);
    })
    var errlist = this.Base.getMyData().errlist;
     if(status!="B"){
       wx.showToast({
         title: 'ssss',
       })
     }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindall = content.bindall;
body.bindmine = content.bindmine;
body.bindpickerstate = content.bindpickerstate;
body.one = content.one;
Page(body)