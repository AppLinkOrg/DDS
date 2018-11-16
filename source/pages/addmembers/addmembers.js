// pages/addmembers/addmembers.js
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
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: "添加成员",
    })
    
  }
  confirm(e){
    var data = e.detail.value;
    if (data.addname=='') {
      this.Base.info("请输入成员姓名");
      return;
    }
    if (data.addmobile == '') {
      this.Base.info("请输入成员联系电话");
      return;
    }
    var name=this.Base.getMyData().name;
    var mobile = this.Base.getMyData().mobile;
    var that=this;
    var orderapi = new OrderApi();
    orderapi.addmembers({
      status:"A",
      name:name,
      member_phone:mobile
    }, (addmembers) => {
      var pages = getCurrentPages(); 
      var beforePage = pages[pages.length - 2];
      wx.navigateBack({
        success(){
          beforePage.onLoad();
        }
      })
    });
  }
  bindaddname(e){
    var name = e.detail.value;
    console.log(name);
    this.Base.setMyData({
      name: e.detail.value
    })
  }
  bindaddmobile(e) {
    var mobile = e.detail.value;
    console.log(mobile);
    this.Base.setMyData({
      mobile: e.detail.value
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindaddname = content.bindaddname;
body.bindaddmobile = content.bindaddmobile;
body.confirm = content.confirm;
Page(body)