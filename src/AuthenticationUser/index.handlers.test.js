import request from 'supertest';
import app from 'app';

describe('should validate login', () => {

    test('login works', () => {

        const login = {
            email: 'vivienadnot@amplement.com',
            password: 'test'
        };

        return request(app)
        .post('/login-user')
        .send(login)
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect((res) => {

            expect(res.body.name).toBe('Vivien');

        });

    });

});
