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
      allshow: 1, state_id:0
    });
    
    var orderapi=new OrderApi();
    orderapi.orderstatus({orderby:"r_main.id desc"},(statuslist)=>{
      statuslist.push({ id: "", odrstatusname: "所有发布" });
    this.Base.setMyData({
      statuslist
      })
    })
    orderapi.list({ orderby:"r_main.created_date"}, (list) => {
      this.Base.setMyData({ list });
    });
    
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.list({ member_id_name: UserInfo.nickName, orderby: "r_main.created_date" }, (minelist) => {
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
    console.log(e);
    var statuslist = this.Base.getMyData().statuslist;
     this.Base.setMyData({
       state_idx: e.detail.value,
       state_id: statuslist[e.detail.value].id,
       state_name: statuslist[e.detail.value].odrstatusname
     });
    var state_id = this.Base.getMyData().state_id;
    var orderapi = new OrderApi();
    orderapi.list({ taskstatus: state_id, orderby: "r_main.created_date" }, (list) => {
      this.Base.setMyData({ list });
    });
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.list({ member_id_name: UserInfo.nickName, taskstatus: state_id, orderby: "r_main.created_date"  }, (minelist) => {
      this.Base.setMyData({ minelist });
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