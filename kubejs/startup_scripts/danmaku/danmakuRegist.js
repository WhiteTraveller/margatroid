StartupEvents.registry('entity_type', event => {
    event.create('marguerite:medium_pellet', 'entityjs:projectile')
        /**
         * One-Off values set at the startup of the game.
         */
        .clientTrackingRange(50)
        .isAttackable(true)
        .mobCategory('misc')
        .item(item => {
            item.canThrow(true)
        })
        .sized(1, 1)
        .renderOffset(0, 0, 0)
        .renderScale(1, 1, 1)
        .updateInterval(3)
        .canHitEntity(entity => {
            // Custom condition to determine if the arrow can hit a specific entity
            return true;
        })
        .shouldRenderAtSqrDistance(context => {
            const { entity, distanceToPlayer } = context;
            // Custom logic to determine if the arrow should render based on distance, for example, rendering only if distance is less than 100 blocks
            return distanceToPlayer < 1000;
        })
        .move(context => {
            const { entity, moverType, position } = context;
            // Custom movement logic, for example, applying velocity to the arrow
            entity.setDeltaMovement(0, 0.1, 0);
        })

        .onHitEntity(context => {
            const { entity, result } = context;
            global.onDanmakuHit(entity, result)
        })
})