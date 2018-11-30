import { ApiConfig } from 'apiconfig';
export class ApplyApi {
  //更新司机认证
  uploaddan(json, callback, showLoading = true) {
    if (showLoading)
      ApiConfig.ShowLoading();
    var header = ApiConfig.GetHeader();
    console.log(header);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'apply/uploaddan',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
        if (callback != null) {
          callback(res.data);
        }
      },
      fail: function (res) {
        console.log(res);
        callback(false);
      },
      complete: function (res) {
        console.log(res);

        if (showLoading)
          ApiConfig.CloseLoading();
      }
    })
  }
}