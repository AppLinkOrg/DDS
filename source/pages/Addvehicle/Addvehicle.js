// pages/driver/driver.js
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
  uploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("vehicle", (ret) => {
      that.Base.setMyData({
        photo: ret
      });
    }, 1);
  }
  photo(e) {
    var photo = e.detail.value;
    console.log(photo);
    this.Base.setMyData({
      photo: e.detail.value
    })
  }

  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '添加车辆',

    });
  }
  onMyShow() {
    var that = this;
  }
  carnumber(e){
    var carnumber = e.detail.value;
  
    this.Base.setMyData({
      carnumber: e.detail.value
    })
  }
  load(e) {
    var load = e.detail.value;
    console.log(load);
    this.Base.setMyData({
      load: e.detail.value
    })
  }
  vehicletype(e) {
    var vehicletype = e.detail.value;
    console.log(vehicletype);
    this.Base.setMyData({
      vehicletype: e.detail.value
    })
  }
  confirm(e){
    console.log(6666666);
    var data=e.detail.value;
    if (data.carnumber == "") {
        this.Base.info("请输入车牌号码");
        return;
      }
    if (data.vehicletype == "") {
      this.Base.info("请输入车牌类型");
      return;
    }
    if (data.load == "") {
      this.Base.info("请输入车辆载重");
      return;
    }
    var carnumber = this.Base.getMyData().carnumber;
    var vehicletype = this.Base.getMyData().vehicletype;
    var load = this.Base.getMyData().load;
    var that =this;
    var photo = this.Base.getMyData().photo;
    var orderapi=new OrderApi();
    orderapi.addvehicle({
      status:"I",
      carnumber: carnumber,
      vehicletype: vehicletype,
      load: load,
      reviewimg: photo
    }, (addvehicle) => {
      
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.carnumber = content.carnumber;
body.load = content.load;
body.vehicletype = content.vehicletype;
body.confirm=content.confirm;
body.photo = content.photo;
body.uploadimg = content.uploadimg;
Page(body)