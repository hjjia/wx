const app = getApp()

Page({
  data: {
    currentNumber: 0,
    prevNumber: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  numSelect: function (event) {
    console.log(event, 'event');
    const inputNumber = event.currentTarget.dataset.num;
    const { prevNumber, currentNumber } = this.data;
    const _self = this;

    if (inputNumber === '空格') {
      if ((prevNumber * 1 + 1) === currentNumber * 1) {
        this.setData({
          prevNumber: currentNumber,
          currentNumber: ''
        });
      } else {
        wx.showModal({
          title: 'Game Over',
          content: '游戏结束，您的成绩为' + prevNumber,
          confirmText: '重新开始',
          cancelColor: '结束',
          success: function (status) {
            console.log(status, 'st')
            if (status.confirm) {
              _self.setData({
                prevNumber: 0,
                currentNumber: 0
              })
            } else {
              wx.switchTab({
                url: '../index/index',
              });
              _self.setData({
                prevNumber: 0,
                currentNumber: 0
              })
              console.log('hello');
            }
          },
          fail: function () {
            
          }
        })
      }
    } else if (inputNumber === '占位符') {

    } else {
      this.setData({
        currentNumber: currentNumber * 1 === 0 ? inputNumber : currentNumber + '' + inputNumber
      });
    }

  }
})