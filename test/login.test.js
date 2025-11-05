
import request from 'supertest';
import {expect} from 'chai';
import dotenv from 'dotenv';
dotenv.config();
import postLogin from '../fixtures/postLogin.json' assert { type: 'json' };

describe('Login', () => {
    describe('POST/login',() => {
        it('Deve retornar 200 com o token em string com credencias validas', async() => {

            const bodyLogin = {...postLogin}
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
                    
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
            





        })
    }) 

})