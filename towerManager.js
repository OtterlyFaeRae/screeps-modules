module.exports={
    run(tower){
        const target = tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
        const repair = tower.room.find(FIND_STRUCTURES, {
            filter:(struc)=>{
                return(struc.hits < (struc.hitsMax))
            }
        });
        if(target){
            tower.attack(target)
        } else if (tower.store[RESOURCE_ENERGY] > tower.store.getCapacity(RESOURCE_ENERGY) * 0.75 ){
            tower.repair(repair[0])
        }
    }
}