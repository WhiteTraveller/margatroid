
EntityEvents.hurt(event => { 
    let { source, entity } = event;
    let player = source.player;
    if (player && source.getType() == "player") {
        if (entity.getTags().contains("attacked")) {
            Utils.server.scheduleInTicks(8, () => {
                if (entity.isAlive()) {
                    entity.removeTag("attacked");
                    return;
                }
            });
        }
        else{    
            let l = player.getAttributeValue("generic.luck");
            if(l > 100 )
                l = 100;
            let lr = 0.05 + ( l / ( l + 100 ));
            let lt = 0.4 + l / 400;
            entity.addTag("attacked");
            if(Math.random() < lr && entity.isAlive()){
                Utils.server.scheduleInTicks(0, () => {
                    let damage = player.getAttributeValue("generic.attack_damage");
                    entity.invulnerableTime = 0;
                    entity.attack(source, damage*lt*(1+lr));
                    event.level.spawnParticles('minecraft:dust 1 0 0 1', true, entity.x, entity.y + 1, entity.z, 0.2, 0.5, 0.2, 10, 0.05);
                })
            };
            Utils.server.scheduleInTicks(1, () => {
                entity.removeTag("attacked");
            })
        }
    }
});
