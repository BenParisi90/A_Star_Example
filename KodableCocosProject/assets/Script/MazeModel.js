var mazeModel = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        console.log("on load for maze model");
    },

    ctor(){
        this.maze = [[]];

        this.initMazeNode = function(res, mazeCharacterWidth, i, col, row){
            var nodeWidth = 3;
            var newNode = {};
            newNode.col = col;
            newNode.row = row;
            newNode.topWall = res[i + 1] == "-"
            newNode.leftWall = res[i + mazeCharacterWidth] == "|";
            newNode.rightWall = res[i + mazeCharacterWidth + nodeWidth] == "|";
            newNode.bottomWall = res[i + (mazeCharacterWidth * 2) + 1] == "-";
            return newNode;
    
        };

        this.loadMaze = function(url, gameController){

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
                    
                    var mazeWidth = 0;
                    var mazeHeight = 0;
                    var mazeCharacterWidth = 0;
                    var currentRow = 0;
                    //determine width and character width of maze
                    while(res[i] != " "){
                        if(res[i] == "+"){
                            mazeWidth++;
                        }
                        i++;
                    }
                    mazeWidth--;
                    mazeCharacterWidth = i;
                    i = 0;
                    while(i < res.length - (mazeCharacterWidth*2) - 1)
                    {
                        //console.log(res[i]);
                        if(res[i] == "+"){
                            if(newMaze[currentRow].length < mazeWidth)
                            {
                                //console.log("new node");
                                var currentCol = newMaze[currentRow].length - 1;
                                newMaze[currentRow].push(gameController.mazeModel.initMazeNode(res, mazeCharacterWidth, i, currentCol, currentRow));
                            }
                            else
                            {
                                //console.log("new row");
                                newMaze.push([]);
                                currentRow ++;
                            }
                        }       
                        i++;
                    }
                    
                }
                else
                {
                    console.log(err);
                }
                gameController.mazeModel.maze = newMaze;            
                gameController.loadMazeComplete();
            });
        };
    },

    start () {
        console.log(this);
    }
});