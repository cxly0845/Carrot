var MMMainLayer = cc.Layer.extend({
    actionDuration : 1,             // 时间参考[怪物、萝卜、云朵等]
    upLock : null,
    isUpUnlock : "",

    ctor : function(){
        this._super();
        // 加载[配置]
        this.loadConfig();
        // 加载[菜单]开始冒险和天天向上
        this.loadMenu();
        // 加载[设置]
        this.loadSet();
        // 加载[帮助]
        this.loadHelp();
        // 加载[怪物]底部1号和3号怪
        this.loadBackMonster();
        // 加载[云朵]底部遮挡在1号、3号以及6号怪之前的云朵
        this.loadBackSmoke();
        // 加载[怪物]前面5号怪
        this.loadForeMonster();
        // 加载[云朵]前面遮罩在5号怪身上
        this.loadForeSmoke();
        // 加载[萝卜]
        this.loadCarrot();
        // 加载[前景]
        this.loadForeground();
        // 注册[事件]
        this.registerEvent();

        return true;
    },
    loadConfig : function(){
        //测试用，启动游戏时，向保存文件写入NO，开启加锁
        //cc.sys.localStorage.setItem(Config.IS_UP_UNLOCK_KEY, "NO");
        // 是否已经解锁了“天天向上”
        this.isUpUnlock = cc.sys.localStorage.getItem(Config.IS_UP_UNLOCK_KEY) || "NO";

    },
    loadMenu : function(){
        //开始冒险
        var startNormal = new cc.Sprite(res.start_normal_png);
        var startPress = new cc.Sprite(res.start_pressed_png);
        var startDisabled = new cc.Sprite(res.start_normal_png);
        var start = new cc.MenuItemSprite(
            startNormal,
            startPress,
            startDisabled,
            function(){
                cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                cc.log("点击【开始冒险】按钮");
                cc.director.runScene(new ChooseLevelScene());
            }.bind(this));
        start.setPosition(cc.winSize.width / 2 - 8,cc.winSize.height /2 + 75);

        //天天向上
        var floorNormal = new cc.Sprite(res.floor_normal_png);
        var floorPress = new cc.Sprite(res.floor_pressed_png);
        var floorDisabled = new cc.Sprite(res.floor_normal_png);
        var floor = new cc.MenuItemSprite(
            floorNormal,
            floorPress,
            floorDisabled,
            function(){
                cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                if (this.isUpUnlock == "NO") {
                    // 分发事件[打开解锁面板]
                    cc.eventManager.dispatchEvent(new cc.EventCustom(jf.EventName.OPEN_UNLOCK_UP_LAYER));
                }
                else {
                    cc.log("TODO: 实现【天天向上】按钮功能");
                }
            }.bind(this));
        floor.setPosition(cc.winSize.width / 2 - 8,cc.winSize.height / 2 - 45);

        if (this.isUpUnlock == "NO") {
            var upLock = new cc.Sprite(res.front_btn_floor_locked_png);
            floor.addChild(upLock);
            this.upLock = upLock;
            upLock.setPosition(floor.width + 5, floor.height / 2 + 25);
        }

        var menu = new cc.Menu(start,floor);
        this.addChild(menu);
        menu.setPosition(0,0);
    },
    loadSet : function(){
        var setBg = new cc.Sprite(res.front_monster4_png);
        this.addChild(setBg);
        setBg.setPosition(cc.winSize.width / 2 - 350,490);

        //上下移动
        var moveBy1 = cc.moveBy(this.actionDuration,cc.p(0,-10));
        var moveBy2 = cc.moveBy(this.actionDuration,cc.p(0,10));
        var seq = cc.sequence(moveBy1,moveBy2);
        var action = seq.repeatForever();
        setBg.runAction(action);

        var set = new cc.Sprite(res.front_btn_setting_normal_png);
        setBg.addChild(set);
        set.setPosition(157,80);
    },
    loadHelp : function(){
        var helpBg = new cc.Sprite(res.front_monster_6_hand_png);
        this.addChild(helpBg);
        helpBg.setPosition(cc.winSize.width / 2 + 270,270);

        //左右摆动
        var rotateBy1 = cc.rotateBy(this.actionDuration * 0.8,-5);
        var rotateBy2 = cc.rotateBy(this.actionDuration * 0.8, 5);
        var seq = cc.sequence(rotateBy1,rotateBy2);
        var action = seq.repeatForever();
        helpBg.runAction(action);

        var help = new cc.Sprite(res.front_btn_help_normal_png);
        helpBg.addChild(help);
        help.setPosition(155,365);

        var helpBody = new cc.Sprite(res.front_monster6_png);
        this.addChild(helpBody);
        helpBody.setPosition(cc.winSize.width / 2 + 400, 280);

        // 上下移动
        var helpBodyMoveBy1 = cc.moveBy(this.actionDuration * 2, cc.p(0, 5));
        var helpBodyMoveBy2 = cc.moveBy(this.actionDuration * 2, cc.p(0, -5));
        var helpBodySeq = cc.sequence(helpBodyMoveBy1, helpBodyMoveBy2);
        var helpBodyAction = helpBodySeq.repeatForever();
        helpBody.runAction(helpBodyAction);
    },
    loadBackMonster : function(){
        var leftYellow = new cc.Sprite(res.front_monster3_png);
        this.addChild(leftYellow);
        leftYellow.setPosition(cc.winSize.width / 2 - 360, 220);

        // 上下移动
        var yellowMoveBy1 = cc.moveBy(this.actionDuration * 0.8, cc.p(0, 5));
        var yellowMoveBy2 = cc.moveBy(this.actionDuration * 0.8, cc.p(0, -5));
        var yellowSeq = cc.sequence(yellowMoveBy1, yellowMoveBy2);
        var yellowAction = yellowSeq.repeatForever();
        leftYellow.runAction(yellowAction);


        var leftGreen = new cc.Sprite(res.front_monster1_png);
        this.addChild(leftGreen);
        leftGreen.setPosition(cc.winSize.width / 2 - 300, 185);

        // 左右移动
        var greenMoveBy1 = cc.moveBy(this.actionDuration * 0.7, cc.p(-3, 0));
        var greenMoveBy2 = cc.moveBy(this.actionDuration * 0.7, cc.p(3, 0));
        var greenSeq = cc.sequence(greenMoveBy1, greenMoveBy2);
        var greenAction = greenSeq.repeatForever();
        leftGreen.runAction(greenAction);

    },
    loadBackSmoke : function(){
        var left = new cc.Sprite(res.front_smoke1_png);
        this.addChild(left);
        left.setPosition(cc.winSize.width / 2 - 410, 188);

        var right = new cc.Sprite(res.front_smoke3_png);
        this.addChild(right);
        right.setPosition(cc.winSize.width / 2 + 405, 190);

    },
    loadForeMonster : function(){
        var rightYellow = new cc.Sprite(res.front_monster5_png);
        this.addChild(rightYellow);
        rightYellow.setPosition(cc.winSize.width / 2 + 290, 185);

        // 左右移动
        var yellowMoveBy1 = cc.moveBy(this.actionDuration * 0.85, cc.p(-3, 0));
        var yellowMoveBy2 = cc.moveBy(this.actionDuration * 0.85, cc.p(3, 0));
        var yellowSeq = cc.sequence(yellowMoveBy1, yellowMoveBy2);
        var greenAction = yellowSeq.repeatForever();
        rightYellow.runAction(greenAction);

        var leftCambridgeBlue = new cc.Sprite(res.front_monster2_png);
        this.addChild(leftCambridgeBlue);
        leftCambridgeBlue.setPosition(cc.winSize.width / 2 - 300, 150);

        // 上下移动
        var action0 = cc.moveTo(this.actionDuration * 0.2, cc.p(cc.winSize.width / 2 - 220, 170),null);
        var action1 = cc.sequence(action0, cc.callFunc(function () {
            var blueMoveBy1 = cc.moveBy(this.actionDuration * 0.55, cc.p(0, -5));
            var blueMoveBy2 = cc.moveBy(this.actionDuration * 0.55, cc.p(0, 5));
            var blueSeq = cc.sequence(blueMoveBy1, blueMoveBy2);
            var blueAction = blueSeq.repeatForever();
            leftCambridgeBlue.runAction(blueAction);
        }, this));
        leftCambridgeBlue.runAction(action1);
    },
    loadForeSmoke : function(){
        var node = new cc.Sprite(res.front_smoke2_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2 + 320, 150);
    },
    loadCarrot : function(){
        var node = new cc.Sprite(res.front_carrot_png);
        this.addChild(node);

        // 萝卜，贝塞尔曲线 + 缩放运动
        node.setScale(0.7);
        node.setPosition(cc.winSize.width / 2 + 320, 120);
        var controlPointsTo = [
            cc.p(cc.winSize.width / 2 + 400, 100),
            cc.p(cc.winSize.width / 2 + 120, 0),
            cc.p(cc.winSize.width / 2 + 100, 20)];
        var bezierTo = cc.bezierTo(this.actionDuration * 0.8, controlPointsTo);
        var scaleTo = cc.scaleTo(this.actionDuration * 0.8, 1);
        var spawn = cc.spawn(bezierTo, scaleTo);
        node.runAction(spawn);
    },
    loadForeground : function(){
        var node = new cc.Sprite(res.front_front_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    registerEvent : function(){
        var listener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,
            eventName   : jf.EventName.UNLOCK_UP,
            callback    : this.onUnLockUp
        });
        cc.eventManager.addListener(listener, this);
    },
    // 解锁天天向上
    onUnLockUp : function(event){
        var target = event.getCurrentTarget();
        var data = event.getUserData();
        if (data.isSuccess !== undefined && data.isSuccess) {
            // 数据保存[解锁成功]
            cc.sys.localStorage.setItem(Config.IS_UP_UNLOCK_KEY, "YES");
            target.isUpUnlock = "YES";
            target.upLock.removeFromParent();
        }
    }
});