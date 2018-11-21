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
var utils = require('../../utils/util.js')

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
  sj(date){

    
     var year = date.getFullYear()
     var month = date.getMonth() + 1
     var day = date.getDate()

     var hour = date.getHours()
     var minute = date.getMinutes()
     var second = date.getSeconds()

     return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
   

 }

  onMyShow() {

    var that = this;
    //查询所有列表 
    console.log(6666666);
   
    var orderapi = new OrderApi();
    orderapi.applylist({}, (list1) => {
      
      orderapi.list({}, (list) => {
          
          
          
          console.log(sj);
        var year = new Array();
        var month = new Array();
        var day = new Array();
        var sj=new Array();
        var num = 0;
        //循环转化时间
        for (var i = 0; i < list.length; i++) {
          var dqsj = Date.parse(new Date()) / 1000;
          var sjc = list[i].enroll_deadline_timespan;
           
          

          sj[i] = utils.sjc(sjc-dqsj, ' h:m:s')
        
      
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
          
        }

        
        //循环找出新任务中已报名
        var UserInfo = this.Base.getMyData().UserInfo;
        for (var a = 0; a < list.length; a++) {
         
          for (var b = 0; b < list1.length; b++) {

            if (list[a].id == list1[b].order_id && UserInfo.openid == list1[b].openid) {


              console.log(list[a].id);
              list[a].status = "O";

            }
          }
          if (list[a].taskstatus_name == "报名中" && list[a].status == "A") {
            num++;
          }
        }
        this.Base.setMyData({
          num: num,
          year: year,
          month: month,
          day: day,
          sj:sj
        });
        this.Base.setMyData({ list1: list1 });
        this.Base.setMyData({ list });
      });


    })


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
body.sj=content.sj;
Page(body)