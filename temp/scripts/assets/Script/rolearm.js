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