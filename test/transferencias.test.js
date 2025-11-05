import request from 'supertest';
import {expect} from 'chai';
import dotenv from 'dotenv';
dotenv.config();
import { obterToken } from '../helpers/autenticacao.js';

describe('Tranferencias', () => {
    describe('POST/tranferencias', () => {
        let token
        beforeEach(async() =>{

              token = await obterToken ('julio.lima','123456')

        })
        
        it('Deve retornar sucesso com 201 quando o valor for maior ou que R$:10,00 reias',async () => {
          
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
    
        
            

            const resposta = await request(process.env.BASE_URL)
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
