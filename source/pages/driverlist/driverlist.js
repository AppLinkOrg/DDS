// pages/driverlist/driverlist.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { ExampleApi } from "../../apis/example.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      ctt: 1,id:this.Base.options.id
    })
    console.log(11111);
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: '司机列表',
    });
    var orderapi=new OrderApi();
    orderapi.applylist({ transport:"Y"}, (applylist) => {
      this.Base.setMyData({ applylist });
    });
    orderapi.applylist({ transport: "N" }, (tobecpdlist) => {
      this.Base.setMyData({ tobecpdlist });
    });
    orderapi.applylist({ transport: "N" }, (completedlist) => {
      this.Base.setMyData({ completedlist });
    }); 
    // var exampleapi = new ExampleApi();
    // exampleapi.updatestatus({}, (updatestatus) => {
    //   this.Base.setMyData({ updatestatus });
    // });
  }
  bindcompleted(e){
    this.Base.setMyData({ cpd: 3,  waitcpd: 3,ctt:3})
  }
  bindwaitcompleted(e) {
    this.Base.setMyData({ cpd: 2,  waitcpd: 2 ,ctt:2})
  }
  bindcontact(e) {
    this.Base.setMyData({ cpd: 1, waitcpd: 1 ,ctt:1})
  }
  bindqueren(e){
    wx.showModal({
      content: '您确认 晋A·12345 完成了任务吗？',
      icon: "none",
      duration: 2000,
      confirmColor: "#2699EC"
    });
  }
  Determineduse(e){
    console.log(e);
    var exampleapi = new ExampleApi();
    var id = e.currentTarget.id;
    exampleapi.updatestatus({id:id}, (updatestatus) => {
      this.Base.setMyData({ updatestatus });
     });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcompleted = content.bindcompleted;
body.bindwaitcompleted = content.bindwaitcompleted; 
body.bindcontact = content.bindcontact;
body.bindqueren = content.bindqueren;
body.Determineduse = content.Determineduse;
Page(body)