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
        mainrole: {
            type: cc.Node,
            default: null
        },
        leftPadding: 80,
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
        },
        banana: {
            type: cc.Node,
            default: null
        },
        eyeLeft: {
            type: cc.Node,
            default: null
        },
        eyeRight: {
            type: cc.Node,
            default: null
        },
        mouth: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.noAction = true;
        this.ypos = this.node.y;

        this.human = cc.find("Canvas/back/mainrole/role_body");

        this.mainrole = cc.find("Canvas/back/mainrole");

        //获取hand1和hand2
        this.hand1 = cc.find("Canvas/back/hand/hand1");

        this.hand2 = cc.find("Canvas/back/hand/hand2");

        this.hand = cc.find("Canvas/back/hand");

        this.banana = cc.find("Canvas/back/mainrole/banana");

        this.eyeLeft = cc.find("Canvas/back/mainrole/role_body/role_eye_left");
        this.eyeRight = cc.find("Canvas/back/mainrole/role_body/role_eye_right");

        this.mouth = cc.find("Canvas/back/mainrole/role_body/mouth");
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

        // var humanX = this.human.x;
        // var humanY = this.human.y;

        var humanX = this.mainrole.x;
        var humanY = this.mainrole.y;

        var fightAction = cc.moveTo(1, humanX, humanY);
        var actionWithCall = cc.sequence(fightAction, cc.callFunc(this.removeWezi, this, null));
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
        // this.scheduleOnce(this.changeAniStatus, 0.4);
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

    removeWezi: function removeWezi() {
        //将拍死的蚊子移除
        cc.game.anistop = true;

        this.node.removeFromParent();
        var bananaAni = this.banana.getComponent(cc.Animation);
        var eyeLeftAni = this.eyeLeft.getComponent(cc.Animation);
        var eyeRightAni = this.eyeRight.getComponent(cc.Animation);
        var mouthAni = this.mouth.getComponent(cc.Animation);

        bananaAni.play("bananaRotation");
        eyeLeftAni.play("eyeleft");
        eyeRightAni.play("eyeright");
        mouthAni.play("mouth");
    },

    changeAniStatus: function changeAniStatus(dt) {
        cc.game.anistop = false;
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