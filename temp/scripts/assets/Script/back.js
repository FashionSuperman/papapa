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