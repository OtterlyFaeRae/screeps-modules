module.exports ={
    run(creep){
        if (creep.memory.working){
            var target = Game.getObjectById(creep.memory.job.target.id)
            if(creep.memory.job.name != 'harvest' && creep.store.getUsedCapacity(RESOURCE_ENERGY)===0){
                creep.memory.working = false
                creep.memory.job = false
            }
            if(creep.memory.job.name == 'recharge' && target.store.getFreeCapacity(RESOURCE_ENERGY) === 0){
                creep.memory.working = false
                creep.memory.job = false
            }
            if(creep.memory.job.name === 'repair' && target.hits === target.hitsMax){
                creep.memory.working = false
                creep.memory.job = false
            }
            if(creep.memory.job.name === 'harvest' && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0){
                creep.memory.working = false
                creep.memory.job = false
            }
            if(target === null || target === undefined){
                console.log('NullCatch hit:', creep)
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
            } else if (creep.memory.job.name === 'upgrade') {
                if(creep.upgradeController(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
            } else if (creep.memory.job.name === 'repair') {
                if(creep.repair(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                } 
            } else if (creep.memory.job.name === 'harvest'){
                    if(creep.harvest(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
            }
        } else {
            
            
        }

    }
}