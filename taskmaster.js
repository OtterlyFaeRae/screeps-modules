module.exports = {
    run(room){
        let toDo = []
        const workers = room.find(FIND_MY_CREEPS, {
            filter: (creep)=>{
                return creep.memory.role === 'worker' && !creep.memory.working && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0
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
        const repair = room.find(FIND_MY_STRUCTURES, {
            filter:(struc)=>{
                return(struc.hits < struc.hitsMax)
            }
        });
        for(let site in build){
            let job = build[site]
            job.type = 'build'
            toDo.push(job)
        }
        for(let battery in recharge){
            let job = recharge[battery]
            job.type = 'recharge'
            toDo.unshift(job)
        }
        for(let crack in repair){
            let job = repair[crack]
            job.type = 'repair'
            toDo.push(job)
        }
        let i = 0
        for(let worker of workers){
            if(i==3 || toDo.length === 0){
                i-=3
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
    }
};