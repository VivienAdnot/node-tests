import request from 'supertest';
import app from './app';

describe('root', () => {

    test('should return 200', () =>

        request(app)
        .get('/')
        .expect(200)
        .expect((res) => {

            expect(res.body.serverLive).toBe(true);

        }));

});

