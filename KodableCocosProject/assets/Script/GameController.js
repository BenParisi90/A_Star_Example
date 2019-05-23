var MazeModel = require("MazeModel");
var MazeView = require("MazeView");

cc.Class({
    extends: cc.Component,

    properties: {
        mazeModel:{
            default:null,
            type: MazeModel
        },

        mazeView:{
            default:null,
            type: MazeView
        }
    },

    ctor: function(){
        this.loadMazeComplete = function(){
            this.mazeView.renderMaze();
        }
    },
    
    start () {

        this.mazeModel.loadMaze("resources/maze.txt", this);
    }
});
