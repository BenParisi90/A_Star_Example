var MazeModel = require("MazeModel");

cc.Class({
    extends: cc.Component,

    properties: {
        mazeModel:{
            default: null,
            type: MazeModel
        },

        wallPrefab: {
            default: null,
            type: cc.Prefab
        },

        mazeView:{
            default: null,
            type: cc.Node
        }
    },

    ctor: function(){
        this.nodeWidth = 50;

        this.renderMaze = function(){
            console.log("render maze");
            
            var row = 0;
            var mazeData = this.mazeModel.maze;
            while(row < mazeData.length){
                console.log("new row");
                var col = 0;
                while(col < mazeData[row].length){
                    var targetNode = mazeData[row][col];
                    console.log(col + ", " + row + " = " + targetNode);
                    if(col == 0 && targetNode.leftWall){
                        this.makeWall(
                            col * this.nodeWidth - (this.nodeWidth /2),
                            -row * this.nodeWidth,
                            90
                        );
                    }
                    if(targetNode.rightWall){
                        this.makeWall(
                            col * this.nodeWidth + (this.nodeWidth /2),
                            -row * this.nodeWidth,
                            90
                        );
                    }
                    if(row == 0 && targetNode.topWall){
                        this.makeWall(
                            col * this.nodeWidth,
                            -row * this.nodeWidth + (this.nodeWidth /2),
                            0
                        );
                    }
                    if(targetNode.bottomWall){
                        this.makeWall(
                            col * this.nodeWidth,
                            -row * this.nodeWidth - (this.nodeWidth /2),
                            0
                        );
                        var node = cc.instantiate(this.wallPrefab);
                        node.parent = this.mazeView;
                        node.setPosition(col * this.nodeWidth, -row * this.nodeWidth - (this.nodeWidth /2));
                    }
                    col++;
                }
                row++;
            }
        }

        this.makeWall = function(xPos, yPos, rot){
            var node = cc.instantiate(this.wallPrefab);
            node.parent = this.mazeView;
            node.setPosition(xPos, yPos);
            node.setRotation(rot);
        }
    }
});
