module.exports = {
    run(spawn){
        var sources = spawn.room.find(FIND_SOURCES)
        var workers = spawn.room.find(FIND_MY_CREEPS, {
            filter: (creep)=>{
                return creep.memory.role === 'worker'
            }
        })
        if(workers.length < (sources.length*3)){
            var newCreep = 'Worker'+Game.time
            if(spawn.room.energyCapacityAvailable < 500 || workers.length<3){
                spawn.spawnCreep([WORK, WORK, MOVE, CARRY], newCreep, {memory: {role: 'worker', working: false, job:''}})
            } else if (spawn.room.energyCapacityAvailable >= 500 && spawn.room.energyCapacityAvailable < 700){
                spawn.spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newCreep, {memory: {role: 'worker', working: false, job:''}})
            } else {
                spawn.spawnCreep([WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY], newCreep, {memory: {role: 'worker', working: false, job:''}})
            }
        }
        if(workers.length === 0){
            spawn.spawnCreep([WORK, WORK, MOVE, CARRY], newCreep, {memory: {role: 'worker', working: false, job:''}})
        }
    }
}