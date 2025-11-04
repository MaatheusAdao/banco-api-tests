// helpers/autenticacao.js
import request from 'supertest';

export const obterToken = async (usuario, senha) => {
  const respostaLogin = await request(process.env.BASE_URL)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({
      username: usuario,
      senha: senha
    });

  return respostaLogin.body.token;
};