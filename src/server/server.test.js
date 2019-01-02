import request from 'supertest';
import expect from 'expect';
import app from './server';

describe('Server tests', () => {
  RootConnection();
  backendConnection();
});
function RootConnection() {
  it('should get / ', done => {
    request(app)
      .get('/')
      .expect(200)
      .expect(res => {
        expect(res.body).toBeTruthy();
      })
      .end(done);
  });
}
function backendConnection(params) {
  it('should get /express_backend', done => {
    request(app)
      .get('/express_backend')
      .expect(200)
      .expect(res => {
        expect(res.body).toMatchObject({
          express:
            'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!!!!!',
        });
      })
      .end(done);
  });
}
