const app = getApp();
let clockTimer = null;

Page({
  data: {
    currentNumber: 0, // 当前输入的数字
    prevNumber: 0, // 前一个输入的数字
    tempNumber: 0, // 用来帮助显示当前输入数字
    begin: false,  // 游戏开始
    gameTime: '00:00:00', // 游戏计时
    maxGrade: 0, // 最高分
    showOperation: false,
    showModal: false,
    modal: {title: '提示', content: ['hahhha', 'hhhhhhhh']},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  container: function (event) {
    const { showOperation } = this.data;
    this.setData({
      showOperation: false
    })
  },
  numSelect: function (event) { // 点击键盘时
    console.log(event, 'event');
    const inputNumber = event.currentTarget.dataset.num;
    const { prevNumber, currentNumber, tempNumber, begin } = this.data;
    const _self = this;

    if (!begin) {
      return;
    }

    if (inputNumber === '空格') { // 点击空格结束当前的数字输入，判断是否结束
      if ((prevNumber * 1 + 1) === currentNumber * 1) {  // 如果上一个数字 + 1 = 当前输入，继续
        this.setData({
          prevNumber: currentNumber,
          tempNumber: 0,
          // currentNumber: ''
        });
      } else { // 不等于，游戏结束
        wx.showModal({
          title: 'Game Over',
          content: '游戏结束，您的成绩为' + prevNumber,
          confirmText: '重新开始',
          cancelColor: '结束',
          success: function (status) {
            // 清除计时器
            clearInterval(clockTimer);

            // 设置最高分
            const maxGrade = setMaxGrade(prevNumber);
            if (status.confirm) {
            } else {
              wx.switchTab({
                url: '../index/index',
              });
              
              console.log('hello');
            }

            // 重置信息
            _self.setData({
              prevNumber: 0,
              currentNumber: 0,
              tempNumber: 0,
              begin: false,
              maxGrade: maxGrade
            })
          },
          fail: function () {
            
          }
        })
      }
    } else if (inputNumber === '占位符') {

    } else {
      this.setData({
        currentNumber: tempNumber * 1 === 0 ? inputNumber : tempNumber + '' + inputNumber,
        tempNumber: tempNumber * 1 === 0 ? inputNumber : tempNumber + '' + inputNumber
      });
    }

  },
  beginBtn: function (event) {
    const { begin, gameTime } = this.data;

    if (!begin) {
      this.setData({
        begin: true,
        prevNumber: 0,
        currentNumber: 0,
        tempNumber: 0,
        gameTime: '00:00:00'
      });

      let gameTimeSeconds = 0;
      clockTimer = setInterval(() => {
        gameTimeSeconds ++;
        let h = Math.floor(gameTimeSeconds / (60 * 60));
        let m = Math.floor((gameTimeSeconds % (60 * 60)) / 60);
        let s = (gameTimeSeconds % (60 * 60)) % 60;

        // console.log(gameTimeSeconds, 'gam')

        h = h > 9 ? h : 0 + '' + h;
        m = m > 9 ? m : 0 + '' + m;
        s = s > 9 ? s : 0 + '' + s;

        this.setData({
          gameTime: h + ':' + m + ':' + s
        });
      }, 1000)
    }
  },
  overBtn: function (event) {
    const { begin, prevNumber } = this.data;

    if (begin) {
      const maxGrade = setMaxGrade(prevNumber);
      this.setData({
        begin: false,
        maxGrade: maxGrade
      });

      clearInterval(clockTimer);
    }
  },
  settingBtn: function (event) {
    event.st
    const { showOperation } = this.data;
    this.setData({
      showOperation: !showOperation
    })
  },
  operation: function (event) {
    const { showModal } = this.data;
    const title = showModal ? '提示' : '操作说明';
    const content = showModal ? [] : [
      '1. 只能从1开始',
      '2. 按空格键结束当前数字输入'
    ]
    this.setData({
      showModal: !showModal,
      modal: {title, content}
    })
  },
  modalBg: function (event) {
    const { showModal } = this.data;
    this.setData({
      showModal: !showModal
    })
  }
})

// 设置最高分
function setMaxGrade(newGrade) {
  const maxGrade = wx.getStorageSync('maxGrade');
  
  console.log(maxGrade, 'maxGrade');
  if (!maxGrade || newGrade * 1 > maxGrade * 1) {
    wx.setStorageSync('maxGrade', newGrade);
    return newGrade;
  }

  return maxGrade;
}