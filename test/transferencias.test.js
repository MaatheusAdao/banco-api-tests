import request from 'supertest';
import {expect} from 'chai';
import dotenv from 'dotenv';
dotenv.config();
import { obterToken } from '../helpers/autenticacao.js';
import postTransferencias from '../fixtures/postTransferencias.json' assert { type: 'json' };
import { describe, it } from 'mocha';



describe('Tranferencias', () => {
    let token
        beforeEach(async() =>{

              token = await obterToken ('julio.lima','123456')

        })
    describe('POST/tranferencias', () => {
        
        
        it('Deve retornar sucesso com 201 quando o valor for maior ou que R$:10,00 reias',async () => {
          
            const bodyTranferencias = {...postTransferencias}

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set ('Authorization',`Bearer ${token}`)
                .send(bodyTranferencias)

                expect(resposta.status).to.equal(201);

        })

         it('Deve retornar fracaso com 422 quando o valor for menor que R$:10,00 reias',async  () => {
             
            const bodyTranferencias = {...postTransferencias}

            bodyTranferencias.valor = 7
        
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set ('Authorization',`Bearer ${token}`)
                .send((bodyTranferencias))

                expect(resposta.status).to.equal(422);
        })

        describe('GET/tranferencias/{id}', () => {

            it('Deve retornar sucesso com 200 e dados iguais ao regristro de transferencias contido no banco de dados quando ID for valido', async () => {
                const resposta = await request(process.env.BASE_URL)
                    .get('/transferencias/2')
                    .set('Authorization',`Bearer ${token}`)

                expect(resposta.status).to.equal(200)
                expect(resposta.body.id).to.equal(2)
                expect(resposta.body.valor).to.equal(10.99)

        } )
        
            })

            
                
    } )

    describe('', () => {
        it('Deve retornar 10 elementos na paginação pois o limite é 10', async () => {
            const resposta = await request(process.env.BASE_URL)

                .get('/transferencias?page=1&limit=10')
                .set('Authorization',`Bearer ${token}`)

                expect(resposta.status).to.equal(200)
                expect(resposta.body.limit).to.equal(10)
                expect(resposta.body.trasferencias).to.have.lengthOf(10)

               

        })

    })


          
         
            
})
