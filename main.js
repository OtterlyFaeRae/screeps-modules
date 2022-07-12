var worker = require('worker');
var spawner = require('spawner');
var taskmaster = require('taskmaster');
var towerManager = require('towerManager')

module.exports.loop = function() {
    for (let name in Memory.creeps){
        if (!Game.creeps[name]){
            delete Memory.creeps[name]
        }
    }
    for (let room in Game.rooms){
        taskmaster.run(Game.rooms[room])
        const towers = Game.rooms[room].find(FIND_MY_STRUCTURES, {
            filter:(struc)=>{
                return struc.structureType === STRUCTURE_TOWER
            }
        })
        for(let tower of towers){
            towerManager.run(tower)
        }
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