import STATE_EVENTS from '../constants/state-events';

export class LoadingState extends Phaser.State {
    preload() {
        let loader = this.add.image(this.world.centerX, this.world.centerY, 'loader');
        loader.anchor.set(0.5, 0.5);
        this.load.setPreloadSprite(loader);

        this.load.image('player', 'assets/images/player.png');
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.tilemap('example-map', 'assets/maps/example-map.json', null, Phaser.Tilemap.TILED_JSON);

        this.game.scale.maxWidth = 800;
        this.game.scale.maxHeight = 600;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    create() {
        this.time.events.add(500, () => {
            this.game.trigger(STATE_EVENTS.LOADING_COMPLETED);
        });
    }

    update() {

    }

    render() {

    }
}
