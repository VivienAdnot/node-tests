import CoucouConsumer from './coucou-consumer';
import coucouInstance from './coucou';

jest.mock('./coucou', () => ({
    getData: jest.fn()
}));

test('mock 1', () => {

    coucouInstance.getData.mockImplementation(() => 'haha');

    const coucouConsumerInstance = new CoucouConsumer();
    expect(coucouConsumerInstance.getDataFromCoucou()).toEqual('haha !!!');

});

test('mock 2', () => {

    coucouInstance.getData.mockImplementation(() => 'lol');

    const coucouConsumerInstance = new CoucouConsumer();
    expect(coucouConsumerInstance.getDataFromCoucou()).toEqual('lol !!!');

});
