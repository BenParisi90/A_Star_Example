// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var mazeModel = cc.Class({
    extends: cc.Component,
    
    

    properties: {
        

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log(this);
    },

    // update (dt) {},
});

module.exports = {
    maze: [[]],

    initMazeNode: function(res, mazeWidth, i, col, row){
        var nodeWidth = 3;
        var newNode = {};
        newNode.col = col;
        newNode.row = row;
        newNode.topWall = res[i + 1] == "-"
        newNode.leftWall = res[i + mazeWidth] == "|";
        newNode.rightWall = res[i + mazeWidth + nodeWidth] == "|";
        newNode.bottomWall = res[i + (mazeWidth * 2) + 1] == "-";
        return newNode;

    },

    loadMaze: function(url, modelScope){

        var filePath = cc.url.raw("resources/maze.txt");
        cc.loader.load( filePath, function( err, res)
        {
            var newMaze = [[]];
            if(err == null)
            {
                console.log(res);
                //populate maze model
                var i = 0;
                var mazeWidthFinished = false;
                
                var mazeWidth = 0;
                var mazeHeight = 0;
                
                var currentRow = 0;
                while(i < res.length - mazeWidth)
                {
                    if(!mazeWidthFinished && res[i] == " ")
                    {
                        mazeWidth = i;
                        mazeHeight = res.length / mazeWidth;
                        mazeWidthFinished = true;
                    }
                    switch(res[i]){
                        case "+":
                            mazeWidth++;
                            var currentCol = newMaze[currentRow].length - 1;
                            newMaze[currentRow].push(modelScope.initMazeNode(res, mazeWidth, i, currentCol, currentRow));

                            break;
                        case " ": 
                            //if we are at the end of a row, and not at the end of the maze, and on an even number row
                            if(i % mazeWidth == 0 && i < res.length - 1){
                                newMaze.push([]);
                                currentRow ++;
                            }
                            break;
                    }
                        
                    i++;
                }
                
            }
            else
            {
                console.log(err);
            }
            modelScope.maze = newMaze;            
            
        });
    }
}