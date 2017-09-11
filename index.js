const app = getApp()

Page({
  data: {
    currentNumber: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  numSelect: function (event) {
    console.log(event, 'event');
    const currentNumber = event.currentTarget.dataset.num;
    this.setData({
      currentNumber:currentNumber
    })
  }
})