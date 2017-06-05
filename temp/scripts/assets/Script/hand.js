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