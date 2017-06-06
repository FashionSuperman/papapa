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
                //记录当前的生成蚊子数
                cc.game.spawnNum = 2;
                this.spawnOne();
                this.schedule(this.spawnOne, 1);
                return;
            } else if (cc.game.panum % 12 == 0) {
                //发射 3连啪
                //记录当前的生成蚊子数
                cc.game.spawnNum = 3;
                this.spawnOne();
                this.schedule(this.spawnOne, 1);
                this.schedule(this.spawnOne, 2);
                return;
            } else if (cc.game.panum % 24 == 0) {
                //发射 4连啪
                //记录当前的生成蚊子数
                cc.game.spawnNum = 4;
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


        //记录当前的生成蚊子数
        cc.game.spawnNum = 1;
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
        cc.game.currentPaSpawnNum = 0;

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
            cc.game.currentPaSpawnNum = 0;
            this.bite();
        } else if (wenziY < hand2Y) {
            //在手下
            //手变大，变沉
            cc.game.currentPaSpawnNum = 0;
            this.bite();
        } else if (hand2Y < wenziY < hand1Y) {
            //手中
            // this.actionFinish();
            //判断是否拍手?
            if (cc.game.papapa) {
                //拍死
                //判断是否是多连啪,如果是,运行动画效果

                if (cc.game.spawnNum > 1) {
                    cc.game.currentPaSpawnNum = !cc.game.currentPaSpawnNum ? 0 : cc.game.currentPaSpawnNum; //当前的多啪  啪死的个数

                    if (cc.game.currentPaSpawnNum = cc.game.spawnNum) {
                        //产生了多啪效果
                        cc.game.currentPaSpawnNum = 0;
                        switch (cc.game.spawnNum) {
                            case 2:
                                //TODO 产生2连啪效果

                                break;
                            case 3:
                                //TODO 产生3连啪效果

                                break;
                            case 4:
                                //TODO 产生4连啪效果
                                break;
                            default:
                                break;
                        }
                    } else {
                        cc.game.currentPaSpawnNum++;
                    }
                }

                this.actionFinish();
            }
        } else {
            //在手上
            //手变大，变沉
            cc.game.currentPaSpawnNum = 0;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvSGVsbG9Xb3JsZC5qcyIsImFzc2V0cy9TY3JpcHQvYmFjay5qcyIsImFzc2V0cy9TY3JpcHQvaGFuZC5qcyIsImFzc2V0cy9TY3JpcHQvbGVmdEJ1dHRvbi5qcyIsImFzc2V0cy9TY3JpcHQvcmlnaHRCdXR0b24uanMiLCJhc3NldHMvU2NyaXB0L3JvbGVhcm0uanMiLCJhc3NldHMvU2NyaXB0L3dlbnppLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRkc7QUFJUDtBQUNBO0FBTlE7O0FBU1o7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQWxCSzs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7O0FBRUk7QUFDSTtBQUNBO0FBRlU7QUFJZDtBQUNJO0FBQ0E7QUFGRztBQUlQO0FBQ0k7QUFDQTtBQUZJO0FBSVI7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQWxCUTs7QUFxQlo7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7O0FBRUE7QUFDSDs7QUFFRDtBQUNBOztBQUVBOztBQUVBOztBQUVJO0FBQ0E7QUFDQTtBQUNJO0FBQTJCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUFpQztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUFpQztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBSUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7QUFHSDs7QUFFRDs7O0FBR0E7QUFDSTtBQUNIOztBQUVEOzs7QUFHQTtBQUNJOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNIOztBQWhJSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUZFO0FBSU47QUFDSTtBQUNBO0FBRkU7QUFJTjtBQUNJO0FBQ0E7QUFGSztBQUlUO0FBQ0E7QUFDQTtBQXpCUTs7QUE0Qlo7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUVIOztBQUVEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFFQTtBQUNJO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7O0FBRUQ7QUFDSDtBQWpGSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUZDO0FBSUw7QUFDSTtBQUNBO0FBRkM7QUFJTDtBQUNBO0FBcEJROztBQXVCWjtBQUNBO0FBQ0k7QUFDQTs7QUFFQztBQUNEO0FBQ0k7QUFDQTs7QUFFQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0g7QUFDSjs7QUFFRDtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7O0FBcERJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRkM7QUFYRzs7QUFpQlo7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDSjs7QUEzQkk7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRkU7QUFERTs7QUFPWjtBQUNBO0FBQ0k7QUFDSTtBQUNIO0FBQ0o7O0FBRUQ7QUFDQTs7QUFJQTtBQUNJOztBQUVBO0FBQ0E7QUFDQTtBQUNIO0FBNUJJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTs7QUFFSTtBQUNBO0FBQ0k7QUFDQTtBQUZHO0FBSVA7QUFDSTtBQUNBO0FBRkk7QUFJUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUZFOztBQUtOO0FBQ0k7QUFDQTtBQUZFOztBQUtOO0FBQ0k7QUFDQTtBQUZHOztBQUtQO0FBQ0k7QUFDQTtBQUZJO0FBaENBOztBQXNDWjtBQUNBO0FBQ0k7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUFPO0FBQ0g7QUFDQTtBQUNKO0FBQU87QUFDSDtBQUNBO0FBQ0o7QUFDSTtBQUNBO0FBQ0o7QUFBTztBQUNIO0FBQ0E7O0FBWlI7O0FBZ0JBO0FBQ0k7QUFDQTtBQUNIO0FBRUo7QUFDRDtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0o7QUFFSjtBQUNEO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUVKO0FBRUo7QUFDRDtBQUNBO0FBQ0k7QUFDSTtBQUFtQztBQUMvQjtBQUNRO0FBQ0g7QUFDTDtBQUNJO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDSDtBQUVKO0FBQUs7QUFDRjtBQUNBO0FBQW1CO0FBQ2Y7QUFDSDtBQUFLO0FBQ0Y7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7QUFDQTs7QUFFQTtBQUNJO0FBQ0g7QUFDSjtBQUVKOztBQUlEO0FBQ0E7QUFDSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBeUI7QUFDckI7QUFDSDtBQUE4QjtBQUMzQjtBQUNIOztBQUdEO0FBRUg7O0FBRUQ7OztBQUdBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0Q7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUE0QztBQUN4QztBQUNBO0FBQ0g7QUFBeUI7QUFDdEI7QUFDQTtBQUNBO0FBQ0g7QUFBa0M7QUFDL0I7QUFDQTtBQUNBO0FBQW1CO0FBQ2Y7O0FBRUE7QUFDSTs7QUFFQTtBQUFpRDtBQUM3QztBQUNBO0FBQ0k7QUFDSTs7QUFFQTtBQUNKO0FBQ0k7O0FBRUE7QUFDSjtBQUNJO0FBQ0E7QUFDSjtBQUNJO0FBYlI7QUFlSDtBQUNHO0FBQ0g7QUFDSjs7QUFFRDtBQUNIO0FBQ0o7QUFBSztBQUNGO0FBQ0E7QUFDQTtBQUNIO0FBRUo7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0g7QUF2UkkiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBkZWZhdWx0cywgc2V0IHZpc3VhbGx5IHdoZW4gYXR0YWNoaW5nIHRoaXMgc2NyaXB0IHRvIHRoZSBDYW52YXNcclxuICAgICAgICB0ZXh0OiAnSGVsbG8sIFdvcmxkISdcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IHRoaXMudGV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgXHJcbiAgICAgICAgd2VuemlQcmVmYWIgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQgOiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlIDogY2MuUHJlZmFiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFjayA6IHtcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGh1bWFuIDoge1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFudW0gOiB7XHJcbiAgICAgICAgICAgIHR5cGUgOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGVmYXVsdCA6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmVYOjEwXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/lkK/liqjnorDmkp7mo4DmtYtcclxuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAvL+WQr+WKqOWumuaXtu+8jOS6p+eUn+WQhOenjei9qOi/ueeahOiaiuWtkFxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3biw1LjUpO1xyXG5cclxuICAgICAgICBjYy5nYW1lLnRlbXAgPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIHNwYXduOmZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIC8v5qC55o2u5YiG5pWw5Yik5pat5piv5ZCmIOWPkeWwhCAy6L+e5ZWqIDPov57llaogNOi/nuWVqlxyXG4gICAgICAgIC8vVE9ETyBcclxuICAgICAgICBpZihjYy5nYW1lLnBhbnVtICYmIGNjLmdhbWUucGFudW0gIT0gMCl7XHJcbiAgICAgICAgICAgIGlmKGNjLmdhbWUucGFudW0gJSA2ID09IDApey8v5Y+R5bCEIDLov57llapcclxuICAgICAgICAgICAgICAgIC8v6K6w5b2V5b2T5YmN55qE55Sf5oiQ6JqK5a2Q5pWwXHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLnNwYXduTnVtID0gMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25PbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3bk9uZSwxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfWVsc2UgaWYoY2MuZ2FtZS5wYW51bSAlIDEyID09IDApey8v5Y+R5bCEIDPov57llapcclxuICAgICAgICAgICAgICAgIC8v6K6w5b2V5b2T5YmN55qE55Sf5oiQ6JqK5a2Q5pWwXHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLnNwYXduTnVtID0gMztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25PbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3bk9uZSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3bk9uZSwyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfWVsc2UgaWYoY2MuZ2FtZS5wYW51bSAlIDI0ID09IDApey8v5Y+R5bCEIDTov57llapcclxuICAgICAgICAgICAgICAgIC8v6K6w5b2V5b2T5YmN55qE55Sf5oiQ6JqK5a2Q5pWwXHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLnNwYXduTnVtID0gNDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25PbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3bk9uZSwxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3bk9uZSwyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3bk9uZSwzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIC8vIHZhciB3ZW56aSA9IGNjLmluc3RhbnRpYXRlKHRoaXMud2VuemlQcmVmYWIpO1xyXG5cclxuICAgICAgICAvLyB2YXIgd2VuemlDb20gPSB3ZW56aS5nZXRDb21wb25lbnQoXCJ3ZW56aVwiKTtcclxuICAgICAgICAvLyB3ZW56aUNvbS5odW1hbiA9IHRoaXMuaHVtYW47XHJcbiAgICAgICAgLy8gd2VuemlDb20uYmFjayA9IHRoaXMuYmFjaztcclxuICAgICAgICAvLyB3ZW56aUNvbS5wYW51bSA9IHRoaXMucGFudW07XHJcblxyXG4gICAgICAgIC8vIC8vVE9ETyDpmo/mnLrkuqfnlJ/ovajov7lcclxuICAgICAgICAvLyAvLyB2YXIgdHJhY2sgPSAoY2MuZ2FtZS50ZW1wKyspJTQ7XHJcbiAgICAgICAgLy8gdmFyIHRyYWNrID0gMDtcclxuXHJcbiAgICAgICAgLy8gLy9UT0RPIOiaiuWtkOeahOWIneWni+WMlnnlnZDmoIfvvIzmoLnmja7ovajov7nkuqfnlJ/kuI3lkIznmoR5XHJcbiAgICAgICAgLy8gdmFyIG5ld0Jvc3NQb3NZID0gMDtcclxuICAgICAgICBcclxuICAgICAgICAvLyB3ZW56aS5zZXRQb3NpdGlvbihjYy5wKHRoaXMubm9kZS53aWR0aC8yICsgd2VuemkuaGVpZ2h0LzIgKyAxMDAgLCBuZXdCb3NzUG9zWSkpO1xyXG4gICAgICAgIC8vIHdlbnppQ29tLnNldFRyYWNrKHRyYWNrKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQod2VuemkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v6K6w5b2V5b2T5YmN55qE55Sf5oiQ6JqK5a2Q5pWwXHJcbiAgICAgICAgY2MuZ2FtZS5zcGF3bk51bSA9IDE7XHJcbiAgICAgICAgdGhpcy5zcGF3bk9uZSgpO1xyXG5cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmo/mnLrkuqfnlJ/ov5Dliqjovajov7lcclxuICAgICAqL1xyXG4gICAgcmFuZG9tVHJhY2sgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChNYXRoLnJhbmRvbSgpICogNCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py65Lqn55Sf5LiA5Liq6L2o6L+555qE6JqK5a2QLOaUvuWIsOWcuuaZr+S4rVxyXG4gICAgICovXHJcbiAgICBzcGF3bk9uZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB3ZW56aSA9IGNjLmluc3RhbnRpYXRlKHRoaXMud2VuemlQcmVmYWIpO1xyXG5cclxuICAgICAgICB2YXIgd2VuemlDb20gPSB3ZW56aS5nZXRDb21wb25lbnQoXCJ3ZW56aVwiKTtcclxuICAgICAgICB3ZW56aUNvbS5odW1hbiA9IHRoaXMuaHVtYW47XHJcbiAgICAgICAgd2VuemlDb20uYmFjayA9IHRoaXMuYmFjaztcclxuICAgICAgICB3ZW56aUNvbS5wYW51bSA9IHRoaXMucGFudW07XHJcblxyXG4gICAgICAgIC8v6ZqP5py65Lqn55Sf6L2o6L+5XHJcbiAgICAgICAgdmFyIHRyYWNrID0gdGhpcy5yYW5kb21UcmFjaygpO1xyXG4gICAgICAgIC8vVE9ETyDomorlrZDnmoTliJ3lp4vljJZ55Z2Q5qCH77yM5qC55o2u6L2o6L+55Lqn55Sf5LiN5ZCM55qEeVxyXG4gICAgICAgIHZhciBuZXdCb3NzUG9zWSA9IDA7XHJcblxyXG5cclxuICAgICAgICB3ZW56aS5zZXRQb3NpdGlvbihjYy5wKHRoaXMubm9kZS53aWR0aC8yICsgd2VuemkuaGVpZ2h0LzIgKyAxMDAgLCBuZXdCb3NzUG9zWSkpO1xyXG4gICAgICAgIHdlbnppQ29tLnNldFRyYWNrKHRyYWNrKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQod2VuemkpO1xyXG4gICAgfVxyXG5cclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcclxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyAuLi5cclxuICAgICAgICBoYW5kMTp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kMjp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYWNrTm9kZTp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYWZpeDo2LFxyXG4gICAgICAgIGxlZnRQYWRkaW5nOjIyMCxcclxuICAgICAgICByaWdodFBhZGRpbmc6MjBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTA7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJUICwgdGhpcy50b3VjaFN0YXJ0ICwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUgLCB0aGlzLnRvdWNoTW92ZSAsIHRoaXMpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICBwYXBhcGE6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgaGFuZDFZID0gdGhpcy5oYW5kMS55O1xyXG4gICAgICAgIHZhciBoYW5kMlkgPSB0aGlzLmhhbmQyLnk7XHJcbiAgICAgICAgdmFyIGRpcyA9IE1hdGguYWJzKGhhbmQxWSAtIGhhbmQyWSk7XHJcbiAgICAgICAgdGhpcy5oYW5kMS55IC09IChkaXMvMiAtIHRoaXMucGFmaXgpO1xyXG4gICAgICAgIHRoaXMuaGFuZDIueSArPSAoZGlzLzIgLXRoaXMucGFmaXgpO1xyXG4gICAgICAgIC8v5pKt5pS+cGHpn7PmlYhcclxuICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuYnV0dG9uQ29udHJvbENvbS5nYWludCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNjLmdhbWUucGFwYXBhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZDEueSArPSAoZGlzLzIgLSB0aGlzLnBhZml4KTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kMi55IC09IChkaXMvMiAtdGhpcy5wYWZpeCk7XHJcbiAgICAgICAgfSwwLjMpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b3VjaFN0YXJ0IDogZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgfSxcclxuICAgIHRvdWNoTW92ZTpmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgLy/orqHnrpflt6blj7PovrnnlYxcclxuICAgICAgICB2YXIgbGVmdExpbWl0ID0gLXRoaXMuYmFja05vZGUud2lkdGgvMiArIHRoaXMubm9kZS53aWR0aC8yICsgdGhpcy5sZWZ0UGFkZGluZztcclxuICAgICAgICB2YXIgcmlnaHRMaW1pdCA9IHRoaXMuYmFja05vZGUud2lkdGgvMiAtIHRoaXMubm9kZS53aWR0aC8yIC0gdGhpcy5yaWdodFBhZGRpbmc7XHJcblxyXG4gICAgICAgIGxldCBwcmV2UG9pbnQgPSBldmVudC5nZXRQcmV2aW91c0xvY2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGxldCBwb2ludCA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGxldCBkaXNYID0gcG9pbnQueCAtIHByZXZQb2ludC54O1xyXG5cclxuICAgICAgICB2YXIgd2lsbFggPSB0aGlzLm5vZGUueCArIGRpc1g7XHJcbiAgICAgICAgaWYod2lsbFggPD0gbGVmdExpbWl0KXtcclxuICAgICAgICAgICAgd2lsbFggPSBsZWZ0TGltaXQ7XHJcbiAgICAgICAgfWVsc2UgaWYod2lsbFggPj0gcmlnaHRMaW1pdCl7XHJcbiAgICAgICAgICAgIHdpbGxYID0gcmlnaHRMaW1pdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS54ID0gd2lsbFg7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgaGFuZDp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYWNrOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvcHBhZGRpbmc6MzAsXHJcbiAgICAgICAgZG93blBhZGRpbmc6NDBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5nYW1lLmhhbmRNb3ZlQnkgPSA2MDtcclxuICAgICAgICBjYy5nYW1lLmRvd25Nb3ZlQnkgPSAyO1xyXG5cclxuICAgICAgICAgLy8g5L2/55So5p6a5Li+57G75Z6L5p2l5rOo5YaMXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgLy/mkq3mlL5oYW5k5LiK56e75Yqo55S7XHJcbiAgICAgICAgICAgIHZhciBhbmkgPSB0aGlzLmhhbmQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW92ZUJ5TGltaXQgPSB0aGlzLmJhY2suaGVpZ2h0LzIgLSB0aGlzLnRvcHBhZGRpbmcgLSB0aGlzLmhhbmQuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaGFuZC55IDwgbW92ZUJ5TGltaXQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdmVCeURpcyA9ICh0aGlzLmhhbmQueSArIGNjLmdhbWUuaGFuZE1vdmVCeSA+PSBtb3ZlQnlMaW1pdCkgPyAobW92ZUJ5TGltaXQgLSB0aGlzLmhhbmQueSkgOiBjYy5nYW1lLmhhbmRNb3ZlQnk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uYnkgPSBjYy5tb3ZlQnkoMC4yLDAsbW92ZUJ5RGlzKTtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC41LCAyMDAsIDApLCBjYy5tb3ZlQnkoMC41LCAtMjAwLCAwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmQucnVuQWN0aW9uKGFjdGlvbmJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmkucGxheShcImhhbmRhbmlcIik7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHZhciBkb3duTGltaXQgPSAtdGhpcy5iYWNrLmhlaWdodC8yICsgdGhpcy5oYW5kLmhlaWdodC8yICsgdGhpcy5kb3duUGFkZGluZztcclxuICAgICAgICB2YXIgZG93bkRpcyA9ICh0aGlzLmhhbmQueSAtIGNjLmdhbWUuZG93bk1vdmVCeSA8PSBkb3duTGltaXQpID8gMCA6IGNjLmdhbWUuZG93bk1vdmVCeTtcclxuICAgICAgICB0aGlzLmhhbmQueSAtPSBkb3duRGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcclxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyAuLi5cclxuICAgICAgICBoYW5kOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g5L2/55So5p6a5Li+57G75Z6L5p2l5rOo5YaMXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5wYXBhcGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmQuZ2V0Q29tcG9uZW50KFwiaGFuZFwiKS5wYXBhcGEoKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbW91dGg6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlOb3JtYWwoKTtcclxuICAgICAgICB9LCAzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcGxheU5vcm1hbCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxlZnRSb2xlQW5pID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG5cclxuICAgICAgICB2YXIgbW91dGhBbmkgPSB0aGlzLm1vdXRoLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIG1vdXRoQW5pLnBsYXkoXCJtb3V0aG5vcm1hbFwiKTtcclxuICAgICAgICBsZWZ0Um9sZUFuaS5wbGF5KFwibm9ybWFsXCIpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIFxyXG4gICAgICAgIHRyYWNrIDogMCxcclxuICAgICAgICBiYWNrIDoge1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaHVtYW4gOiB7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZWZ0UGFkZGluZyA6IDYwLFxyXG4gICAgICAgIGxpbWl0IDogZmFsc2UsXHJcbiAgICAgICAgeXBvczowLFxyXG4gICAgICAgIHpoZXhpYW5GbGFnOjEsXHJcbiAgICAgICAgemhleGlhbkxpbWl0IDogNjAsXHJcblxyXG4gICAgICAgIGhhbmQxOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kMjp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZCA6IHtcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwYW51bSA6IHtcclxuICAgICAgICAgICAgdHlwZSA6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkZWZhdWx0IDogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vQWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnlwb3MgPSB0aGlzLm5vZGUueTtcclxuXHJcbiAgICAgICAgLy/ojrflj5ZoYW5kMeWSjGhhbmQyXHJcbiAgICAgICAgdGhpcy5oYW5kMSA9IGNjLmZpbmQoXCJDYW52YXMvYmFjay9oYW5kL2hhbmQxXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmQyID0gY2MuZmluZChcIkNhbnZhcy9iYWNrL2hhbmQvaGFuZDJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZCA9IGNjLmZpbmQoXCJDYW52YXMvYmFjay9oYW5kXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUcmFjayA6IGZ1bmN0aW9uKHRyYWNrKXtcclxuICAgICAgICB0aGlzLnRyYWNrID0gdHJhY2s7XHJcbiAgICB9LFxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBzd2l0Y2godGhpcy50cmFjayl7XHJcbiAgICAgICAgICAgIGNhc2UgMDovL+ebtOe6v1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5lKGR0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6Ly9zaW5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2luKGR0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVZlbG9jaXR5TGluZShkdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOi8v5oqY57q/XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpoZXhpYW4oZHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5saW1pdCAmJiB0aGlzLm5vQWN0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5ub0FjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmZpZ2h0SHVtYW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8v5ZCE56eN6L2o6L+555qE5Ye95pWwXHJcbiAgICAvL+ebtOe6v1xyXG4gICAgbGluZSA6IGZ1bmN0aW9uKGR0KXtcclxuICAgICAgICBpZighdGhpcy5saW1pdCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54IDwgLXRoaXMuYmFjay53aWR0aC8yICsgdGhpcy5ub2RlLndpZHRoLzIgKyB0aGlzLmh1bWFuLndpZHRoLzIgKyB0aGlzLmxlZnRQYWRkaW5nKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGltaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIHNpbiA6IGZ1bmN0aW9uKGR0KXtcclxuICAgICAgICBpZighdGhpcy5saW1pdCl7XHJcbiAgICAgICAgICAgIHZhciB3aWxsWCA9IHRoaXMubm9kZS54IC0gNTtcclxuICAgICAgICAgICAgdmFyIHdpbGxZID0gTWF0aC5zaW4od2lsbFgvNjApKjcwO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHdpbGxYO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHdpbGxZO1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUueCA8IC10aGlzLmJhY2sud2lkdGgvMiArIHRoaXMubm9kZS53aWR0aC8yICsgdGhpcy5odW1hbi53aWR0aC8yICsgdGhpcy5sZWZ0UGFkZGluZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgLy/mlLnlj5jpgJ/luqbovajov7nvvIjnm7Tnur/vvIlcclxuICAgIGNoYW5nZVZlbG9jaXR5TGluZSA6IGZ1bmN0aW9uKGR0KXtcclxuICAgICAgICBpZighdGhpcy5saW1pdCl7XHJcbiAgICAgICAgICAgIGlmKGNjLmdhbWUuY2hhbmdlVmVsb2NpdHlMaW5lRmxhZyl7Ly/lt7Lnu4/lnKjliqDpgJ8s6K6w5b2V5pe26Ze0XHJcbiAgICAgICAgICAgICAgICBpZighY2MuZ2FtZS5jaGFuZ2VWZWxvY2l0eUxpbmVUaW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5jaGFuZ2VWZWxvY2l0eUxpbmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihjYy5nYW1lLmNoYW5nZVZlbG9jaXR5TGluZVRpbWUgPCAwLjQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDE0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuY2hhbmdlVmVsb2NpdHlMaW5lVGltZSArPSBkdDtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuY2hhbmdlVmVsb2NpdHlMaW5lVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5jaGFuZ2VWZWxvY2l0eUxpbmVGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7Ly/msqHmnInliqDpgJ/vvIzorqHnrpfpmo/mnLrmlbDvvIzliKTmlq3mmK/lkKbopoHliqDpgJ9cclxuICAgICAgICAgICAgICAgIHZhciByYW5kb21DID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgICAgIGlmKHJhbmRvbUMgPCAwLjA0KXsvL+WKoOmAnzFzXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5jaGFuZ2VWZWxvY2l0eUxpbmVGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNley8v5LiN5Yqg6YCf77yM5q2j5bi46aOe6KGMXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gNztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnggPCAtdGhpcy5iYWNrLndpZHRoLzIgKyB0aGlzLm5vZGUud2lkdGgvMiArIHRoaXMuaHVtYW4ud2lkdGgvMiArIHRoaXMubGVmdFBhZGRpbmcpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saW1pdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5oqY57q/XHJcbiAgICB6aGV4aWFuIDogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIGlmKCF0aGlzLmxpbWl0KXtcclxuICAgICAgICAgICAgdmFyIHdpbGxYID0gdGhpcy5ub2RlLnggLSA2O1xyXG4gICAgICAgICAgICB2YXIgd2lsbFkgPSB0aGlzLm5vZGUueSArICgzICogdGhpcy56aGV4aWFuRmxhZyk7XHJcbiAgICAgICAgICAgIGlmKE1hdGguYWJzKHdpbGxZIC0gdGhpcy55cG9zKSA+IHRoaXMuemhleGlhbkxpbWl0KXtcclxuICAgICAgICAgICAgICAgIHZhciB3aWxsWSA9IHRoaXMueXBvcyArIHRoaXMuemhleGlhbkxpbWl0ICogKHRoaXMuemhleGlhbkZsYWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56aGV4aWFuRmxhZyA9IC0odGhpcy56aGV4aWFuRmxhZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSB3aWxsWDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSB3aWxsWTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54IDwgLXRoaXMuYmFjay53aWR0aC8yICsgdGhpcy5ub2RlLndpZHRoLzIgKyB0aGlzLmh1bWFuLndpZHRoLzIgKyB0aGlzLmxlZnRQYWRkaW5nKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGltaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgXHJcbiAgICAvL+i2hei/h+W3puS+p+eVjOmZkO+8jOacneS6uueJqemjnue/lFxyXG4gICAgZmlnaHRIdW1hbiA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2MuZ2FtZS5jdXJyZW50UGFTcGF3bk51bSA9IDA7XHJcblxyXG4gICAgICAgIHZhciBodW1hblggPSB0aGlzLmh1bWFuLng7XHJcbiAgICAgICAgdmFyIGh1bWFuWSA9IHRoaXMuaHVtYW4ueTtcclxuICAgICAgICB2YXIgZmlnaHRBY3Rpb24gPSBjYy5tb3ZlVG8oMSxodW1hblgsaHVtYW5ZKTtcclxuICAgICAgICB2YXIgYWN0aW9uV2l0aENhbGwgPSBjYy5zZXF1ZW5jZShmaWdodEFjdGlvbixjYy5jYWxsRnVuYyh0aGlzLmFjdGlvbkZpbmlzaCx0aGlzLG51bGwpKTtcclxuICAgICAgICAvL+iuoeeul+inkuW6plxyXG4gICAgICAgIHZhciBkaXNYID0gTWF0aC5hYnMoaHVtYW5YIC0gdGhpcy5ub2RlLngpO1xyXG4gICAgICAgIHZhciBkaXNZID0gTWF0aC5hYnMoaHVtYW5ZIC0gdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgIHZhciByb3RhdGlvbiA9IE1hdGguYXRhbihkaXNZL2Rpc1gpICogKDE4MC9NYXRoLlBJKTtcclxuICAgICAgICBpZih0aGlzLm5vZGUueSA+IGh1bWFuWSl7Ly/lnKjkuIrvvIzlj43ovaxcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gLXJvdGF0aW9uO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubm9kZS55IDwgaHVtYW5ZKXsvL+WcqOS4i++8jOato+i9rFxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbldpdGhDYWxsKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDomorlrZDooqvmi43mrbss6K6h5YiGXHJcbiAgICAgKi9cclxuICAgIGFjdGlvbkZpbmlzaCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/lsIbmi43mrbvnmoTomorlrZDnp7vpmaRcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIC8v6K6h5YiGXHJcbiAgICAgICAgdmFyIHByZU51bSA9IHRoaXMucGFudW0uc3RyaW5nO1xyXG4gICAgICAgIGlmKHByZU51bSl7XHJcbiAgICAgICAgICAgIHRoaXMucGFudW0uc3RyaW5nID0gcGFyc2VJbnQocHJlTnVtKSArIDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGFudW0uc3RyaW5nID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZ2FtZS5wYW51bSA9IHBhcnNlSW50KHRoaXMucGFudW0uc3RyaW5nKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+eisOaSnuWbnuiwg1xyXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XHJcbiAgICAgICAgdmFyIGhhbmRYID0gdGhpcy5oYW5kLng7XHJcbiAgICAgICAgdmFyIGhhbmR5ID0gdGhpcy5oYW5kLnk7XHJcblxyXG4gICAgICAgIC8v5Yik5patb2h0ZXIoaGFuZCnnmoTlnZDmoIfvvIzmmK/lkKbooqvlkqxcclxuICAgICAgICAvL+WPqumcgOWIpOaWreiaiuWtkOaYr+WcqOaJi+S4i+i+ue+8jOS4remXtO+8jOS4iui+uSDljbPlj6/ljLrliIZcclxuICAgICAgICB2YXIgd2VuemkgPSBzZWxmLm5vZGU7XHJcbiAgICAgICAgdmFyIHdlbnppWCA9IHdlbnppLng7XHJcbiAgICAgICAgdmFyIHdlbnppWSA9IHdlbnppLnk7XHJcblxyXG4gICAgICAgIHZhciBjb2xsaXNpb25IYW5kID0gb3RoZXIubm9kZTtcclxuICAgICAgICB2YXIgY29sbGlzaW9uSGFuZFggPSBjb2xsaXNpb25IYW5kLng7XHJcbiAgICAgICAgdmFyIGNvbGxpc2lvbkhhbmRZID0gY29sbGlzaW9uSGFuZC55O1xyXG5cclxuICAgICAgICB2YXIgaGFuZDFYID0gdGhpcy5oYW5kMS54ICsgaGFuZFg7XHJcbiAgICAgICAgdmFyIGhhbmQxWSA9IHRoaXMuaGFuZDEueSArIGhhbmR5O1xyXG5cclxuICAgICAgICB2YXIgaGFuZDJYID0gdGhpcy5oYW5kMi54ICsgaGFuZFg7XHJcbiAgICAgICAgdmFyIGhhbmQyWSA9IHRoaXMuaGFuZDIueSArIGhhbmR5O1xyXG5cclxuICAgICAgICB2YXIgd2VuemlMZWZ0WCA9ICB3ZW56aVggLSBzZWxmLm5vZGUud2lkdGgvMjtcclxuICAgICAgICB2YXIgaGFuZFJpZ2h0WCA9IGhhbmQxWCArIHRoaXMuaGFuZDEud2lkdGgvMjtcclxuXHJcbiAgICAgICAgaWYoTWF0aC5hYnMoaGFuZFJpZ2h0WCAtIHdlbnppTGVmdFgpIDw9IDEwKXsvL+WcqOaJi+WPs+S+pyzlkqzliLDmiYvovrnnvJhcclxuICAgICAgICAgICAgY2MuZ2FtZS5jdXJyZW50UGFTcGF3bk51bSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuYml0ZSgpO1xyXG4gICAgICAgIH1lbHNlIGlmKHdlbnppWSA8IGhhbmQyWSl7Ly/lnKjmiYvkuItcclxuICAgICAgICAgICAgLy/miYvlj5jlpKfvvIzlj5jmsolcclxuICAgICAgICAgICAgY2MuZ2FtZS5jdXJyZW50UGFTcGF3bk51bSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuYml0ZSgpO1xyXG4gICAgICAgIH1lbHNlIGlmKGhhbmQyWSA8IHdlbnppWSA8IGhhbmQxWSl7Ly/miYvkuK1cclxuICAgICAgICAgICAgLy8gdGhpcy5hY3Rpb25GaW5pc2goKTtcclxuICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbmi43miYs/XHJcbiAgICAgICAgICAgIGlmKGNjLmdhbWUucGFwYXBhKXsvL+aLjeatu1xyXG4gICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbmmK/lpJrov57llaos5aaC5p6c5pivLOi/kOihjOWKqOeUu+aViOaenFxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNjLmdhbWUuc3Bhd25OdW0gPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmN1cnJlbnRQYVNwYXduTnVtID0gIWNjLmdhbWUuY3VycmVudFBhU3Bhd25OdW0gPyAwIDogY2MuZ2FtZS5jdXJyZW50UGFTcGF3bk51bTsvL+W9k+WJjeeahOWkmuWVqiAg5ZWq5q2755qE5Liq5pWwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNjLmdhbWUuY3VycmVudFBhU3Bhd25OdW0gPSBjYy5nYW1lLnNwYXduTnVtKXsvL+S6p+eUn+S6huWkmuWVquaViOaenFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmN1cnJlbnRQYVNwYXduTnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGNjLmdhbWUuc3Bhd25OdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETyDkuqfnlJ8y6L+e5ZWq5pWI5p6cXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETyDkuqfnlJ8z6L+e5ZWq5pWI5p6cXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETyDkuqfnlJ806L+e5ZWq5pWI5p6cXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuY3VycmVudFBhU3Bhd25OdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25GaW5pc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNley8v5Zyo5omL5LiKXHJcbiAgICAgICAgICAgIC8v5omL5Y+Y5aSn77yM5Y+Y5rKJXHJcbiAgICAgICAgICAgIGNjLmdhbWUuY3VycmVudFBhU3Bhd25OdW0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmJpdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBiaXRlIDogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIHZhciB3aWxsU2NhbGVZMSA9IHRoaXMuaGFuZDEuc2NhbGVZICogMS42O1xyXG4gICAgICAgIHZhciB3aWxsU2NhbGVZMiA9IHRoaXMuaGFuZDEuc2NhbGVZICogMS42O1xyXG4gICAgICAgIHdpbGxTY2FsZVkxID0gd2lsbFNjYWxlWTEgPj0gMyA/IDMgOiB3aWxsU2NhbGVZMTtcclxuICAgICAgICB3aWxsU2NhbGVZMiA9IHdpbGxTY2FsZVkyID49IDMgPyAzIDogd2lsbFNjYWxlWTI7XHJcbiAgICAgICAgdGhpcy5oYW5kMS5zY2FsZVkgPSB3aWxsU2NhbGVZMTtcclxuICAgICAgICB0aGlzLmhhbmQyLnNjYWxlWSA9IHdpbGxTY2FsZVkyO1xyXG5cclxuICAgICAgICB2YXIgd2lsbFdlaWdodCA9IGNjLmdhbWUuZG93bk1vdmVCeSAqIDEuNTtcclxuICAgICAgICB3aWxsV2VpZ2h0ID0gKHdpbGxXZWlnaHQgPiA2KSA/IDYgOiB3aWxsV2VpZ2h0O1xyXG4gICAgICAgIGNjLmdhbWUuZG93bk1vdmVCeSA9IHdpbGxXZWlnaHQ7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9