var MMBackgroundLayer = cc.Layer.extend({
    ctor : function(){
        this._super();

        this.loadBackgound();
        return true;
    },
    loadBackgound : function(){
        var sprite = new cc.Sprite(res.front_bg_png);
        this.addChild(sprite);
        sprite.setPosition(cc.winSize.width / 2,cc.winSize.height / 2);
    },
});