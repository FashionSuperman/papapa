cc.Class({
    extends: cc.Component,

    properties: {
        mouth:{
            type:cc.Node,
            default:null
        }
    },

    // use this for initialization
    onLoad: function () {
        this.schedule(function() {
            this.playNormal();
        }, 3);
    },

    // called every frame
    update: function (dt) {

    },

    playNormal : function(){
        var leftRoleAni = this.node.getComponent(cc.Animation);

        var mouthAni = this.mouth.getComponent(cc.Animation);
        mouthAni.play("mouthnormal");
        leftRoleAni.play("normal");
    }
});
