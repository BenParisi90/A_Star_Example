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

    loadMaze: function(url, scope){
        console.log("load maze - " + scope.maze);

        var filePath = cc.url.raw("resources/maze.txt");
        cc.loader.load( filePath, function( err, res)
        {
            if(err == null)
            {
                console.log(res);
                //populate maze model
                var i = 0;
                var mazeWidthFinished = false;
                var newMaze = [[]];
                var mazeWidth = 0;
                var mazeHeight = 0;
                var currentRow = 0;
                while(i < res.length)
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
                            newMaze[currentRow].push(0);
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
                scope.maze = newMaze;
            }
            else
            {
                console.log(err);
            }
        });
    }
}