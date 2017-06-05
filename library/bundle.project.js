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
        this.schedule(this.spawn, 5.5);

        cc.game.temp = 0;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    spawn: function spawn() {

        //根据分数判断是否 发射 2连啪 3连啪 4连啪
        //TODO 
        if (cc.game.panum && cc.game.panum != 0) {
            if (cc.game.panum % 6 == 0) {
                //发射 2连啪
                this.spawnOne();
                this.schedule(this.spawnOne, 1);
                return;
            } else if (cc.game.panum % 12 == 0) {
                //发射 3连啪
                this.spawnOne();
                this.schedule(this.spawnOne, 1);
                this.schedule(this.spawnOne, 2);
                return;
            } else if (cc.game.panum % 24 == 0) {
                //发射 4连啪
                this.spawnOne();
                this.schedule(this.spawnOne, 1);
                this.schedule(this.spawnOne, 2);
                this.schedule(this.spawnOne, 3);
                return;
            }
        }

        // var wenzi = cc.instantiate(this.wenziPrefab);

        // var wenziCom = wenzi.getComponent("wenzi");
        // wenziCom.human = this.human;
        // wenziCom.back = this.back;
        // wenziCom.panum = this.panum;

        // //TODO 随机产生轨迹
        // // var track = (cc.game.temp++)%4;
        // var track = 0;

        // //TODO 蚊子的初始化y坐标，根据轨迹产生不同的y
        // var newBossPosY = 0;

        // wenzi.setPosition(cc.p(this.node.width/2 + wenzi.height/2 + 100 , newBossPosY));
        // wenziCom.setTrack(track);
        // this.node.addChild(wenzi);

        this.spawnOne();
    },

    /**
     * 随机产生运动轨迹
     */
    randomTrack: function randomTrack() {
        return parseInt(Math.random() * 4);
    },

    /**
     * 随机产生一个轨迹的蚊子,放到场景中
     */
    spawnOne: function spawnOne() {
        var wenzi = cc.instantiate(this.wenziPrefab);

        var wenziCom = wenzi.getComponent("wenzi");
        wenziCom.human = this.human;
        wenziCom.back = this.back;
        wenziCom.panum = this.panum;

        //随机产生轨迹
        var track = this.randomTrack();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvSGVsbG9Xb3JsZC5qcyIsImFzc2V0cy9TY3JpcHQvYmFjay5qcyIsImFzc2V0cy9TY3JpcHQvaGFuZC5qcyIsImFzc2V0cy9TY3JpcHQvbGVmdEJ1dHRvbi5qcyIsImFzc2V0cy9TY3JpcHQvcmlnaHRCdXR0b24uanMiLCJhc3NldHMvU2NyaXB0L3JvbGVhcm0uanMiLCJhc3NldHMvU2NyaXB0L3dlbnppLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRkc7QUFJUDtBQUNBO0FBTlE7O0FBU1o7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQWxCSzs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7O0FBRUk7QUFDSTtBQUNBO0FBRlU7QUFJZDtBQUNJO0FBQ0E7QUFGRztBQUlQO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQWxCUTs7QUFxQlo7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7O0FBRUE7QUFDSDs7QUFFRDtBQUNBOztBQUVBOztBQUVBOztBQUVJO0FBQ0E7QUFDQTtBQUNJO0FBQTJCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNIO0FBQWlDO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFBaUM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBSUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBR0g7O0FBRUQ7OztBQUdBO0FBQ0k7QUFDSDs7QUFFRDs7O0FBR0E7QUFDSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDSDs7QUF0SEk7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGRTtBQUlOO0FBQ0k7QUFDQTtBQUZFO0FBSU47QUFDSTtBQUNBO0FBRks7QUFJVDtBQUNBO0FBQ0E7QUF6QlE7O0FBNEJaO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFFSDs7QUFFRDtBQUNBOztBQUVBOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBRUE7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIOztBQUVEO0FBQ0g7QUFqRkk7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGQztBQUlMO0FBQ0k7QUFDQTtBQUZDO0FBSUw7QUFDQTtBQXBCUTs7QUF1Qlo7QUFDQTtBQUNJO0FBQ0E7O0FBRUM7QUFDRDtBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNIO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQXBESTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUZDO0FBWEc7O0FBaUJaO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0o7O0FBM0JJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0k7QUFDQTtBQUZFO0FBREU7O0FBT1o7QUFDQTtBQUNJO0FBQ0k7QUFDSDtBQUNKOztBQUVEO0FBQ0E7O0FBSUE7QUFDSTs7QUFFQTtBQUNBO0FBQ0E7QUFDSDtBQTVCSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7O0FBRUk7QUFDQTtBQUNJO0FBQ0E7QUFGRztBQUlQO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7QUFGRTs7QUFLTjtBQUNJO0FBQ0E7QUFGRTs7QUFLTjtBQUNJO0FBQ0E7QUFGRzs7QUFLUDtBQUNJO0FBQ0E7QUFGSTtBQWhDQTs7QUFzQ1o7QUFDQTtBQUNJO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNIOztBQUVEO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFBTztBQUNIO0FBQ0E7QUFDSjtBQUFPO0FBQ0g7QUFDQTtBQUNKO0FBQ0k7QUFDQTtBQUNKO0FBQU87QUFDSDtBQUNBOztBQVpSOztBQWdCQTtBQUNJO0FBQ0E7QUFDSDtBQUVKO0FBQ0Q7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0k7QUFDSDtBQUNKO0FBRUo7QUFDRDtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFFSjtBQUVKO0FBQ0Q7QUFDQTtBQUNJO0FBQ0k7QUFBbUM7QUFDL0I7QUFDUTtBQUNIO0FBQ0w7QUFDSTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBQ0g7QUFFSjtBQUFLO0FBQ0Y7QUFDQTtBQUFtQjtBQUNmO0FBQ0g7QUFBSztBQUNGO0FBQ0g7QUFDSjs7QUFFRDtBQUNJO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7O0FBRUE7QUFDSTtBQUNIO0FBQ0o7QUFFSjs7QUFJRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQXlCO0FBQ3JCO0FBQ0g7QUFBOEI7QUFDM0I7QUFDSDs7QUFHRDtBQUVIOztBQUVEOzs7QUFHQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFBNEM7QUFDeEM7QUFDSDtBQUF5QjtBQUN0QjtBQUNBO0FBQ0g7QUFBa0M7QUFDL0I7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNKO0FBQUs7QUFDRjtBQUNBO0FBQ0g7QUFFSjs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSDtBQXZQSSIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGRlZmF1bHRzLCBzZXQgdmlzdWFsbHkgd2hlbiBhdHRhY2hpbmcgdGhpcyBzY3JpcHQgdG8gdGhlIENhbnZhc1xyXG4gICAgICAgIHRleHQ6ICdIZWxsbywgV29ybGQhJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gdGhpcy50ZXh0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICBcclxuICAgICAgICB3ZW56aVByZWZhYiA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdCA6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGUgOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYWNrIDoge1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaHVtYW4gOiB7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYW51bSA6IHtcclxuICAgICAgICAgICAgdHlwZSA6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkZWZhdWx0IDogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluZVg6MTBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+WQr+WKqOeisOaSnuajgOa1i1xyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIC8v5ZCv5Yqo5a6a5pe277yM5Lqn55Sf5ZCE56eN6L2o6L+555qE6JqK5a2QXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduLDUuNSk7XHJcblxyXG4gICAgICAgIGNjLmdhbWUudGVtcCA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgc3Bhd246ZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgLy/moLnmja7liIbmlbDliKTmlq3mmK/lkKYg5Y+R5bCEIDLov57llaogM+i/nuWVqiA06L+e5ZWqXHJcbiAgICAgICAgLy9UT0RPIFxyXG4gICAgICAgIGlmKGNjLmdhbWUucGFudW0gJiYgY2MuZ2FtZS5wYW51bSAhPSAwKXtcclxuICAgICAgICAgICAgaWYoY2MuZ2FtZS5wYW51bSAlIDYgPT0gMCl7Ly/lj5HlsIQgMui/nuWVqlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGF3bk9uZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduT25lLDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihjYy5nYW1lLnBhbnVtICUgMTIgPT0gMCl7Ly/lj5HlsIQgM+i/nuWVqlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGF3bk9uZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduT25lLDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduT25lLDIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihjYy5nYW1lLnBhbnVtICUgMjQgPT0gMCl7Ly/lj5HlsIQgNOi/nuWVqlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGF3bk9uZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduT25lLDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduT25lLDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduT25lLDMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgLy8gdmFyIHdlbnppID0gY2MuaW5zdGFudGlhdGUodGhpcy53ZW56aVByZWZhYik7XHJcblxyXG4gICAgICAgIC8vIHZhciB3ZW56aUNvbSA9IHdlbnppLmdldENvbXBvbmVudChcIndlbnppXCIpO1xyXG4gICAgICAgIC8vIHdlbnppQ29tLmh1bWFuID0gdGhpcy5odW1hbjtcclxuICAgICAgICAvLyB3ZW56aUNvbS5iYWNrID0gdGhpcy5iYWNrO1xyXG4gICAgICAgIC8vIHdlbnppQ29tLnBhbnVtID0gdGhpcy5wYW51bTtcclxuXHJcbiAgICAgICAgLy8gLy9UT0RPIOmaj+acuuS6p+eUn+i9qOi/uVxyXG4gICAgICAgIC8vIC8vIHZhciB0cmFjayA9IChjYy5nYW1lLnRlbXArKyklNDtcclxuICAgICAgICAvLyB2YXIgdHJhY2sgPSAwO1xyXG5cclxuICAgICAgICAvLyAvL1RPRE8g6JqK5a2Q55qE5Yid5aeL5YyWeeWdkOagh++8jOagueaNrui9qOi/ueS6p+eUn+S4jeWQjOeahHlcclxuICAgICAgICAvLyB2YXIgbmV3Qm9zc1Bvc1kgPSAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHdlbnppLnNldFBvc2l0aW9uKGNjLnAodGhpcy5ub2RlLndpZHRoLzIgKyB3ZW56aS5oZWlnaHQvMiArIDEwMCAsIG5ld0Jvc3NQb3NZKSk7XHJcbiAgICAgICAgLy8gd2VuemlDb20uc2V0VHJhY2sodHJhY2spO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5hZGRDaGlsZCh3ZW56aSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3Bhd25PbmUoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py65Lqn55Sf6L+Q5Yqo6L2o6L+5XHJcbiAgICAgKi9cclxuICAgIHJhbmRvbVRyYWNrIDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmaj+acuuS6p+eUn+S4gOS4qui9qOi/ueeahOiaiuWtkCzmlL7liLDlnLrmma/kuK1cclxuICAgICAqL1xyXG4gICAgc3Bhd25PbmU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgd2VuemkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLndlbnppUHJlZmFiKTtcclxuXHJcbiAgICAgICAgdmFyIHdlbnppQ29tID0gd2VuemkuZ2V0Q29tcG9uZW50KFwid2VuemlcIik7XHJcbiAgICAgICAgd2VuemlDb20uaHVtYW4gPSB0aGlzLmh1bWFuO1xyXG4gICAgICAgIHdlbnppQ29tLmJhY2sgPSB0aGlzLmJhY2s7XHJcbiAgICAgICAgd2VuemlDb20ucGFudW0gPSB0aGlzLnBhbnVtO1xyXG5cclxuICAgICAgICAvL+maj+acuuS6p+eUn+i9qOi/uVxyXG4gICAgICAgIHZhciB0cmFjayA9IHRoaXMucmFuZG9tVHJhY2soKTtcclxuICAgICAgICAvL1RPRE8g6JqK5a2Q55qE5Yid5aeL5YyWeeWdkOagh++8jOagueaNrui9qOi/ueS6p+eUn+S4jeWQjOeahHlcclxuICAgICAgICB2YXIgbmV3Qm9zc1Bvc1kgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgd2Vuemkuc2V0UG9zaXRpb24oY2MucCh0aGlzLm5vZGUud2lkdGgvMiArIHdlbnppLmhlaWdodC8yICsgMTAwICwgbmV3Qm9zc1Bvc1kpKTtcclxuICAgICAgICB3ZW56aUNvbS5zZXRUcmFjayh0cmFjayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHdlbnppKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgaGFuZDE6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZDI6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFja05vZGU6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFmaXg6NixcclxuICAgICAgICBsZWZ0UGFkZGluZzoyMjAsXHJcbiAgICAgICAgcmlnaHRQYWRkaW5nOjIwXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDEwO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCAsIHRoaXMudG91Y2hTdGFydCAsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFICwgdGhpcy50b3VjaE1vdmUgLCB0aGlzKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgcGFwYXBhOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGhhbmQxWSA9IHRoaXMuaGFuZDEueTtcclxuICAgICAgICB2YXIgaGFuZDJZID0gdGhpcy5oYW5kMi55O1xyXG4gICAgICAgIHZhciBkaXMgPSBNYXRoLmFicyhoYW5kMVkgLSBoYW5kMlkpO1xyXG4gICAgICAgIHRoaXMuaGFuZDEueSAtPSAoZGlzLzIgLSB0aGlzLnBhZml4KTtcclxuICAgICAgICB0aGlzLmhhbmQyLnkgKz0gKGRpcy8yIC10aGlzLnBhZml4KTtcclxuICAgICAgICAvL+aSreaUvnBh6Z+z5pWIXHJcbiAgICAgICAgLy8gY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmJ1dHRvbkNvbnRyb2xDb20uZ2FpbnQpO1xyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjYy5nYW1lLnBhcGFwYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmQxLnkgKz0gKGRpcy8yIC0gdGhpcy5wYWZpeCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZDIueSAtPSAoZGlzLzIgLXRoaXMucGFmaXgpO1xyXG4gICAgICAgIH0sMC4zKTtcclxuICAgIH0sXHJcblxyXG4gICAgdG91Y2hTdGFydCA6IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIH0sXHJcbiAgICB0b3VjaE1vdmU6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIC8v6K6h566X5bem5Y+z6L6555WMXHJcbiAgICAgICAgdmFyIGxlZnRMaW1pdCA9IC10aGlzLmJhY2tOb2RlLndpZHRoLzIgKyB0aGlzLm5vZGUud2lkdGgvMiArIHRoaXMubGVmdFBhZGRpbmc7XHJcbiAgICAgICAgdmFyIHJpZ2h0TGltaXQgPSB0aGlzLmJhY2tOb2RlLndpZHRoLzIgLSB0aGlzLm5vZGUud2lkdGgvMiAtIHRoaXMucmlnaHRQYWRkaW5nO1xyXG5cclxuICAgICAgICBsZXQgcHJldlBvaW50ID0gZXZlbnQuZ2V0UHJldmlvdXNMb2NhdGlvbigpO1xyXG5cclxuICAgICAgICBsZXQgcG9pbnQgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG5cclxuICAgICAgICBsZXQgZGlzWCA9IHBvaW50LnggLSBwcmV2UG9pbnQueDtcclxuXHJcbiAgICAgICAgdmFyIHdpbGxYID0gdGhpcy5ub2RlLnggKyBkaXNYO1xyXG4gICAgICAgIGlmKHdpbGxYIDw9IGxlZnRMaW1pdCl7XHJcbiAgICAgICAgICAgIHdpbGxYID0gbGVmdExpbWl0O1xyXG4gICAgICAgIH1lbHNlIGlmKHdpbGxYID49IHJpZ2h0TGltaXQpe1xyXG4gICAgICAgICAgICB3aWxsWCA9IHJpZ2h0TGltaXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUueCA9IHdpbGxYO1xyXG4gICAgfVxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgICAgIGhhbmQ6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFjazp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b3BwYWRkaW5nOjMwLFxyXG4gICAgICAgIGRvd25QYWRkaW5nOjQwXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS5oYW5kTW92ZUJ5ID0gNjA7XHJcbiAgICAgICAgY2MuZ2FtZS5kb3duTW92ZUJ5ID0gMjtcclxuXHJcbiAgICAgICAgIC8vIOS9v+eUqOaemuS4vuexu+Wei+adpeazqOWGjFxyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+aGFuZOS4iuenu+WKqOeUu1xyXG4gICAgICAgICAgICB2YXIgYW5pID0gdGhpcy5oYW5kLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vdmVCeUxpbWl0ID0gdGhpcy5iYWNrLmhlaWdodC8yIC0gdGhpcy50b3BwYWRkaW5nIC0gdGhpcy5oYW5kLmhlaWdodC8yO1xyXG4gICAgICAgICAgICBpZih0aGlzLmhhbmQueSA8IG1vdmVCeUxpbWl0KXtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlQnlEaXMgPSAodGhpcy5oYW5kLnkgKyBjYy5nYW1lLmhhbmRNb3ZlQnkgPj0gbW92ZUJ5TGltaXQpID8gKG1vdmVCeUxpbWl0IC0gdGhpcy5oYW5kLnkpIDogY2MuZ2FtZS5oYW5kTW92ZUJ5O1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbmJ5ID0gY2MubW92ZUJ5KDAuMiwwLG1vdmVCeURpcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgc2VxID0gY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuNSwgMjAwLCAwKSwgY2MubW92ZUJ5KDAuNSwgLTIwMCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kLnJ1bkFjdGlvbihhY3Rpb25ieSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYW5pLnBsYXkoXCJoYW5kYW5pXCIpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB2YXIgZG93bkxpbWl0ID0gLXRoaXMuYmFjay5oZWlnaHQvMiArIHRoaXMuaGFuZC5oZWlnaHQvMiArIHRoaXMuZG93blBhZGRpbmc7XHJcbiAgICAgICAgdmFyIGRvd25EaXMgPSAodGhpcy5oYW5kLnkgLSBjYy5nYW1lLmRvd25Nb3ZlQnkgPD0gZG93bkxpbWl0KSA/IDAgOiBjYy5nYW1lLmRvd25Nb3ZlQnk7XHJcbiAgICAgICAgdGhpcy5oYW5kLnkgLT0gZG93bkRpcztcclxuICAgIH0sXHJcblxyXG4gICAgXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgaGFuZDp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIOS9v+eUqOaemuS4vuexu+Wei+adpeazqOWGjFxyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUucGFwYXBhID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kLmdldENvbXBvbmVudChcImhhbmRcIikucGFwYXBhKCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG1vdXRoOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9ybWFsKCk7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBsYXlOb3JtYWwgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBsZWZ0Um9sZUFuaSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuXHJcbiAgICAgICAgdmFyIG1vdXRoQW5pID0gdGhpcy5tb3V0aC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBtb3V0aEFuaS5wbGF5KFwibW91dGhub3JtYWxcIik7XHJcbiAgICAgICAgbGVmdFJvbGVBbmkucGxheShcIm5vcm1hbFwiKTtcclxuICAgIH1cclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICBcclxuICAgICAgICB0cmFjayA6IDAsXHJcbiAgICAgICAgYmFjayA6IHtcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGh1bWFuIDoge1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVmdFBhZGRpbmcgOiA2MCxcclxuICAgICAgICBsaW1pdCA6IGZhbHNlLFxyXG4gICAgICAgIHlwb3M6MCxcclxuICAgICAgICB6aGV4aWFuRmxhZzoxLFxyXG4gICAgICAgIHpoZXhpYW5MaW1pdCA6IDYwLFxyXG5cclxuICAgICAgICBoYW5kMTp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZDI6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhhbmQgOiB7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGFudW0gOiB7XHJcbiAgICAgICAgICAgIHR5cGUgOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGVmYXVsdCA6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ub0FjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy55cG9zID0gdGhpcy5ub2RlLnk7XHJcblxyXG4gICAgICAgIC8v6I635Y+WaGFuZDHlkoxoYW5kMlxyXG4gICAgICAgIHRoaXMuaGFuZDEgPSBjYy5maW5kKFwiQ2FudmFzL2JhY2svaGFuZC9oYW5kMVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kMiA9IGNjLmZpbmQoXCJDYW52YXMvYmFjay9oYW5kL2hhbmQyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmQgPSBjYy5maW5kKFwiQ2FudmFzL2JhY2svaGFuZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0VHJhY2sgOiBmdW5jdGlvbih0cmFjayl7XHJcbiAgICAgICAgdGhpcy50cmFjayA9IHRyYWNrO1xyXG4gICAgfSxcclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgc3dpdGNoKHRoaXMudHJhY2spe1xyXG4gICAgICAgICAgICBjYXNlIDA6Ly/nm7Tnur9cclxuICAgICAgICAgICAgICAgIHRoaXMubGluZShkdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOi8vc2luXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpbihkdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VWZWxvY2l0eUxpbmUoZHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzovL+aKmOe6v1xyXG4gICAgICAgICAgICAgICAgdGhpcy56aGV4aWFuKGR0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubGltaXQgJiYgdGhpcy5ub0FjdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMubm9BY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5maWdodEh1bWFuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+WQhOenjei9qOi/ueeahOWHveaVsFxyXG4gICAgLy/nm7Tnur9cclxuICAgIGxpbmUgOiBmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgaWYoIXRoaXMubGltaXQpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCAtPSA3O1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUueCA8IC10aGlzLmJhY2sud2lkdGgvMiArIHRoaXMubm9kZS53aWR0aC8yICsgdGhpcy5odW1hbi53aWR0aC8yICsgdGhpcy5sZWZ0UGFkZGluZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBzaW4gOiBmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgaWYoIXRoaXMubGltaXQpe1xyXG4gICAgICAgICAgICB2YXIgd2lsbFggPSB0aGlzLm5vZGUueCAtIDU7XHJcbiAgICAgICAgICAgIHZhciB3aWxsWSA9IE1hdGguc2luKHdpbGxYLzYwKSo3MDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSB3aWxsWDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSB3aWxsWTtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnggPCAtdGhpcy5iYWNrLndpZHRoLzIgKyB0aGlzLm5vZGUud2lkdGgvMiArIHRoaXMuaHVtYW4ud2lkdGgvMiArIHRoaXMubGVmdFBhZGRpbmcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW1pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIC8v5pS55Y+Y6YCf5bqm6L2o6L+577yI55u057q/77yJXHJcbiAgICBjaGFuZ2VWZWxvY2l0eUxpbmUgOiBmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgaWYoIXRoaXMubGltaXQpe1xyXG4gICAgICAgICAgICBpZihjYy5nYW1lLmNoYW5nZVZlbG9jaXR5TGluZUZsYWcpey8v5bey57uP5Zyo5Yqg6YCfLOiusOW9leaXtumXtFxyXG4gICAgICAgICAgICAgICAgaWYoIWNjLmdhbWUuY2hhbmdlVmVsb2NpdHlMaW5lVGltZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuY2hhbmdlVmVsb2NpdHlMaW5lVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoY2MuZ2FtZS5jaGFuZ2VWZWxvY2l0eUxpbmVUaW1lIDwgMC40KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSAxNDtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmNoYW5nZVZlbG9jaXR5TGluZVRpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmNoYW5nZVZlbG9jaXR5TGluZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuY2hhbmdlVmVsb2NpdHlMaW5lRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNley8v5rKh5pyJ5Yqg6YCf77yM6K6h566X6ZqP5py65pWw77yM5Yik5pat5piv5ZCm6KaB5Yqg6YCfXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tQyA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgICAgICBpZihyYW5kb21DIDwgMC4wNCl7Ly/liqDpgJ8xc1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuY2hhbmdlVmVsb2NpdHlMaW5lRmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXsvL+S4jeWKoOmAn++8jOato+W4uOmjnuihjFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54IDwgLXRoaXMuYmFjay53aWR0aC8yICsgdGhpcy5ub2RlLndpZHRoLzIgKyB0aGlzLmh1bWFuLndpZHRoLzIgKyB0aGlzLmxlZnRQYWRkaW5nKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGltaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+aKmOe6v1xyXG4gICAgemhleGlhbiA6IGZ1bmN0aW9uKGR0KXtcclxuICAgICAgICBpZighdGhpcy5saW1pdCl7XHJcbiAgICAgICAgICAgIHZhciB3aWxsWCA9IHRoaXMubm9kZS54IC0gNjtcclxuICAgICAgICAgICAgdmFyIHdpbGxZID0gdGhpcy5ub2RlLnkgKyAoMyAqIHRoaXMuemhleGlhbkZsYWcpO1xyXG4gICAgICAgICAgICBpZihNYXRoLmFicyh3aWxsWSAtIHRoaXMueXBvcykgPiB0aGlzLnpoZXhpYW5MaW1pdCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lsbFkgPSB0aGlzLnlwb3MgKyB0aGlzLnpoZXhpYW5MaW1pdCAqICh0aGlzLnpoZXhpYW5GbGFnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuemhleGlhbkZsYWcgPSAtKHRoaXMuemhleGlhbkZsYWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gd2lsbFg7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gd2lsbFk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUueCA8IC10aGlzLmJhY2sud2lkdGgvMiArIHRoaXMubm9kZS53aWR0aC8yICsgdGhpcy5odW1hbi53aWR0aC8yICsgdGhpcy5sZWZ0UGFkZGluZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG5cclxuICAgIFxyXG4gICAgLy/otoXov4flt6bkvqfnlYzpmZDvvIzmnJ3kurrnianpo57nv5RcclxuICAgIGZpZ2h0SHVtYW4gOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBodW1hblggPSB0aGlzLmh1bWFuLng7XHJcbiAgICAgICAgdmFyIGh1bWFuWSA9IHRoaXMuaHVtYW4ueTtcclxuICAgICAgICB2YXIgZmlnaHRBY3Rpb24gPSBjYy5tb3ZlVG8oMSxodW1hblgsaHVtYW5ZKTtcclxuICAgICAgICB2YXIgYWN0aW9uV2l0aENhbGwgPSBjYy5zZXF1ZW5jZShmaWdodEFjdGlvbixjYy5jYWxsRnVuYyh0aGlzLmFjdGlvbkZpbmlzaCx0aGlzLG51bGwpKTtcclxuICAgICAgICAvL+iuoeeul+inkuW6plxyXG4gICAgICAgIHZhciBkaXNYID0gTWF0aC5hYnMoaHVtYW5YIC0gdGhpcy5ub2RlLngpO1xyXG4gICAgICAgIHZhciBkaXNZID0gTWF0aC5hYnMoaHVtYW5ZIC0gdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgIHZhciByb3RhdGlvbiA9IE1hdGguYXRhbihkaXNZL2Rpc1gpICogKDE4MC9NYXRoLlBJKTtcclxuICAgICAgICBpZih0aGlzLm5vZGUueSA+IGh1bWFuWSl7Ly/lnKjkuIrvvIzlj43ovaxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gLXJvdGF0aW9uO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubm9kZS55IDwgaHVtYW5ZKXsvL+WcqOS4i++8jOato+i9rFxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbldpdGhDYWxsKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDomorlrZDooqvmi43mrbss6K6h5YiGXHJcbiAgICAgKi9cclxuICAgIGFjdGlvbkZpbmlzaCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/lsIbmi43mrbvnmoTomorlrZDnp7vpmaRcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIC8v6K6h5YiGXHJcbiAgICAgICAgdmFyIHByZU51bSA9IHRoaXMucGFudW0uc3RyaW5nO1xyXG4gICAgICAgIGlmKHByZU51bSl7XHJcbiAgICAgICAgICAgIHRoaXMucGFudW0uc3RyaW5nID0gcGFyc2VJbnQocHJlTnVtKSArIDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGFudW0uc3RyaW5nID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZ2FtZS5wYW51bSA9IHBhcnNlSW50KHRoaXMucGFudW0uc3RyaW5nKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+eisOaSnuWbnuiwg1xyXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XHJcbiAgICAgICAgdmFyIGhhbmRYID0gdGhpcy5oYW5kLng7XHJcbiAgICAgICAgdmFyIGhhbmR5ID0gdGhpcy5oYW5kLnk7XHJcblxyXG4gICAgICAgIC8v5Yik5patb2h0ZXIoaGFuZCnnmoTlnZDmoIfvvIzmmK/lkKbooqvlkqxcclxuICAgICAgICAvL+WPqumcgOWIpOaWreiaiuWtkOaYr+WcqOaJi+S4i+i+ue+8jOS4remXtO+8jOS4iui+uSDljbPlj6/ljLrliIZcclxuICAgICAgICB2YXIgd2VuemkgPSBzZWxmLm5vZGU7XHJcbiAgICAgICAgdmFyIHdlbnppWCA9IHdlbnppLng7XHJcbiAgICAgICAgdmFyIHdlbnppWSA9IHdlbnppLnk7XHJcblxyXG4gICAgICAgIHZhciBjb2xsaXNpb25IYW5kID0gb3RoZXIubm9kZTtcclxuICAgICAgICB2YXIgY29sbGlzaW9uSGFuZFggPSBjb2xsaXNpb25IYW5kLng7XHJcbiAgICAgICAgdmFyIGNvbGxpc2lvbkhhbmRZID0gY29sbGlzaW9uSGFuZC55O1xyXG5cclxuICAgICAgICB2YXIgaGFuZDFYID0gdGhpcy5oYW5kMS54ICsgaGFuZFg7XHJcbiAgICAgICAgdmFyIGhhbmQxWSA9IHRoaXMuaGFuZDEueSArIGhhbmR5O1xyXG5cclxuICAgICAgICB2YXIgaGFuZDJYID0gdGhpcy5oYW5kMi54ICsgaGFuZFg7XHJcbiAgICAgICAgdmFyIGhhbmQyWSA9IHRoaXMuaGFuZDIueSArIGhhbmR5O1xyXG5cclxuICAgICAgICB2YXIgd2VuemlMZWZ0WCA9ICB3ZW56aVggLSBzZWxmLm5vZGUud2lkdGgvMjtcclxuICAgICAgICB2YXIgaGFuZFJpZ2h0WCA9IGhhbmQxWCArIHRoaXMuaGFuZDEud2lkdGgvMjtcclxuXHJcbiAgICAgICAgaWYoTWF0aC5hYnMoaGFuZFJpZ2h0WCAtIHdlbnppTGVmdFgpIDw9IDEwKXsvL+WcqOaJi+WPs+S+pyzlkqzliLDmiYvovrnnvJhcclxuICAgICAgICAgICAgdGhpcy5iaXRlKCk7XHJcbiAgICAgICAgfWVsc2UgaWYod2VuemlZIDwgaGFuZDJZKXsvL+WcqOaJi+S4i1xyXG4gICAgICAgICAgICAvL+aJi+WPmOWkp++8jOWPmOayiVxyXG4gICAgICAgICAgICB0aGlzLmJpdGUoKTtcclxuICAgICAgICB9ZWxzZSBpZihoYW5kMlkgPCB3ZW56aVkgPCBoYW5kMVkpey8v5omL5LitXHJcbiAgICAgICAgICAgIC8vIHRoaXMuYWN0aW9uRmluaXNoKCk7XHJcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5ouN5omLP1xyXG4gICAgICAgICAgICBpZihjYy5nYW1lLnBhcGFwYSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbkZpbmlzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7Ly/lnKjmiYvkuIpcclxuICAgICAgICAgICAgLy/miYvlj5jlpKfvvIzlj5jmsolcclxuICAgICAgICAgICAgdGhpcy5iaXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYml0ZSA6IGZ1bmN0aW9uKGR0KXtcclxuICAgICAgICB2YXIgd2lsbFNjYWxlWTEgPSB0aGlzLmhhbmQxLnNjYWxlWSAqIDEuNjtcclxuICAgICAgICB2YXIgd2lsbFNjYWxlWTIgPSB0aGlzLmhhbmQxLnNjYWxlWSAqIDEuNjtcclxuICAgICAgICB3aWxsU2NhbGVZMSA9IHdpbGxTY2FsZVkxID49IDMgPyAzIDogd2lsbFNjYWxlWTE7XHJcbiAgICAgICAgd2lsbFNjYWxlWTIgPSB3aWxsU2NhbGVZMiA+PSAzID8gMyA6IHdpbGxTY2FsZVkyO1xyXG4gICAgICAgIHRoaXMuaGFuZDEuc2NhbGVZID0gd2lsbFNjYWxlWTE7XHJcbiAgICAgICAgdGhpcy5oYW5kMi5zY2FsZVkgPSB3aWxsU2NhbGVZMjtcclxuXHJcbiAgICAgICAgdmFyIHdpbGxXZWlnaHQgPSBjYy5nYW1lLmRvd25Nb3ZlQnkgKiAxLjU7XHJcbiAgICAgICAgd2lsbFdlaWdodCA9ICh3aWxsV2VpZ2h0ID4gNikgPyA2IDogd2lsbFdlaWdodDtcclxuICAgICAgICBjYy5nYW1lLmRvd25Nb3ZlQnkgPSB3aWxsV2VpZ2h0O1xyXG4gICAgfVxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==