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

    if (inputNumber === '空格') {
      if ((prevNumber * 1 + 1) === currentNumber * 1) {
        this.setData({
          prevNumber: currentNumber,
          currentNumber: ''
        });
      } else {
        alert('game over');
        return;
      }
    } else if (inputNumber === '占位符') {

    } else {
      this.setData({
        currentNumber: currentNumber * 1 === 0 ? inputNumber : currentNumber + '' + inputNumber
      });
    }
    
  }
})