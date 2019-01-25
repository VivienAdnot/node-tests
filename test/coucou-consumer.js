import coucouInstance from './coucou';

export default class SoundPlayerConsumer {

    constructor() {

        this.coucouInstance = coucouInstance;

    }

    getDataFromCoucou() {

        return `${this.coucouInstance.getData()} !!!`;

    }

}
