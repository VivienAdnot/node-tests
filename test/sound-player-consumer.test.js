import SoundPlayerConsumer from './sound-player-consumer';
import SoundPlayer from './sound-player';

const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {

    return jest.fn().mockImplementation(() => ({
        playSoundFile: mockPlaySoundFile
    }));

});

beforeEach(() => {

    SoundPlayer.mockClear();
    mockPlaySoundFile.mockClear();

});

test('The consumer should be able to call new() on SoundPlayer', () => {

    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(soundPlayerConsumer).toBeTruthy();

});

test('check if the consumer called the class constructor', () => {

    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);

});

test('check if the consumer called a method on the class instance', () => {

    const soundPlayerConsumer = new SoundPlayerConsumer();
    const coolSoundFileName = 'song.mp3';
    soundPlayerConsumer.playSomethingCool();
    expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);

});
