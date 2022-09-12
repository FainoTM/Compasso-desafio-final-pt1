import request from 'supertest';
import app from '../app';
import { expect, jest, test } from '@jest/globals';

const server = request(app);
jest.setTimeout(1000000);

const UserToLogin = {
  email: 'user_test@compasso.com.br',
  password: '123'
};
const ProductExample = {
  title: 'Azeites, Óleos e Vinagres',
  description: 'Óleo de Soja Soya Garrafa 900ml',
  department: 'Mercearia',
  brand: 'Soya',
  price: 99.99,
  qtd_stock: 99999,
  bar_codes: '1112223334445'
};
// const ProductExampleLowStock = {
//  title: 'Azeites, Óleos e Vinagres',
//  description: 'Óleo de Soja Soya Garrafa 900ml',
//  department: 'Mercearia',
//  brand: 'Soya',
//  price: 99.99,
//  qtd_stock: 10,
//  bar_codes: '5111222333444'
//  };
//  const ProductUpdatedExample = {
//  title: 'Updated title',
//  description: 'Updated description',
//  department: 'Updated department',
//  brand: 'Updated brand',
//  price: 10.0,
//  qtd_stock: 100000
//  };
//  const PageNotFound = {
//  page: -1,
//  limit: -1
//  };

// eslint-disable-next-line no-undef
describe('GET /product', () => {
  test('should return all products', async () => {
    const login = await server.post('/api/v1/authenticate').send(UserToLogin);
    const createProduct = await server.post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login._body.token}`);
    const response = await server.get('/api/v1/product').set('Authorization', `Bearer ${login._body.token}`);
    await server.delete(`/api/v1/product/${createProduct._body.id}`).set('Authorization', `Bearer ${login._body.token}`);
    expect(response.statusCode).toBe(200);
  });
});
