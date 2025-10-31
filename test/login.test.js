
import request from 'supertest';
import {expect} from 'chai';
import dotenv from 'dotenv';
dotenv.config();
describe('Login', () => {
    describe('POST/login',() => {
        it('Deve retornar 200 com o token em string com credencias validas', async() => {
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })
                    
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
            





        })
    }) 

})