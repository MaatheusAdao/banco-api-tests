import request from 'supertest';
import {expect} from 'chai';
import dotenv from 'dotenv';
dotenv.config();


describe('Tranferencias', () => {
    describe('POST/tranferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor for maior ou que R$:10,00 reias',async () => {
            //Capturando  o token
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })

            const token = respostaLogin.body.token
            

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set ('Authorization',`Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 10.99,
                    token: "string"
                    })

                expect(resposta.status).to.equal(201);

        })

         it('Deve retornar fracaso com 422 quando o valor for menor que R$:10,00 reias',async  () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })

            const token = respostaLogin.body.token
            

            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set ('Authorization',`Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9.99,
                    token: "string"
                    })

                expect(resposta.status).to.equal(422);
        })

        
    } )
})
