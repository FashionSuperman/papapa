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
        hand:{
            type:cc.Node,
            default:null
        },
        back:{
            type:cc.Node,
            default:null
        },
        toppadding:30,
        downPadding:40
    },

    // use this for initialization
    onLoad: function () {
        cc.game.handMoveBy = 60;
        cc.game.downMoveBy = 2;

         // 使用枚举类型来注册
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //播放hand上移动画
            var ani = this.hand.getComponent(cc.Animation);

            var moveByLimit = this.back.height/2 - this.toppadding - this.hand.height/2;
            if(this.hand.y < moveByLimit){
                var moveByDis = (this.hand.y + cc.game.handMoveBy >= moveByLimit) ? (moveByLimit - this.hand.y) : cc.game.handMoveBy;
                var actionby = cc.moveBy(0.2,0,moveByDis);
                // var seq = cc.sequence(cc.moveBy(0.5, 200, 0), cc.moveBy(0.5, -200, 0));
                this.hand.runAction(actionby);
            }
            ani.play("handani");
        }, this);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var downLimit = -this.back.height/2 + this.hand.height/2 + this.downPadding;
        var downDis = (this.hand.y - cc.game.downMoveBy <= downLimit) ? 0 : cc.game.downMoveBy;
        this.hand.y -= downDis;
    },

    
});
