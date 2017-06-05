"use strict";
cc._RF.push(module, '65bcblzPkhDxZsVgsJEL8T3', 'back');
// Script\back.js

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
        var wenzi = cc.instantiate(this.wenziPrefab);

        var wenziCom = wenzi.getComponent("wenzi");
        wenziCom.human = this.human;
        wenziCom.back = this.back;

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