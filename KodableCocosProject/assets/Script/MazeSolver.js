var MazeView = require("MazeView");
var MazeModel = require("MazeModel");
var GameController = require("GameController");

cc.Class({
    extends: cc.Component,

    properties: {
        mazeView:{
            default:null,
            type:MazeView
        },

        mazeModel:{
            default:null,
            type:MazeModel
        },

        updateSpeed: 1

    },

    ctor: function(){
        this.state = "idle";
        this.gameController = null;
        this.retraceTarget = null;
        this.updateCounter = this.updateSpeed;
        this.characterPath = [];

        this.solveMaze = function(gameController){
            this.state = "findingPath";
            this.gameController = gameController;
            this.open = [];
            this.closed = [];
            this.characterPath = [];
            this.open.push(this.mazeModel.maze[this.mazeModel.startY][this.mazeModel.startX]);
        };

        this.iteratePathfinding = function()
        {
            var current = this.lowestFNode(this.open);
            this.mazeView.turnOn(current.col, current.row, this.mazeView.floorPrefab);
            this.moveNodeToClosed(current);
            //console.log("current = " + current.col + "," + current.row);

            if(current == this.mazeModel.endNode){
                console.log("path to end node found");
                this.state = "retracingPath";
                this.retraceTarget = current;
                this.findingPath = false;
                this.retracingPath = true;
                return;
            }
            var adjacent = this.adjacentNodes(current);
            for(var i = 0; i < adjacent.length; i ++)
            {
                if(this.closed.indexOf(adjacent[i]) != -1){
                    continue;
                }
                if(this.open.indexOf(adjacent[i]) == -1 ||current.g + 1 + adjacent[i].h < adjacent[i].f){
                    adjacent[i] = this.setFCost(adjacent[i], current);
                    adjacent[i].parent = current;
                    if(this.open.indexOf(adjacent[i]) == -1){
                        this.open.push(adjacent[i]);
                    }
                }
            }
        };

        this.retracePath = function(targetNode){
            this.mazeView.turnOn(targetNode.col, targetNode.row, this.mazeView.retracePrefab);
            this.characterPath.push(targetNode);
            if(targetNode == this.mazeModel.startNode){
                console.log("found way back to start!");
                this.state = "complete";
                this.gameController.solveMazeComplete(this.characterPath);
            }
            this.retraceTarget = targetNode.parent;
        };

        this.adjacentNodes = function(targetNode){
            var adjacent = [];
            if(!targetNode.leftWall && targetNode.col > 0){
                adjacent.push(this.mazeModel.maze[targetNode.row][targetNode.col - 1]);
            }
            if(!targetNode.rightWall && targetNode.col < this.mazeModel.mazeWidth - 1){
                adjacent.push(this.mazeModel.maze[targetNode.row][targetNode.col + 1]);
            }
            if(!targetNode.topWall && targetNode.row > 0){
                adjacent.push(this.mazeModel.maze[targetNode.row - 1][targetNode.col]);
            }
            if(!targetNode.bottomWall && targetNode.row < this.mazeModel.mazeHeight - 1){
                adjacent.push(this.mazeModel.maze[targetNode.row + 1][targetNode.col]);
            }
            return adjacent;
        };

        this.setFCost = function(node, parent){
            node.g = parent.g + 1;
            node.h = Math.abs(node.col - this.mazeModel.endX) + Math.abs(node.row - this.mazeModel.endY);
            node.f = Math.min(node.g + node.h, node.f);
            return node;
        };

        this.lowestFNode = function(arr){
            var lowestF = null;
            for(var i = 0; i < arr.length; i ++){
                lowestF = lowestF == null || lowestF.f > arr[i].f ? arr[i] : lowestF;
            }
            return lowestF
        };

        this.moveNodeToClosed = function(targetNode){
            for(var i = 0; i < this.open.length; i ++){
                if(this.open[i].row == targetNode.row && this.open[i].col == targetNode.col){
                    this.open.splice(i, 1);
                    break;
                }
            }
            this.closed.push(targetNode);
        };

    },

    update (dt) {
        
        this.updateCounter += dt;
        while(this.updateCounter > this.updateSpeed)
        {
            switch(this.state){
                case "findingPath":
                    this.iteratePathfinding();
                    break;
                case "retracingPath":
                    this.retracePath(this.retraceTarget);
                    break;    
            }
            this.updateCounter -= this.updateSpeed;
        }
    }
});
