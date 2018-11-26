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



    wx.setStorageSync("lastlogin", "D");


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
        var year1 = new Array();
        var month1 = new Array();
        var days = new Array()
        var day = new Array();
        var day1 = new Array();
        var days = new Array()
        var hh = new Array();
        var mm = new Array();
        var hh1 = new Array();
        var mm1 = new Array();
        var sj = new Array();
        var year2 = new Array();
        var month2 = new Array();
        var day2 = new Array();
        var hh2 = new Array();
        var mm2 = new Array();
        var num = 0;
        var xs = new Array();
        //循环转化时间
        for (var i = 0; i < list.length; i++) {
          var dqsj = Date.parse(new Date()) / 1000;
          var sjc = list[i].enroll_deadline_timespan;
          var sjj = sjc - dqsj;
          console.log(sjj);

          days[i] = parseInt((sjj + 3600 * 24) / (3600 * 24));
          xs[i] = parseInt((sjj) / (3600));
          console.log(days[i]);
          sj[i] = utils.sjc(sjj, 'm:s');


          var myDate = new Date(Date.parse(list[i].enroll_deadline.replace(/-/g, "/")));

          year[i] = myDate.getFullYear();
          month[i] = myDate.getMonth() + 1;
          day[i] = myDate.getDate();
          hh[i] = myDate.getHours();
          mm[i] = myDate.getMinutes();
          if (month[i] < 10) {
            month[i] = '0' + month[i];
          }


          if (day[i] < 10) {
            day[i] = '0' + day[i];
          }
          if (hh[i] < 10) {
            hh[i] = '0' + hh[i];
          }
          if (mm[i] < 10) {
            mm[i] = '0' + mm[i];
          }

        }
        for (var i = 0; i < list1.length; i++) {

          var myDate1 = new Date(Date.parse(list1[i].order_start_time.replace(/-/g, "/")));

          year1[i] = myDate1.getFullYear();
          month1[i] = myDate1.getMonth() + 1;
          day1[i] = myDate1.getDate();
          hh1[i] = myDate1.getHours();
          mm1[i] = myDate1.getMinutes();
          if (month1[i] < 10) {
            month1[i] = '0' + month1[i];
          }
          if (day1[i] < 10) {
            day1[i] = '0' + day1[i];
          }
          if (hh1[i] < 10) {
            hh1[i] = '0' + hh1[i];
          }
          if (mm1[i] < 10) {
            mm1[i] = '0' + mm1[i];
          }

          var myDate2 = new Date(Date.parse(list1[i].order_end_time.replace(/-/g, "/")));

          year2[i] = myDate2.getFullYear();
          month2[i] = myDate2.getMonth() + 1;
          day2[i] = myDate2.getDate();
          hh2[i] = myDate2.getHours();
          mm2[i] = myDate2.getMinutes();
          if (month2[i] < 10) {
            month2[i] = '0' + month2[i];
          }
          if (day2[i] < 10) {
            day2[i] = '0' + day2[i];
          }
          if (hh2[i] < 10) {
            hh2[i] = '0' + hh2[i];
          }
          if (mm2[i] < 10) {
            mm2[i] = '0' + mm2[i];
          }



        }

        //循环找出新任务中已报名
        var UserInfo = this.Base.getMyData().UserInfo;
        var bm = [];
        var ybm = [];
        var dwc=[];
        for (var a = 0; a < list.length; a++) {
          bm[a] = 0;

          for (var b = 0; b < list1.length; b++) {
            if (list[a].id == list1[b].order_id) {
              
              bm[a]++;

            }

            if (list[a].id == list1[b].order_id && list1[b].transport_name=="已报名") {
              ybm.push(list1[b]);

            }
            if (list[a].id == list1[b].order_id && list1[b].transport_name== "待完成") {
              dwc.push(list1[b]);

            }



            if (list[a].id == list1[b].order_id && UserInfo.openid == list1[b].openid) {

              list[a].status = "O";

            }
          }
          if (list[a].taskstatus_name == "报名中" && list[a].status == "A" && days[a] > 0) {
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
          bm: bm,
          hh: hh,
          xs: xs,
          mm: mm,
          year1: year1,
          month1: month1,
          day1: day1,
          hh1: hh1,
          mm1: mm1,
          year2: year2,
          month2: month2,
          day2: day2,
          hh2: hh2,
          mm2: mm2

        });
        orderapi.applylist({
          transport_name: "待完成"
        }, (list2) => {

          this.Base.setMyData({
            ybm: ybm,
            list2: list2,
           dwc:dwc
          });

        })
        this.Base.setMyData({
          list1: list1

        });
        this.Countdown(list);

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
  onHide() {

    clearInterval(this.timer);





  }

  Countdown(list) {
    var that = this;
    this.timer = setInterval(() => {

      var orderapi = new OrderApi();


      var days = new Array()

      var sj = new Array();
      var xs = new Array();
      var num = 0;
      //循环转化时间
      for (var i = 0; i < list.length; i++) {


        var dqsj = Date.parse(new Date()) / 1000;
        var sjc = list[i].enroll_deadline_timespan;
        var sjj = sjc - dqsj;

        days[i] = parseInt((sjj + 3600 * 24) / (3600 * 24));
        xs[i] = parseInt((sjj) / 3600);

        sj[i] = utils.sjc(sjj, 'm:s')
      }
      content.setMyData({

        days: days,
        sj: sj,
        xs: xs


      })

    }, 1000);



  }

}
var tab = null;
var timer = 1;
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