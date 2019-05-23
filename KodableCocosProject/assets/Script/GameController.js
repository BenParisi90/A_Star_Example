var MazeModel = require("MazeModel");
var MazeView = require("MazeView");
var MazeSolver = require("MazeSolver");

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
        },

        mazeSolver:{
            default:null,
            type: MazeSolver
        }
    },

    ctor: function(){
        this.loadMazeComplete = function(){
            this.mazeView.renderMaze();
            this.mazeSolver.solveMaze();
        }
    },
    
    start () {

        this.mazeModel.loadMaze("resources/maze.txt", this);
    }
});
