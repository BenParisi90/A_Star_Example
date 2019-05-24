var mazeModel = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ctor(){
        this.maze = [[]];
        this.startX = 0;
        this.startY = 0;
        this.endX = null;
        this.endY = null;
        this.startNode = null;
        this.endNode = null;
        this.mazeWidth = 0;
        this.mazeHeight = 0;

        this.initMazeNode = function(res, mazeCharacterWidth, i, col, row){
            var nodeWidth = 3;
            var newNode = {};
            newNode.parent = null;
            newNode.col = col;
            newNode.row = row;
            newNode.g = null;
            newNode.h = null;
            newNode.f = 9999999;
            newNode.topWall = res[i + 1] == "-"
            newNode.leftWall = res[i + mazeCharacterWidth] == "|";
            newNode.rightWall = res[i + mazeCharacterWidth + nodeWidth] == "|";
            newNode.bottomWall = res[i + (mazeCharacterWidth * 2) + 1] == "-";
            return newNode;
    
        };

        this.loadMaze = function(url, gameController){

            var mazeModel = gameController.mazeModel;
            var filePath = cc.url.raw(url);
            cc.loader.load( filePath, function( err, res)
            {
                var newMaze = [[]];
                if(err == null)
                {
                    console.log(res);
                    //populate maze model
                    var i = 0;
                    var mazeWidthFinished = false;
                    
                    mazeModel.mazeWidth = 0;
                    mazeModel.mazeHeight = 1;
                    var mazeCharacterWidth = 0;
                    var currentRow = 0;
                    //determine width and character width of maze
                    while(res[i] != " "){
                        if(res[i] == "+"){
                            mazeModel.mazeWidth++;
                        }
                        i++;
                    }
                    mazeModel.mazeWidth--;
                    mazeCharacterWidth = i;
                    i = 0;
                    while(i < res.length - (mazeCharacterWidth*2) - 1)
                    {
                        if(res[i] == "+"){
                            if(newMaze[currentRow].length < mazeModel.mazeWidth)
                            {
                                var currentCol = newMaze[currentRow].length;
                                newMaze[currentRow].push(mazeModel.initMazeNode(res, mazeCharacterWidth, i, currentCol, currentRow));
                                
                                
                            }
                            else
                            {
                                newMaze.push([]);
                                mazeModel.mazeHeight ++;
                                currentRow ++;
                            }
                        }       
                        i++;
                    }
                    mazeModel.startNode = newMaze[0][0];
                    mazeModel.endNode = newMaze[currentRow][mazeModel.mazeWidth - 1];
                    mazeModel.startNode.g = 0;
                    mazeModel.startNode.h = Math.abs(mazeModel.startNode.col - mazeModel.endNode.col) + Math.abs(mazeModel.startNode.row - mazeModel.endNode.row);
                    mazeModel.startNode.f = mazeModel.startNode.h;
                    mazeModel.endX = newMaze[currentRow].length - 1;
                    mazeModel.endY = newMaze.length - 1;
                    mazeModel.maze = newMaze;            
                    gameController.loadMazeComplete();
                    
                }
                else
                {
                    console.log(err);
                }
                mazeModel.maze = newMaze;            
                gameController.loadMazeComplete();
            });
        };
    },

    start () {
        console.log(this);
    }
});