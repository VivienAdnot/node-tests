export default class SoundPlayer {

    constructor() {

        this.foo = 'bar';

    }

    // esline-disable-next-line class-methods-use-this
    playSoundFile(fileName) {

        console.log(`Playing sound file ${fileName}. ${this.foo}`);

    }

}
