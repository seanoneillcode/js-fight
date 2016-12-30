import GAME from '../constants/game';
import PLAYER from '../constants/player';
import STATE_EVENTS from '../constants/state-events';
import { Player } from '../models/player';

export class ExampleState extends Phaser.State {
    map = null;
    layer = null;

    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = GAME.GRAVITY;

        this.map = this.add.tilemap('example-map');
        this.map.addTilesetImage('background');
        this.map.setCollision([6, 1], true, "Example Map");

        this.map.createLayer('back');
        this.layer = this.map.createLayer('Example Map');
        this.layer.resizeWorld();
        // this.layer.debug = true;

        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.game.pickupCoin = new Phaser.Signal();

        this.game.player = new Player(this.game, PLAYER.DEFAULT_X, PLAYER.DEFAULT_Y);

        this.game.coins = this.game.add.group();
        this.game.coins.enableBody = true;

        // this.game.coins.enableBody = true;
        this.map.createFromObjects('objects', "coin", 'coin', 0, true, false, this.game.coins);

        const style = { font: "15px Arial", fill: "#eeeeee", align: "center" };
        this.game.coinText = this.game.add.text(10, 10, "hello",style);

        this.game.trigger(STATE_EVENTS.EXAMPLE_COMPLETED);
    }

    update() {
        this.physics.arcade.collide(this.game.player, this.layer);
        this.physics.arcade.collide(this.game.coins, this.layer);
        this.physics.arcade.overlap(this.game.player, this.game.coins, this.collectCoin, null, this);

        if (this.cursor.left.isDown) {
            this.game.player.body.velocity.x = -100;
        } else {
            if (this.cursor.right.isDown) {
                this.game.player.body.velocity.x = 100;
            } else {
                this.game.player.body.velocity.x = 0;
            }
        }
        if (this.cursor.up.isDown) {
            if (this.game.player.body.onFloor()) {
                this.game.player.body.velocity.y = -200;
            }
        }
        this.game.coinText.text = "coins : " + this.game.player.coins;
    }

    render() {
        // this.game.debug.body(this.game.player);
        // this.game.debug.body(this.game.coins);
    }

    collectCoin(player, coin) {
        this.game.pickupCoin.dispatch(this);
        coin.kill();
    }
}
