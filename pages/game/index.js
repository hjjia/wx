const app = getApp();
let clockTimer = null;

Page({
  data: {
    currentNumber: 0,
    prevNumber: 0,
    tempNumber: 0,
    begin: false,
    gameTime: '00:00:00',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  numSelect: function (event) {
    console.log(event, 'event');
    const inputNumber = event.currentTarget.dataset.num;
    const { prevNumber, currentNumber, tempNumber, begin } = this.data;
    const _self = this;

    if (!begin) {
      return;
    }

    if (inputNumber === '空格') {
      if ((prevNumber * 1 + 1) === currentNumber * 1) {
        this.setData({
          prevNumber: currentNumber,
          tempNumber: 0,
          // currentNumber: ''
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
            } else {
              wx.switchTab({
                url: '../index/index',
              });
              
              console.log('hello');
            }

            _self.setData({
              prevNumber: 0,
              currentNumber: 0,
              tempNumber: 0,
              begin: false
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
  overBtn: function (ebent) {
    const { begin } = this.data;

    if (begin) {
      this.setData({
        begin: false
      });

      clearInterval(clockTimer);
    }
  }
})