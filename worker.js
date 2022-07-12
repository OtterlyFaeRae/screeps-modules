module.exports ={
    run(creep){
        
        if (creep.memory.working){
            var target = Game.getObjectById(creep.memory.job.target.id)
            if (creep.store.energy === 0) {
                creep.memory.working = false
                creep.memory.job = false
                creep.say('Harvesting')
            }
            if (creep.store.energy === 0){
                creep.memory.working = false
                creep.memory.job = false
            }
            if(creep.memory.job.name == 'recharge' && target.store.getFreeCapacity(RESOURCE_ENERGY) === 0){
                creep.memory.working = false
                creep.memory.job = false
            }
            if(target === null || target === undefined){
                creep.memory.working = false
                creep.memory.job == false
            }
            if(creep.memory.job.name === "recharge") {
                if((creep.transfer(target, RESOURCE_ENERGY)) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
                
            } else if (creep.memory.job.name === 'build'){
                if(creep.build(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
            }else if (creep.memory.job.name === "upgrade") {
                if(creep.upgradeController(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
            }
        } else {
            if (creep.room.find(FIND_SOURCES_ACTIVE).length > 0){
                const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) === ERR_NOT_IN_RANGE){
                    creep.moveTo(source)
                }
            }
            
        }

    }
}