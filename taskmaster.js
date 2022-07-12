const worker = require("./worker");

module.exports = {
    run(room){
        let toDo = []
        const sources = room.find(FIND_SOURCES_ACTIVE)
        const freeWorkers = room.find(FIND_MY_CREEPS, {
            filter: (creep)=>{
                return creep.memory.role === 'worker' && !creep.memory.working && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0  
            }
        });
        const harvestWorkers = room.find(FIND_MY_CREEPS,{
            filter: (creep)=>{
                return creep.memory.role === 'worker' && !creep.memory.working && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0
            }
        })
        const workers = room.find(FIND_MY_CREEPS, {
            filter: (creep)=>{
                return creep.memory.role === 'worker'
            }
        });
        const recharge = room.find(FIND_MY_STRUCTURES, {
            filter: (struc)=>{
                return ((
                    struc.structureType === STRUCTURE_SPAWN || 
                    struc.structureType === STRUCTURE_EXTENSION || 
                    struc.structureType === STRUCTURE_TOWER) && 
                    struc.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
            }
        });
        const build = room.find(FIND_MY_CONSTRUCTION_SITES)
        const repair = room.find(FIND_STRUCTURES, {
            filter:(struc)=>{
                return(struc.hits < (struc.hitsMax*0.75))
            }
        });
        for(let site in build){
            let job = build[site]
            let worked = _.filter(workers, (worker)=>{
                return ((worker.memory.job.target != undefined && worker.memory.job.target != null) ? 
                worker.memory.job.target.id === job.id : 
                null)
            })
            if (worked.length === 0){
                job.type = 'build'
                toDo.push(job)
            }
            
        }
        for(let battery in recharge){
            let job = recharge[battery]
            let worked = _.filter(workers, (worker)=>{
                return ((worker.memory.job.target != undefined && worker.memory.job.target != null) ? 
                worker.memory.job.target.id === job.id : 
                null)
            })
            if (worked.length === 0){
                job.type = 'recharge'
                toDo.unshift(job)
            }
        }
        for(let crack in repair){
            let job = repair[crack]
            let worked = _.filter(workers, (worker)=>{
                return ((worker.memory.job.target != undefined && worker.memory.job.target != null) ? 
                worker.memory.job.target.id === job.id : 
                null)
            })
            if(worked.length === 0){
                job.type = 'repair'
                toDo.push(job)
            }
            
        }
        for(let worker of freeWorkers){
            if(toDo.length === 0 || room.controller.ticksToDowngrade < (3750*room.controller.level)){
                worker.memory.job = {
                    name: 'upgrade', 
                    target: Game.getObjectById(room.controller.id)
                }
                worker.memory.working=true
            } else {
                worker.memory.job = {
                    name: toDo[0].type,
                    target: Game.getObjectById(toDo[0].id)
                }
                worker.memory.working=true
                toDo.shift()
            }
        }
        for(let harvester of harvestWorkers){
            harvester.memory.job = {
                name: 'harvest',
                target: harvester.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            }
            harvester.memory.working=true
        }
    }
};