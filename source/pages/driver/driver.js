// pages/driver/driver.js
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
import {
  date
} from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.setMyData({

    })

    this.setData({
      array: ['所有', '离我最近', '费用最高'],
      objectArray: [{
          id: 0,
          name: '所有'
        },
        {
          id: 1,
          name: '离我最近'
        },
        {
          id: 2,
          name: '费用最高'
        }

      ],
      index: 0,
      tab: 0,


    })

    super.onLoad(options);

  }


  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '司机首页',

    });
  }


  onMyShow() {

    var that = this;
    //查询所有列表 

    var orderapi = new OrderApi();
    orderapi.applylist({}, (list1) => {




      this.Base.setMyData({
        list1: list1
      });







    })

    orderapi.list({}, (list) => {
      this.Base.setMyData({
        list
      });
      var year = new Array();
      var month = new Array();
      var day = new Array();
      var num = 0;
      //循环转化时间
      for (var i = 0; i < list.length; i++) {
        var myDate = new Date(list[i].enroll_deadline);

        year[i] = myDate.getFullYear();
        month[i] = myDate.getMonth() + 1;
        if (month[i] < 10) {
          month[i] = '' + myDate.getMonth() + 1;
        }
        day[i] = myDate.getDate();

        if (day[i] < 10) {
          day[i] = '0' + myDate.getDate();
        }

        if (list[i].taskstatus_name == "报名中") {
          num++;
        }
      }
      
      this.Base.setMyData({
        num: num,
        year: year,
        month: month,
        day: day
      });
    });
  }
  qwe(e) {
    this.setData({
      index: e.detail.value
    })
  }
  changetab(e) {
    this.Base.setMyData({
      tab: e.currentTarget.id
    });
  }

}
var tab = null;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qwe = content.qwe;
body.changetab = content.changetab;
Page(body)