require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"HelloWorld":[function(require,module,exports){
"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script\HelloWorld.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.label.string = this.text;
    },

    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();
},{}],"back":[function(require,module,exports){
"use strict";
cc._RF.push(module, '65bcblzPkhDxZsVgsJEL8T3', 'back');
// Script\back.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        wenziPrefab: {
            default: null,
            type: cc.Prefab
        },
        back: {
            type: cc.Node,
            default: null
        },
        human: {
            type: cc.Node,
            default: null
        },
        panum: {
            type: cc.Label,
            default: null
        },
        lineX: 10
    },

    // use this for initialization
    onLoad: function onLoad() {
        //启动碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;

        //启动定时，产生各种轨迹的蚊子
        this.schedule(this.spawn, 5);

        cc.game.temp = 0;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    spawn: function spawn() {

        //根据分数判断是否 发射 2连啪 3连啪 4连啪
        //TODO 
        if (cc.game.panum && cc.game.panum != 0) {
            if (cc.game.panum % 6 == 0) {//发射 2连啪

            } else if (cc.game.panum % 12 == 0) {//发射 3连啪

            } else if (cc.game.panum % 24 == 0) {//发射 4连啪

            }
        }

        var wenzi = cc.instantiate(this.wenziPrefab);

        var wenziCom = wenzi.getComponent("wenzi");
        wenziCom.human = this.human;
        wenziCom.back = this.back;
        wenziCom.panum = this.panum;

        //TODO 随机产生轨迹
        // var track = (cc.game.temp++)%4;
        var track = 0;

        //TODO 蚊子的初始化y坐标，根据轨迹产生不同的y
        var newBossPosY = 0;

        wenzi.setPosition(cc.p(this.node.width / 2 + wenzi.height / 2 + 100, newBossPosY));
        wenziCom.setTrack(track);
        this.node.addChild(wenzi);
    }

});

cc._RF.pop();
},{}],"hand":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'a1ab0uwu09MnaSnTyajCa3B', 'hand');
// Script\hand.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        hand1: {
            type: cc.Node,
            default: null
        },
        hand2: {
            type: cc.Node,
            default: null
        },
        backNode: {
            type: cc.Node,
            default: null
        },
        pafix: 6,
        leftPadding: 220,
        rightPadding: 20
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.zIndex = 10;
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    papapa: function papapa() {
        var hand1Y = this.hand1.y;
        var hand2Y = this.hand2.y;
        var dis = Math.abs(hand1Y - hand2Y);
        this.hand1.y -= dis / 2 - this.pafix;
        this.hand2.y += dis / 2 - this.pafix;
        //播放pa音效
        // cc.audioEngine.playEffect(this.buttonControlCom.gaint);

        this.scheduleOnce(function () {
            cc.game.papapa = false;
            this.hand1.y += dis / 2 - this.pafix;
            this.hand2.y -= dis / 2 - this.pafix;
        }, 0.3);
    },

    touchStart: function touchStart(event) {},
    touchMove: function touchMove(event) {
        //计算左右边界
        var leftLimit = -this.backNode.width / 2 + this.node.width / 2 + this.leftPadding;
        var rightLimit = this.backNode.width / 2 - this.node.width / 2 - this.rightPadding;

        var prevPoint = event.getPreviousLocation();

        var point = event.getLocation();

        var disX = point.x - prevPoint.x;

        var willX = this.node.x + disX;
        if (willX <= leftLimit) {
            willX = leftLimit;
        } else if (willX >= rightLimit) {
            willX = rightLimit;
        }

        this.node.x = willX;
    }
});

cc._RF.pop();
},{}],"leftButton":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'f192aqKyP5DybbgH+uXjuTL', 'leftButton');
// Script\leftButton.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        hand: {
            type: cc.Node,
            default: null
        },
        back: {
            type: cc.Node,
            default: null
        },
        toppadding: 30,
        downPadding: 40
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.game.handMoveBy = 60;
        cc.game.downMoveBy = 2;

        // 使用枚举类型来注册
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //播放hand上移动画
            var ani = this.hand.getComponent(cc.Animation);

            var moveByLimit = this.back.height / 2 - this.toppadding - this.hand.height / 2;
            if (this.hand.y < moveByLimit) {
                var moveByDis = this.hand.y + cc.game.handMoveBy >= moveByLimit ? moveByLimit - this.hand.y : cc.game.handMoveBy;
                var actionby = cc.moveBy(0.2, 0, moveByDis);
                // var seq = cc.sequence(cc.moveBy(0.5, 200, 0), cc.moveBy(0.5, -200, 0));
                this.hand.runAction(actionby);
            }
            ani.play("handani");
        }, this);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        var downLimit = -this.back.height / 2 + this.hand.height / 2 + this.downPadding;
        var downDis = this.hand.y - cc.game.downMoveBy <= downLimit ? 0 : cc.game.downMoveBy;
        this.hand.y -= downDis;
    }

});

cc._RF.pop();
},{}],"rightButton":[function(require,module,exports){
"use strict";
cc._RF.push(module, '90976MePspIFrE6qYkeDQzk', 'rightButton');
// Script\rightButton.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        hand: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 使用枚举类型来注册
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.game.papapa = true;
            this.hand.getComponent("hand").papapa();
        }, this);
    }

});

cc._RF.pop();
},{}],"rolearm":[function(require,module,exports){
"use strict";
cc._RF.push(module, '16768WVERhBl4pyAbUr27qi', 'rolearm');
// Script\rolearm.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        mouth: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.schedule(function () {
            this.playNormal();
        }, 3);
    },

    // called every frame
    update: function update(dt) {},

    playNormal: function playNormal() {
        var leftRoleAni = this.node.getComponent(cc.Animation);

        var mouthAni = this.mouth.getComponent(cc.Animation);
        mouthAni.play("mouthnormal");
        leftRoleAni.play("normal");
    }
});

cc._RF.pop();
},{}],"wenzi":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'e7b9dSoUmtN9KnNyOoYrPSP', 'wenzi');
// Script\wenzi.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        track: 0,
        back: {
            type: cc.Node,
            default: null
        },
        human: {
            type: cc.Node,
            default: null
        },
        leftPadding: 60,
        limit: false,
        ypos: 0,
        zhexianFlag: 1,
        zhexianLimit: 60,

        hand1: {
            type: cc.Node,
            default: null
        },

        hand2: {
            type: cc.Node,
            default: null
        },

        hand: {
            type: cc.Node,
            default: null
        },

        panum: {
            type: cc.Label,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.noAction = true;
        this.ypos = this.node.y;

        //获取hand1和hand2
        this.hand1 = cc.find("Canvas/back/hand/hand1");

        this.hand2 = cc.find("Canvas/back/hand/hand2");

        this.hand = cc.find("Canvas/back/hand");
    },

    setTrack: function setTrack(track) {
        this.track = track;
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        //
        switch (this.track) {
            case 0:
                //直线
                this.line(dt);
                break;
            case 1:
                //sin
                this.sin(dt);
                break;
            case 2:
                this.changeVelocityLine(dt);
                break;
            case 3:
                //折线
                this.zhexian(dt);
                break;

        }

        if (this.limit && this.noAction) {
            this.noAction = false;
            this.fightHuman();
        }
    },
    //各种轨迹的函数
    //直线
    line: function line(dt) {
        if (!this.limit) {
            this.node.x -= 7;
            if (this.node.x < -this.back.width / 2 + this.node.width / 2 + this.human.width / 2 + this.leftPadding) {
                this.limit = true;
            }
        }
    },
    sin: function sin(dt) {
        if (!this.limit) {
            var willX = this.node.x - 5;
            var willY = Math.sin(willX / 60) * 70;
            this.node.x = willX;
            this.node.y = willY;
            if (this.node.x < -this.back.width / 2 + this.node.width / 2 + this.human.width / 2 + this.leftPadding) {
                this.limit = true;
            }
        }
    },
    //改变速度轨迹（直线）
    changeVelocityLine: function changeVelocityLine(dt) {
        if (!this.limit) {
            if (cc.game.changeVelocityLineFlag) {
                //已经在加速,记录时间
                if (!cc.game.changeVelocityLineTime) {
                    cc.game.changeVelocityLineTime = 0;
                }
                if (cc.game.changeVelocityLineTime < 0.4) {
                    this.node.x -= 14;
                    cc.game.changeVelocityLineTime += dt;
                } else {
                    cc.game.changeVelocityLineTime = 0;
                    cc.game.changeVelocityLineFlag = false;
                }
            } else {
                //没有加速，计算随机数，判断是否要加速
                var randomC = Math.random();
                if (randomC < 0.04) {
                    //加速1s
                    cc.game.changeVelocityLineFlag = true;
                } else {
                    //不加速，正常飞行
                    this.node.x -= 7;
                }
            }

            if (this.node.x < -this.back.width / 2 + this.node.width / 2 + this.human.width / 2 + this.leftPadding) {
                this.limit = true;
            }
        }
    },

    //折线
    zhexian: function zhexian(dt) {
        if (!this.limit) {
            var willX = this.node.x - 6;
            var willY = this.node.y + 3 * this.zhexianFlag;
            if (Math.abs(willY - this.ypos) > this.zhexianLimit) {
                var willY = this.ypos + this.zhexianLimit * this.zhexianFlag;
                this.zhexianFlag = -this.zhexianFlag;
            }
            this.node.x = willX;
            this.node.y = willY;

            if (this.node.x < -this.back.width / 2 + this.node.width / 2 + this.human.width / 2 + this.leftPadding) {
                this.limit = true;
            }
        }
    },

    //超过左侧界限，朝人物飞翔
    fightHuman: function fightHuman() {
        var humanX = this.human.x;
        var humanY = this.human.y;
        var fightAction = cc.moveTo(1, humanX, humanY);
        var actionWithCall = cc.sequence(fightAction, cc.callFunc(this.actionFinish, this, null));
        //计算角度
        var disX = Math.abs(humanX - this.node.x);
        var disY = Math.abs(humanY - this.node.y);
        var rotation = Math.atan(disY / disX) * (180 / Math.PI);
        if (this.node.y > humanY) {
            //在上，反转
            this.node.rotation = -rotation;
        } else if (this.node.y < humanY) {
            //在下，正转
            this.node.rotation = rotation;
        }

        this.node.runAction(actionWithCall);
    },

    /**
     * 蚊子被拍死,计分
     */
    actionFinish: function actionFinish() {
        //将拍死的蚊子移除
        this.node.removeFromParent();
        //计分
        var preNum = this.panum.string;
        if (preNum) {
            this.panum.string = parseInt(preNum) + 1;
        } else {
            this.panum.string = 1;
        }
        cc.game.panum = parseInt(this.panum.string);
    },

    //碰撞回调
    onCollisionEnter: function onCollisionEnter(other, self) {
        var handX = this.hand.x;
        var handy = this.hand.y;

        //判断ohter(hand)的坐标，是否被咬
        //只需判断蚊子是在手下边，中间，上边 即可区分
        var wenzi = self.node;
        var wenziX = wenzi.x;
        var wenziY = wenzi.y;

        var collisionHand = other.node;
        var collisionHandX = collisionHand.x;
        var collisionHandY = collisionHand.y;

        var hand1X = this.hand1.x + handX;
        var hand1Y = this.hand1.y + handy;

        var hand2X = this.hand2.x + handX;
        var hand2Y = this.hand2.y + handy;

        var wenziLeftX = wenziX - self.node.width / 2;
        var handRightX = hand1X + this.hand1.width / 2;

        if (Math.abs(handRightX - wenziLeftX) <= 10) {
            //在手右侧,咬到手边缘
            this.bite();
        } else if (wenziY < hand2Y) {
            //在手下
            //手变大，变沉
            this.bite();
        } else if (hand2Y < wenziY < hand1Y) {
            //手中
            // this.actionFinish();
            //判断是否拍手?
            if (cc.game.papapa) {
                this.actionFinish();
            }
        } else {
            //在手上
            //手变大，变沉
            this.bite();
        }
    },

    bite: function bite(dt) {
        var willScaleY1 = this.hand1.scaleY * 1.6;
        var willScaleY2 = this.hand1.scaleY * 1.6;
        willScaleY1 = willScaleY1 >= 3 ? 3 : willScaleY1;
        willScaleY2 = willScaleY2 >= 3 ? 3 : willScaleY2;
        this.hand1.scaleY = willScaleY1;
        this.hand2.scaleY = willScaleY2;

        var willWeight = cc.game.downMoveBy * 1.5;
        willWeight = willWeight > 6 ? 6 : willWeight;
        cc.game.downMoveBy = willWeight;
    }
});

cc._RF.pop();
},{}]},{},["HelloWorld","back","hand","leftButton","rightButton","rolearm","wenzi"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvSGVsbG9Xb3JsZC5qcyIsImFzc2V0cy9TY3JpcHQvYmFjay5qcyIsImFzc2V0cy9TY3JpcHQvaGFuZC5qcyIsImFzc2V0cy9TY3JpcHQvbGVmdEJ1dHRvbi5qcyIsImFzc2V0cy9TY3JpcHQvcmlnaHRCdXR0b24uanMiLCJhc3NldHMvU2NyaXB0L3JvbGVhcm0uanMiLCJhc3NldHMvU2NyaXB0L3dlbnppLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRkc7QUFJUDtBQUNBO0FBTlE7O0FBU1o7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQWxCSzs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7O0FBRUk7QUFDSTtBQUNBO0FBRlU7QUFJZDtBQUNJO0FBQ0E7QUFGRztBQUlQO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQWxCUTs7QUFxQlo7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7O0FBRUE7QUFDSDs7QUFFRDtBQUNBOztBQUVBOztBQUVBOztBQUVJO0FBQ0E7QUFDQTtBQUNJOztBQUVDOztBQUVBOztBQUVBO0FBQ0o7O0FBSUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBR0g7O0FBOUVJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRkU7QUFJTjtBQUNJO0FBQ0E7QUFGRTtBQUlOO0FBQ0k7QUFDQTtBQUZLO0FBSVQ7QUFDQTtBQUNBO0FBekJROztBQTRCWjtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBRUg7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDSjs7QUFFRDtBQUVBO0FBQ0k7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDs7QUFFRDtBQUNIO0FBakZJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRkM7QUFJTDtBQUNJO0FBQ0E7QUFGQztBQUlMO0FBQ0E7QUFwQlE7O0FBdUJaO0FBQ0E7QUFDSTtBQUNBOztBQUVDO0FBQ0Q7QUFDSTtBQUNBOztBQUVBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDs7QUFwREk7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGQztBQVhHOztBQWlCWjtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNKOztBQTNCSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFGRTtBQURFOztBQU9aO0FBQ0E7QUFDSTtBQUNJO0FBQ0g7QUFDSjs7QUFFRDtBQUNBOztBQUlBO0FBQ0k7O0FBRUE7QUFDQTtBQUNBO0FBQ0g7QUE1Qkk7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBOztBQUVJO0FBQ0E7QUFDSTtBQUNBO0FBRkc7QUFJUDtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSTtBQUNBO0FBRkU7O0FBS047QUFDSTtBQUNBO0FBRkU7O0FBS047QUFDSTtBQUNBO0FBRkc7O0FBS1A7QUFDSTtBQUNBO0FBRkk7QUFoQ0E7O0FBc0NaO0FBQ0E7QUFDSTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQU87QUFDSDtBQUNBO0FBQ0o7QUFBTztBQUNIO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFDSjtBQUFPO0FBQ0g7QUFDQTs7QUFaUjs7QUFnQkE7QUFDSTtBQUNBO0FBQ0g7QUFFSjtBQUNEO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDSjtBQUVKO0FBQ0Q7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBRUo7QUFFSjtBQUNEO0FBQ0E7QUFDSTtBQUNJO0FBQW1DO0FBQy9CO0FBQ1E7QUFDSDtBQUNMO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNIO0FBRUo7QUFBSztBQUNGO0FBQ0E7QUFBbUI7QUFDZjtBQUNIO0FBQUs7QUFDRjtBQUNIO0FBQ0o7O0FBRUQ7QUFDSTtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRDtBQUNBOztBQUVBO0FBQ0k7QUFDSDtBQUNKO0FBRUo7O0FBSUQ7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUF5QjtBQUNyQjtBQUNIO0FBQThCO0FBQzNCO0FBQ0g7O0FBR0Q7QUFFSDs7QUFFRDs7O0FBR0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDRDtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQTRDO0FBQ3hDO0FBQ0g7QUFBeUI7QUFDdEI7QUFDQTtBQUNIO0FBQWtDO0FBQy9CO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDSjtBQUFLO0FBQ0Y7QUFDQTtBQUNIO0FBRUo7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0g7QUF2UEkiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBkZWZhdWx0cywgc2V0IHZpc3VhbGx5IHdoZW4gYXR0YWNoaW5nIHRoaXMgc2NyaXB0IHRvIHRoZSBDYW52YXNcclxuICAgICAgICB0ZXh0OiAnSGVsbG8sIFdvcmxkISdcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IHRoaXMudGV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgXHJcbiAgICAgICAgd2VuemlQcmVmYWIgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQgOiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlIDogY2MuUHJlZmFiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFjayA6IHtcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGh1bWFuIDoge1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFudW0gOiB7XHJcbiAgICAgICAgICAgIHR5cGUgOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGVmYXVsdCA6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmVYOjEwXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/lkK/liqjnorDmkp7mo4DmtYtcclxuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAvL+WQr+WKqOWumuaXtu+8jOS6p+eUn+WQhOenjei9qOi/ueeahOiaiuWtkFxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3biw1KTtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS50ZW1wID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICBzcGF3bjpmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAvL+agueaNruWIhuaVsOWIpOaWreaYr+WQpiDlj5HlsIQgMui/nuWVqiAz6L+e5ZWqIDTov57llapcclxuICAgICAgICAvL1RPRE8gXHJcbiAgICAgICAgaWYoY2MuZ2FtZS5wYW51bSAmJiBjYy5nYW1lLnBhbnVtICE9IDApe1xyXG4gICAgICAgICAgICBpZihjYy5nYW1lLnBhbnVtICUgNiA9PSAwKXsvL+WPkeWwhCAy6L+e5ZWqXHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZihjYy5nYW1lLnBhbnVtICUgMTIgPT0gMCl7Ly/lj5HlsIQgM+i/nuWVqlxyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYoY2MuZ2FtZS5wYW51bSAlIDI0ID09IDApey8v5Y+R5bCEIDTov57llapcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG5cclxuICAgICAgICB2YXIgd2VuemkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLndlbnppUHJlZmFiKTtcclxuXHJcbiAgICAgICAgdmFyIHdlbnppQ29tID0gd2VuemkuZ2V0Q29tcG9uZW50KFwid2VuemlcIik7XHJcbiAgICAgICAgd2VuemlDb20uaHVtYW4gPSB0aGlzLmh1bWFuO1xyXG4gICAgICAgIHdlbnppQ29tLmJhY2sgPSB0aGlzLmJhY2s7XHJcbiAgICAgICAgd2VuemlDb20ucGFudW0gPSB0aGlzLnBhbnVtO1xyXG5cclxuICAgICAgICAvL1RPRE8g6ZqP5py65Lqn55Sf6L2o6L+5XHJcbiAgICAgICAgLy8gdmFyIHRyYWNrID0gKGNjLmdhbWUudGVtcCsrKSU0O1xyXG4gICAgICAgIHZhciB0cmFjayA9IDA7XHJcblxyXG4gICAgICAgIC8vVE9ETyDomorlrZDnmoTliJ3lp4vljJZ55Z2Q5qCH77yM5qC55o2u6L2o6L+55Lqn55Sf5LiN5ZCM55qEeVxyXG4gICAgICAgIHZhciBuZXdCb3NzUG9zWSA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgd2Vuemkuc2V0UG9zaXRpb24oY2MucCh0aGlzLm5vZGUud2lkdGgvMiArIHdlbnppLmhlaWdodC8yICsgMTAwICwgbmV3Qm9zc1Bvc1kpKTtcclxuICAgICAgICB3ZW56aUNvbS5zZXRUcmFjayh0cmFjayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHdlbnppKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgICAgIGhhbmQxOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhbmQyOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhY2tOb2RlOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhZml4OjYsXHJcbiAgICAgICAgbGVmdFBhZGRpbmc6MjIwLFxyXG4gICAgICAgIHJpZ2h0UGFkZGluZzoyMFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQgLCB0aGlzLnRvdWNoU3RhcnQgLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSAsIHRoaXMudG91Y2hNb3ZlICwgdGhpcyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIHBhcGFwYTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBoYW5kMVkgPSB0aGlzLmhhbmQxLnk7XHJcbiAgICAgICAgdmFyIGhhbmQyWSA9IHRoaXMuaGFuZDIueTtcclxuICAgICAgICB2YXIgZGlzID0gTWF0aC5hYnMoaGFuZDFZIC0gaGFuZDJZKTtcclxuICAgICAgICB0aGlzLmhhbmQxLnkgLT0gKGRpcy8yIC0gdGhpcy5wYWZpeCk7XHJcbiAgICAgICAgdGhpcy5oYW5kMi55ICs9IChkaXMvMiAtdGhpcy5wYWZpeCk7XHJcbiAgICAgICAgLy/mkq3mlL5wYemfs+aViFxyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5idXR0b25Db250cm9sQ29tLmdhaW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2MuZ2FtZS5wYXBhcGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kMS55ICs9IChkaXMvMiAtIHRoaXMucGFmaXgpO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmQyLnkgLT0gKGRpcy8yIC10aGlzLnBhZml4KTtcclxuICAgICAgICB9LDAuMyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvdWNoU3RhcnQgOiBmdW5jdGlvbihldmVudCl7XHJcbiAgICB9LFxyXG4gICAgdG91Y2hNb3ZlOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAvL+iuoeeul+W3puWPs+i+ueeVjFxyXG4gICAgICAgIHZhciBsZWZ0TGltaXQgPSAtdGhpcy5iYWNrTm9kZS53aWR0aC8yICsgdGhpcy5ub2RlLndpZHRoLzIgKyB0aGlzLmxlZnRQYWRkaW5nO1xyXG4gICAgICAgIHZhciByaWdodExpbWl0ID0gdGhpcy5iYWNrTm9kZS53aWR0aC8yIC0gdGhpcy5ub2RlLndpZHRoLzIgLSB0aGlzLnJpZ2h0UGFkZGluZztcclxuXHJcbiAgICAgICAgbGV0IHByZXZQb2ludCA9IGV2ZW50LmdldFByZXZpb3VzTG9jYXRpb24oKTtcclxuXHJcbiAgICAgICAgbGV0IHBvaW50ID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuXHJcbiAgICAgICAgbGV0IGRpc1ggPSBwb2ludC54IC0gcHJldlBvaW50Lng7XHJcblxyXG4gICAgICAgIHZhciB3aWxsWCA9IHRoaXMubm9kZS54ICsgZGlzWDtcclxuICAgICAgICBpZih3aWxsWCA8PSBsZWZ0TGltaXQpe1xyXG4gICAgICAgICAgICB3aWxsWCA9IGxlZnRMaW1pdDtcclxuICAgICAgICB9ZWxzZSBpZih3aWxsWCA+PSByaWdodExpbWl0KXtcclxuICAgICAgICAgICAgd2lsbFggPSByaWdodExpbWl0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnggPSB3aWxsWDtcclxuICAgIH1cclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcclxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyAuLi5cclxuICAgICAgICBoYW5kOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhY2s6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9wcGFkZGluZzozMCxcclxuICAgICAgICBkb3duUGFkZGluZzo0MFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmdhbWUuaGFuZE1vdmVCeSA9IDYwO1xyXG4gICAgICAgIGNjLmdhbWUuZG93bk1vdmVCeSA9IDI7XHJcblxyXG4gICAgICAgICAvLyDkvb/nlKjmnprkuL7nsbvlnovmnaXms6jlhoxcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAvL+aSreaUvmhhbmTkuIrnp7vliqjnlLtcclxuICAgICAgICAgICAgdmFyIGFuaSA9IHRoaXMuaGFuZC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb3ZlQnlMaW1pdCA9IHRoaXMuYmFjay5oZWlnaHQvMiAtIHRoaXMudG9wcGFkZGluZyAtIHRoaXMuaGFuZC5oZWlnaHQvMjtcclxuICAgICAgICAgICAgaWYodGhpcy5oYW5kLnkgPCBtb3ZlQnlMaW1pdCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZUJ5RGlzID0gKHRoaXMuaGFuZC55ICsgY2MuZ2FtZS5oYW5kTW92ZUJ5ID49IG1vdmVCeUxpbWl0KSA/IChtb3ZlQnlMaW1pdCAtIHRoaXMuaGFuZC55KSA6IGNjLmdhbWUuaGFuZE1vdmVCeTtcclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25ieSA9IGNjLm1vdmVCeSgwLjIsMCxtb3ZlQnlEaXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjUsIDIwMCwgMCksIGNjLm1vdmVCeSgwLjUsIC0yMDAsIDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZC5ydW5BY3Rpb24oYWN0aW9uYnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFuaS5wbGF5KFwiaGFuZGFuaVwiKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgdmFyIGRvd25MaW1pdCA9IC10aGlzLmJhY2suaGVpZ2h0LzIgKyB0aGlzLmhhbmQuaGVpZ2h0LzIgKyB0aGlzLmRvd25QYWRkaW5nO1xyXG4gICAgICAgIHZhciBkb3duRGlzID0gKHRoaXMuaGFuZC55IC0gY2MuZ2FtZS5kb3duTW92ZUJ5IDw9IGRvd25MaW1pdCkgPyAwIDogY2MuZ2FtZS5kb3duTW92ZUJ5O1xyXG4gICAgICAgIHRoaXMuaGFuZC55IC09IGRvd25EaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgICAgIGhhbmQ6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDkvb/nlKjmnprkuL7nsbvlnovmnaXms6jlhoxcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBjYy5nYW1lLnBhcGFwYSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZC5nZXRDb21wb25lbnQoXCJoYW5kXCIpLnBhcGFwYSgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtb3V0aDp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheU5vcm1hbCgpO1xyXG4gICAgICAgIH0sIDMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5Tm9ybWFsIDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbGVmdFJvbGVBbmkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgIHZhciBtb3V0aEFuaSA9IHRoaXMubW91dGguZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgbW91dGhBbmkucGxheShcIm1vdXRobm9ybWFsXCIpO1xyXG4gICAgICAgIGxlZnRSb2xlQW5pLnBsYXkoXCJub3JtYWxcIik7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgXHJcbiAgICAgICAgdHJhY2sgOiAwLFxyXG4gICAgICAgIGJhY2sgOiB7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBodW1hbiA6IHtcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZnRQYWRkaW5nIDogNjAsXHJcbiAgICAgICAgbGltaXQgOiBmYWxzZSxcclxuICAgICAgICB5cG9zOjAsXHJcbiAgICAgICAgemhleGlhbkZsYWc6MSxcclxuICAgICAgICB6aGV4aWFuTGltaXQgOiA2MCxcclxuXHJcbiAgICAgICAgaGFuZDE6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmQyOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kIDoge1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBhbnVtIDoge1xyXG4gICAgICAgICAgICB0eXBlIDogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRlZmF1bHQgOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9BY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMueXBvcyA9IHRoaXMubm9kZS55O1xyXG5cclxuICAgICAgICAvL+iOt+WPlmhhbmQx5ZKMaGFuZDJcclxuICAgICAgICB0aGlzLmhhbmQxID0gY2MuZmluZChcIkNhbnZhcy9iYWNrL2hhbmQvaGFuZDFcIik7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZDIgPSBjYy5maW5kKFwiQ2FudmFzL2JhY2svaGFuZC9oYW5kMlwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kID0gY2MuZmluZChcIkNhbnZhcy9iYWNrL2hhbmRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRyYWNrIDogZnVuY3Rpb24odHJhY2spe1xyXG4gICAgICAgIHRoaXMudHJhY2sgPSB0cmFjaztcclxuICAgIH0sXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnRyYWNrKXtcclxuICAgICAgICAgICAgY2FzZSAwOi8v55u057q/XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmUoZHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTovL3NpblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaW4oZHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlVmVsb2NpdHlMaW5lKGR0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6Ly/mipjnur9cclxuICAgICAgICAgICAgICAgIHRoaXMuemhleGlhbihkdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmxpbWl0ICYmIHRoaXMubm9BY3Rpb24pe1xyXG4gICAgICAgICAgICB0aGlzLm5vQWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZmlnaHRIdW1hbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/lkITnp43ovajov7nnmoTlh73mlbBcclxuICAgIC8v55u057q/XHJcbiAgICBsaW5lIDogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIGlmKCF0aGlzLmxpbWl0KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gNztcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnggPCAtdGhpcy5iYWNrLndpZHRoLzIgKyB0aGlzLm5vZGUud2lkdGgvMiArIHRoaXMuaHVtYW4ud2lkdGgvMiArIHRoaXMubGVmdFBhZGRpbmcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW1pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgc2luIDogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIGlmKCF0aGlzLmxpbWl0KXtcclxuICAgICAgICAgICAgdmFyIHdpbGxYID0gdGhpcy5ub2RlLnggLSA1O1xyXG4gICAgICAgICAgICB2YXIgd2lsbFkgPSBNYXRoLnNpbih3aWxsWC82MCkqNzA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gd2lsbFg7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gd2lsbFk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54IDwgLXRoaXMuYmFjay53aWR0aC8yICsgdGhpcy5ub2RlLndpZHRoLzIgKyB0aGlzLmh1bWFuLndpZHRoLzIgKyB0aGlzLmxlZnRQYWRkaW5nKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGltaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICAvL+aUueWPmOmAn+W6pui9qOi/ue+8iOebtOe6v++8iVxyXG4gICAgY2hhbmdlVmVsb2NpdHlMaW5lIDogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIGlmKCF0aGlzLmxpbWl0KXtcclxuICAgICAgICAgICAgaWYoY2MuZ2FtZS5jaGFuZ2VWZWxvY2l0eUxpbmVGbGFnKXsvL+W3sue7j+WcqOWKoOmAnyzorrDlvZXml7bpl7RcclxuICAgICAgICAgICAgICAgIGlmKCFjYy5nYW1lLmNoYW5nZVZlbG9jaXR5TGluZVRpbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmNoYW5nZVZlbG9jaXR5TGluZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGNjLmdhbWUuY2hhbmdlVmVsb2NpdHlMaW5lVGltZSA8IDAuNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gMTQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5jaGFuZ2VWZWxvY2l0eUxpbmVUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5jaGFuZ2VWZWxvY2l0eUxpbmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmNoYW5nZVZlbG9jaXR5TGluZUZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXsvL+ayoeacieWKoOmAn++8jOiuoeeul+maj+acuuaVsO+8jOWIpOaWreaYr+WQpuimgeWKoOmAn1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbUMgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYocmFuZG9tQyA8IDAuMDQpey8v5Yqg6YCfMXNcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmNoYW5nZVZlbG9jaXR5TGluZUZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7Ly/kuI3liqDpgJ/vvIzmraPluLjpo57ooYxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSA3O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUueCA8IC10aGlzLmJhY2sud2lkdGgvMiArIHRoaXMubm9kZS53aWR0aC8yICsgdGhpcy5odW1hbi53aWR0aC8yICsgdGhpcy5sZWZ0UGFkZGluZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/mipjnur9cclxuICAgIHpoZXhpYW4gOiBmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgaWYoIXRoaXMubGltaXQpe1xyXG4gICAgICAgICAgICB2YXIgd2lsbFggPSB0aGlzLm5vZGUueCAtIDY7XHJcbiAgICAgICAgICAgIHZhciB3aWxsWSA9IHRoaXMubm9kZS55ICsgKDMgKiB0aGlzLnpoZXhpYW5GbGFnKTtcclxuICAgICAgICAgICAgaWYoTWF0aC5hYnMod2lsbFkgLSB0aGlzLnlwb3MpID4gdGhpcy56aGV4aWFuTGltaXQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpbGxZID0gdGhpcy55cG9zICsgdGhpcy56aGV4aWFuTGltaXQgKiAodGhpcy56aGV4aWFuRmxhZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpoZXhpYW5GbGFnID0gLSh0aGlzLnpoZXhpYW5GbGFnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHdpbGxYO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHdpbGxZO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnggPCAtdGhpcy5iYWNrLndpZHRoLzIgKyB0aGlzLm5vZGUud2lkdGgvMiArIHRoaXMuaHVtYW4ud2lkdGgvMiArIHRoaXMubGVmdFBhZGRpbmcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW1pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBcclxuICAgIC8v6LaF6L+H5bem5L6n55WM6ZmQ77yM5pyd5Lq654mp6aOe57+UXHJcbiAgICBmaWdodEh1bWFuIDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgaHVtYW5YID0gdGhpcy5odW1hbi54O1xyXG4gICAgICAgIHZhciBodW1hblkgPSB0aGlzLmh1bWFuLnk7XHJcbiAgICAgICAgdmFyIGZpZ2h0QWN0aW9uID0gY2MubW92ZVRvKDEsaHVtYW5YLGh1bWFuWSk7XHJcbiAgICAgICAgdmFyIGFjdGlvbldpdGhDYWxsID0gY2Muc2VxdWVuY2UoZmlnaHRBY3Rpb24sY2MuY2FsbEZ1bmModGhpcy5hY3Rpb25GaW5pc2gsdGhpcyxudWxsKSk7XHJcbiAgICAgICAgLy/orqHnrpfop5LluqZcclxuICAgICAgICB2YXIgZGlzWCA9IE1hdGguYWJzKGh1bWFuWCAtIHRoaXMubm9kZS54KTtcclxuICAgICAgICB2YXIgZGlzWSA9IE1hdGguYWJzKGh1bWFuWSAtIHRoaXMubm9kZS55KTtcclxuICAgICAgICB2YXIgcm90YXRpb24gPSBNYXRoLmF0YW4oZGlzWS9kaXNYKSAqICgxODAvTWF0aC5QSSk7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnkgPiBodW1hblkpey8v5Zyo5LiK77yM5Y+N6L2sXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiA9IC1yb3RhdGlvbjtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLm5vZGUueSA8IGh1bWFuWSl7Ly/lnKjkuIvvvIzmraPovaxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb25XaXRoQ2FsbCk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6JqK5a2Q6KKr5ouN5q27LOiuoeWIhlxyXG4gICAgICovXHJcbiAgICBhY3Rpb25GaW5pc2ggOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v5bCG5ouN5q2755qE6JqK5a2Q56e76ZmkXHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAvL+iuoeWIhlxyXG4gICAgICAgIHZhciBwcmVOdW0gPSB0aGlzLnBhbnVtLnN0cmluZztcclxuICAgICAgICBpZihwcmVOdW0pe1xyXG4gICAgICAgICAgICB0aGlzLnBhbnVtLnN0cmluZyA9IHBhcnNlSW50KHByZU51bSkgKyAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhbnVtLnN0cmluZyA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmdhbWUucGFudW0gPSBwYXJzZUludCh0aGlzLnBhbnVtLnN0cmluZylcclxuICAgIH0sXHJcblxyXG4gICAgLy/norDmkp7lm57osINcclxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xyXG4gICAgICAgIHZhciBoYW5kWCA9IHRoaXMuaGFuZC54O1xyXG4gICAgICAgIHZhciBoYW5keSA9IHRoaXMuaGFuZC55O1xyXG5cclxuICAgICAgICAvL+WIpOaWrW9odGVyKGhhbmQp55qE5Z2Q5qCH77yM5piv5ZCm6KKr5ZKsXHJcbiAgICAgICAgLy/lj6rpnIDliKTmlq3omorlrZDmmK/lnKjmiYvkuIvovrnvvIzkuK3pl7TvvIzkuIrovrkg5Y2z5Y+v5Yy65YiGXHJcbiAgICAgICAgdmFyIHdlbnppID0gc2VsZi5ub2RlO1xyXG4gICAgICAgIHZhciB3ZW56aVggPSB3ZW56aS54O1xyXG4gICAgICAgIHZhciB3ZW56aVkgPSB3ZW56aS55O1xyXG5cclxuICAgICAgICB2YXIgY29sbGlzaW9uSGFuZCA9IG90aGVyLm5vZGU7XHJcbiAgICAgICAgdmFyIGNvbGxpc2lvbkhhbmRYID0gY29sbGlzaW9uSGFuZC54O1xyXG4gICAgICAgIHZhciBjb2xsaXNpb25IYW5kWSA9IGNvbGxpc2lvbkhhbmQueTtcclxuXHJcbiAgICAgICAgdmFyIGhhbmQxWCA9IHRoaXMuaGFuZDEueCArIGhhbmRYO1xyXG4gICAgICAgIHZhciBoYW5kMVkgPSB0aGlzLmhhbmQxLnkgKyBoYW5keTtcclxuXHJcbiAgICAgICAgdmFyIGhhbmQyWCA9IHRoaXMuaGFuZDIueCArIGhhbmRYO1xyXG4gICAgICAgIHZhciBoYW5kMlkgPSB0aGlzLmhhbmQyLnkgKyBoYW5keTtcclxuXHJcbiAgICAgICAgdmFyIHdlbnppTGVmdFggPSAgd2VuemlYIC0gc2VsZi5ub2RlLndpZHRoLzI7XHJcbiAgICAgICAgdmFyIGhhbmRSaWdodFggPSBoYW5kMVggKyB0aGlzLmhhbmQxLndpZHRoLzI7XHJcblxyXG4gICAgICAgIGlmKE1hdGguYWJzKGhhbmRSaWdodFggLSB3ZW56aUxlZnRYKSA8PSAxMCl7Ly/lnKjmiYvlj7Pkvqcs5ZKs5Yiw5omL6L6557yYXHJcbiAgICAgICAgICAgIHRoaXMuYml0ZSgpO1xyXG4gICAgICAgIH1lbHNlIGlmKHdlbnppWSA8IGhhbmQyWSl7Ly/lnKjmiYvkuItcclxuICAgICAgICAgICAgLy/miYvlj5jlpKfvvIzlj5jmsolcclxuICAgICAgICAgICAgdGhpcy5iaXRlKCk7XHJcbiAgICAgICAgfWVsc2UgaWYoaGFuZDJZIDwgd2VuemlZIDwgaGFuZDFZKXsvL+aJi+S4rVxyXG4gICAgICAgICAgICAvLyB0aGlzLmFjdGlvbkZpbmlzaCgpO1xyXG4gICAgICAgICAgICAvL+WIpOaWreaYr+WQpuaLjeaJiz9cclxuICAgICAgICAgICAgaWYoY2MuZ2FtZS5wYXBhcGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25GaW5pc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNley8v5Zyo5omL5LiKXHJcbiAgICAgICAgICAgIC8v5omL5Y+Y5aSn77yM5Y+Y5rKJXHJcbiAgICAgICAgICAgIHRoaXMuYml0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJpdGUgOiBmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgdmFyIHdpbGxTY2FsZVkxID0gdGhpcy5oYW5kMS5zY2FsZVkgKiAxLjY7XHJcbiAgICAgICAgdmFyIHdpbGxTY2FsZVkyID0gdGhpcy5oYW5kMS5zY2FsZVkgKiAxLjY7XHJcbiAgICAgICAgd2lsbFNjYWxlWTEgPSB3aWxsU2NhbGVZMSA+PSAzID8gMyA6IHdpbGxTY2FsZVkxO1xyXG4gICAgICAgIHdpbGxTY2FsZVkyID0gd2lsbFNjYWxlWTIgPj0gMyA/IDMgOiB3aWxsU2NhbGVZMjtcclxuICAgICAgICB0aGlzLmhhbmQxLnNjYWxlWSA9IHdpbGxTY2FsZVkxO1xyXG4gICAgICAgIHRoaXMuaGFuZDIuc2NhbGVZID0gd2lsbFNjYWxlWTI7XHJcblxyXG4gICAgICAgIHZhciB3aWxsV2VpZ2h0ID0gY2MuZ2FtZS5kb3duTW92ZUJ5ICogMS41O1xyXG4gICAgICAgIHdpbGxXZWlnaHQgPSAod2lsbFdlaWdodCA+IDYpID8gNiA6IHdpbGxXZWlnaHQ7XHJcbiAgICAgICAgY2MuZ2FtZS5kb3duTW92ZUJ5ID0gd2lsbFdlaWdodDtcclxuICAgIH1cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=