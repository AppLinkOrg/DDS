
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
    this.Countdown();
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
  sj(date) {


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
   
    var orderapi = new OrderApi();
    orderapi.applylist({}, (list1) => {

      orderapi.list({}, (list) => {

        var year = new Array();
        var month = new Array();
        var days = new Array()
        var day = new Array();
        var sj = new Array();
        var num = 0;
        //循环转化时间
        for (var i = 0; i < list.length; i++) {
          var dqsj = Date.parse(new Date()) / 1000;
          var sjc = list[i].enroll_deadline_timespan;
          var sjj = sjc - dqsj;

          days[i] = parseInt(sjj / (3600 * 24));

          sj[i] = utils.sjc(sjj, ' h:m:s')


          var myDate = new Date(Date.parse(list[i].enroll_deadline.replace(/-/g, "/")));

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
        var bm = [];
        for (var a = 0; a < list.length; a++) {
          bm[a] = 0;
          
          for (var b = 0; b < list1.length; b++) {
            if (list[a].id == list1[b].order_id) {
            
              bm[a]++;

            }

            if (list[a].id == list1[b].order_id && UserInfo.openid == list1[b].openid) {



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
          days: days,
          sj: sj,
          bm: bm
        });
        orderapi.applylist({ transport_name: "待完成" }, (list2) => {

          this.Base.setMyData({
            list2: list2

          });

        })
        this.Base.setMyData({
          list1: list1

        });
        this.Base.setMyData({
          list
        });
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
  onUnload() {
    console.log(9999999999);
    clearInterval((timer) =>{

    


    })
    
  }

  Countdown() {
    var that = this;
    this.timer = setInterval(() => {
      console.log(this.timer);
      var orderapi = new OrderApi();
      orderapi.list({}, (list) => {
 
        var days = new Array()

        var sj = new Array();
        var num = 0;
        //循环转化时间
        for (var i = 0; i < list.length; i++) {
          var dqsj = Date.parse(new Date()) / 1000;
          var sjc = list[i].enroll_deadline_timespan;
          var sjj = sjc - dqsj;

          days[i] = parseInt(sjj / (3600 * 24));

          sj[i] = utils.sjc(sjj, ' h:m:s')
        }
        content.setMyData({

          days: days,
          sj: sj,

        });

      })

    }, 10000);



  }

}
var tab = null;
var timer=1;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qwe = content.qwe;
body.changetab = content.changetab;
body.sj = content.sj;
body.Countdown = content.Countdown;
body.setTimeout = content.setTimeout;
Page(body)