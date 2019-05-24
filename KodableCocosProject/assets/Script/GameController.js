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
        }
    },

    ctor: function(){
        this.loadMazeComplete = function(){
            this.mazeView.renderMaze();
            this.mazeSolver.solveMaze(this);
        }

        this.solveMazeComplete = function(characterPath){
            console.log("game controller - path complete");
            this.characterController.beginCharacterAnimation(characterPath);
        }
    },
    
    start () {

        this.mazeModel.loadMaze("resources/maze.txt", this);
    }
});
