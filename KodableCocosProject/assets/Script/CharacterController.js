var MazeView = require("MazeView");
var MazeModel = require("MazeModel");

cc.Class({
    extends: cc.Component,

    properties: {
        timeToMoveOneUnit: .5,

        characterNode:{
            default:null,
            type:cc.Node
        },

        mazeView:{
            default:null,
            type:MazeView
        },

        mazeModel:{
            default:null,
            type:MazeModel
        }
    },

    ctor: function(){
        this.characterIndex = 0;
        this.path = [];
        this.beginCharacterAnimation = function(characterPath)
        {
            this.path = characterPath;
            this.characterIndex = this.path.length - 1;
            this.moveCharacter();
        };

        this.moveCharacter = function(){
            this.characterIndex--;
            var targetNode = this.path[this.characterIndex];
            if(this.characterIndex >= 0)
            {
                var targetPos = cc.v2(targetNode.col * this.mazeView.nodeWidth, -targetNode.row * this.mazeView.nodeWidth);
                cc.tween(this.characterNode)
                    .to(this.timeToMoveOneUnit, { position: targetPos})
                    // This callback function is not called until the preceding action has been performed
                    .call(() => { 
                        cc.callFunc(this.moveCharacter());
                    })
                    .start()
            }
            else
            {
                console.log("character movement complete");
            }
            
        };
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
