// pages/release/release.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var orderapi = new OrderApi();
    orderapi.goodslist({orderby:"r_main.seq"}, (goodslist) => {
      this.Base.setMyData({ goodslist });
    });
    var orderapi = new OrderApi();
    orderapi.memberlist({}, (memberlist) => {
      this.Base.setMyData({ memberlist })
    })
    
    this.Base.setMyData({
      today: this.Base.util.FormatDate(new Date()),
    });
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: '任务发布',
    });
    
  }
  bindgoods(e) {
    var goodslist = this.Base.getMyData().goodslist;
    this.Base.setMyData({
      goods_idx: e.detail.value,
      goods_id: goodslist[e.detail.value].id,
      goodstype:goodslist[e.detail.value].name
    });
  }
  bindenroll(e) {
    var enrolllist = this.Base.getMyData().memberlist;
    this.Base.setMyData({
      enroll_idx: e.detail.value,
      enroll_id: enrolllist[e.detail.value].id,
      elcontact: enrolllist[e.detail.value].name
    });
  }
  bindstartcontact(e) {
    var startcontactlist = this.Base.getMyData().memberlist;
    this.Base.setMyData({
      startcontact_idx: e.detail.value,
      startcontact_id: startcontactlist[e.detail.value].id,
      stcontact: startcontactlist[e.detail.value].name
    });
  }
  bindendcontact(e) {
    var endcontactlist = this.Base.getMyData().memberlist;
    this.Base.setMyData({
      endcontact_idx: e.detail.value,
      endcontact_id: endcontactlist[e.detail.value].id,
      edcontact: endcontactlist[e.detail.value].name
    });
  }
  bindstartdate(e){
    console.log(e);
    this.setData({
      startdate: e.detail.value
    })
  }

  bindstarttime(e) {
    console.log(e);
    this.setData({
      starttime: e.detail.value
    })
  }

  bindendtime(e) {
    this.setData({
      endtime: e.detail.value
    })
  }
  
  bindenddate(e) {
    this.setData({
      enddate: e.detail.value
    })
  }
  tst_startdate(e){
    this.setData({
      tstdate: e.detail.value
    })
  }
  tst_starttime(e) {
    this.setData({
      tsttime: e.detail.value
    })
  }
  tst_enddate(e) {
    this.setData({
      tstenddate: e.detail.value
    })
  }
  tst_endtime(e) {
    this.setData({
      tstendtime: e.detail.value
    })
  }

  // binddt(e) {
  //   var date = e.detail.value;
  //   console.log(date);
  //   this.Base.setMyData({
  //     date: e.detail.value
  //   })
  // }
   bindrelease(e){
     var orderapi = new OrderApi();
     orderapi.create({}, (create) => {
       this.Base.setMyData({ create })
     })
   }
  startcontactdate(e){
    var scdate = e.detail.value;
    console.log(scdate);
      this.Base.setMyData({
        scdate: e.detail.value
      })
  }
  startcontacttime(e) {
    var sctime = e.detail.value;
    console.log(sctime);
    this.Base.setMyData({
      sctime: e.detail.value
    })
  }
  endcontactdate(e) {
    var ecdate = e.detail.value;
    console.log(ecdate);
    this.Base.setMyData({
      ecdate: e.detail.value
    })
  }
  endcontacttime(e) {
    var ectime = e.detail.value;
    console.log(endcontacttime);
    this.Base.setMyData({
      ectime: e.detail.value
    })
  }

  starttransportdate(e) {
    var stpdate = e.detail.value;
    console.log(stpdate);
    this.Base.setMyData({
      stpdate: e.detail.value
    })
  }
  starttransporttime(e) {
    var stptime = e.detail.value;
    console.log(stptime);
    this.Base.setMyData({
      stptime: e.detail.value
    })
  }
  endtransportdate(e) {
    var etpdate = e.detail.value;
    console.log(etpdate);
    this.Base.setMyData({
      etpdate: e.detail.value
    })
  }
  endtransporttime(e) {
    var etptime = e.detail.value;
    console.log(etptime);
    this.Base.setMyData({
      etptime: e.detail.value
    })
  }
  goodsweight(e){
    var gdsweight = e.detail.value;
    console.log(gdsweight);
    this.Base.setMyData({
      gdsweight: e.detail.value
    })
  } 
  goodstype(e) {
    var gdstype = e.detail.value;
    console.log(gdstype);
    this.Base.setMyData({
      gdstype: e.detail.value
    })
  }
  cost(e){
    var tstcost = e.detail.value;
    console.log(tstcost);
    this.Base.setMyData({
      tstcost: e.detail.value
    })
  } 
  carnumber(e) {
    var carnum = e.detail.value;
    console.log(carnum);
    this.Base.setMyData({
      carnum: e.detail.value
    })
  }
  enrollcontact(e) {
    var elcontact = e.detail.value;
    console.log(elcontact);
    this.Base.setMyData({
      elcontact: e.detail.value
    })
  }
  startcontact(e) {
    var stcontact = e.detail.value;
    console.log(stcontact);
    this.Base.setMyData({
      stcontact: e.detail.value
    })
  }
  endcontact(e) {
    var edcontact = e.detail.value;
    console.log(edcontact);
    this.Base.setMyData({
      edcontact: e.detail.value
    })
  } 
  bindremark(e) {
    var remark = e.detail.value;
    console.log(remark);
    this.Base.setMyData({
      remark: e.detail.value
    })
  }



  confirm(e) {
    var data = e.detail.value;
    if (data.scdate == "") {
      this.Base.info("请选择报名开始日期");
      return;
    }
    // if (data.sctime == "") {
    //   this.Base.info("请选择报名开始时间");
    //   return;
    // }
    if (data.ecdate == "") {
      this.Base.info("请选择报名截止日期");
      return;
    }
    // if (data.ectime == "") {
    //   this.Base.info("请选择报名截止时间");
    //   return;
    // }
    if (data.stpdate == "") {
      this.Base.info("请选择运输开始日期");
      return;
    }
    // if (data.stptime == "") {
    //   this.Base.info("请选择运输开始时间");
    //   return;
    // }
    if (data.etpdate == "") {
      this.Base.info("请选择运输结束日期");
      return;
    }
    if (data.carnumber == "") {
      this.Base.info("请输入车辆数目");
      return;
    }
    if (data.gdsweight == "") {
      this.Base.info("请输入货物吨数");
      return;
    }
    if (data.gdstype == "") {
      this.Base.info("请选择货运类型");
      return;
    }
    if (data.tstcost == "") {
      this.Base.info("请输入运输费用");
      return;
    }
    if (data.elcontact == "") {
      this.Base.info("请选择报名联系人");
      return;
    }
    if (data.stcontact == "") {
      this.Base.info("请选择起点联系人");
      return;
    }
    if (data.edcontact == "") {
      this.Base.info("请选择终点联系人");
      return;
    }
    var startdate = this.Base.getMyData().startdate;
    var sctime = this.Base.getMyData().sctime;
    var enddate = this.Base.getMyData().enddate;
    var ectime = this.Base.getMyData().ectime;
    var tstdate = this.Base.getMyData().tstdate; 
    var carnum = this.Base.getMyData().carnum;
    var stptime = this.Base.getMyData().stptime;
    var tstenddate = this.Base.getMyData().tstenddate;
    var etptime = this.Base.getMyData().etptime;
    var gdsweight = this.Base.getMyData().gdsweight;
    var goodstype = this.Base.getMyData().goodstype;
    var tstcost = this.Base.getMyData().tstcost;
    var elcontact = this.Base.getMyData().elcontact;
    var stcontact = this.Base.getMyData().stcontact;
    var edcontact = this.Base.getMyData().edcontact;
    var remark = this.Base.getMyData().remark;
    var orderapi = new OrderApi();
    orderapi.create({
      status:"A",
      enroll_start: startdate,
      enroll_deadline: enddate,
      start_time: tstdate,
      end_time: tstenddate,
      weight: gdsweight,
      carcount: carnum,
      stuff_type_id: goodstype,
      unitprice: tstcost,
      enroll_contact: elcontact,
      start_contact: stcontact,
      end_contact: edcontact,
      remark: remark
    }, (create) => {
      // wx.reLaunch({
      //   url: '/pages/home/home'
      // })
    })
  }

  openRoute() {
    var route = this.Base.getMyData().route;
    if (route != undefined) {
      wx.navigateTo({
        url: '/pages/route/route?callbackid=route&route=' + JSON.stringify(route),
      })
    } else {

      wx.navigateTo({
        url: '/pages/route/route?callbackid=route',
      })
    }
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindgoods = content.bindgoods;
body.bindstartdate = content.bindstartdate;
body.bindenddate = content.bindenddate;
body.bindstarttime = content.bindstarttime;
body.bindendtime = content.bindendtime; 
body.bindenroll = content.bindenroll;
body.bindstartcontact = content.bindstartcontact;
body.bindendcontact = content.bindendcontact;
body.tst_enddate = content.tst_enddate;
body.tst_endtime = content.tst_endtime;
body.tst_startdate = content.tst_startdate;
body.tst_starttime = content.tst_starttime; 
body.bindrelease = content.bindrelease; 
body.startcontactdate = content.startcontactdate; 
body.startcontacttime = content.startcontacttime;
body.endcontactdate = content.endcontactdate;
body.endcontacttime = content.endcontacttime;
body.starttransportdate = content.starttransportdate;
body.starttransporttime = content.starttransporttime;
body.endtransportdate = content.endtransportdate;
body.endtransporttime = content.endtransporttime;
body.goodsweight = content.goodsweight;
body.goodstype = content.goodstype; 
body.cost = content.cost; 
body.enrollcontact = content.enrollcontact;
body.startcontact = content.startcontact;
body.endcontact = content.endcontact;
body.bindremark = content.bindremark; 
body.confirm = content.confirm; 
body.carnumber = content.carnumber;
body.openRoute = content.openRoute;
Page(body)