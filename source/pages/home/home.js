// pages/content/content.js
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
    this.Base.setMyData({
      allshow:1
    });
     var statelist=["所有发布","报名中","运输中","未开始"];
     this.Base.setMyData({
       statelist
     });
    this.Base.setMyData({state:0})
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    orderapi.list({ }, (list) => {
      this.Base.setMyData({ list });
    });
    var UserInfo=this.Base.getMyData().UserInfo;
    orderapi.list({ member_id_name:UserInfo.nickName}, (minelist) => {
      this.Base.setMyData({ minelist });
    });
  }
  bindall(e){
    console.log(e);
    this.Base.setMyData({ allshow: 1, mineshow: 1 });
  }
  bindmine(e) {
    console.log(e);
    this.Base.setMyData({ allshow: 2, mineshow: 2 });
  }
 
  bindpickerstate(e){
    // var list = this.Base.getMyData().list;
    // this.Base.setMyData({
    //   state_idx: e.detail.value,
    //   state_id: list[e.detail.value].id
    // });
    this.Base.setMyData({
      state: e.detail.value
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindall = content.bindall;
body.bindmine = content.bindmine; 
body.bindpickerstate = content.bindpickerstate; 
Page(body)