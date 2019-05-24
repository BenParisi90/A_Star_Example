var MazeModel = require("MazeModel");
var MazeView = require("MazeView");
var MazeSolver = require("MazeSolver");
var CharacterController = require("CharacterController");

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
        },

        characterController:{
            default:null,
            type:CharacterController
        },

        playButton:{
            default:null,
            type:cc.Node
        }
    },

    ctor: function(){
        this.state = "idle";
        this.loadMazeComplete = function(){
            this.mazeView.renderMaze();
            this.mazeSolver.solveMaze(this);
        }

        this.solveMazeComplete = function(characterPath){
            this.characterController.beginCharacterAnimation(characterPath);
        }
    },
    
    start () {
        this.playButton.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            this.playButton.active = false;
            this.mazeModel.loadMaze("resources/maze.txt", this);
          }, this);
    }
});
