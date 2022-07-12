var worker = require('worker');
var spawner = require('spawner');
var taskmaster = require('taskmaster');

module.exports.loop = function() {
    for (let name in Memory.creeps){
        if (!Game.creeps[name]){
            delete Memory.creeps[name]
        }
    }
    for (let room in Game.rooms){
        taskmaster.run(Game.rooms[room])
    }
    for(let spawn in Game.spawns){
        spawner.run(Game.spawns[spawn])
    }
    for (var name in Game.creeps){
        var creep = Game.creeps[name];
        if (creep.memory.role == 'worker'){
            worker.run(creep)
        }
    }
}