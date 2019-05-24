var MazeView = require("MazeView");

cc.Class({
    extends: cc.Component,

    properties: {
        characterNode:{
            default:null,
            type:cc.Node
        },

        mazeView:{
            default:null,
            type:MazeView
        }
    },

    ctor: function(){
        this.characterIndex = 0;
        this.path = [];
        this.beginCharacterAnimation = function(characterPath)
        {
            this.path = characterPath;
            this.moveChacter();
        };

        this.moveChacter = function(){
            this.characterIndex ++;
            var targetNode = this.path[this.characterIndex];
            var targetPos = cc.v2(targetNode.col * this.mazeView.nodeWidth, targetNode.row * this.mazeView.nodeWidth);
            console.log("move character");
        };
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
