export class Player extends Phaser.Sprite {

    constructor(game, x = 0, y = 0, key = 'player') {
        super(game, x, y, key);

        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.coins = 0;
        game.pickupCoin.add(this.addCoin, this);
    }

    addCoin() {
        this.coins = this.coins + 1;
    }
}
