let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../event_API_Host');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Events', () => {
 /*
  * Test the /GET route
  */
  describe('/GET Default', () => {
      it('it should GET data from the default path', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

  describe('/GET Search', () => {
    it('it should GET data with the provided value in the title or description', (done) => {
      chai.request(server)
          .get('/search/data')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
      });
  });

  describe('/GET Location', () => {
    it('it should GET data with the provided location', (done) => {
      chai.request(server)
          .get('/location/data')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
      });
  });

describe('/GET Date', () => {
  it('it should GET data with the provided date', (done) => {
    chai.request(server)
        .get('/date/data')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
      });
  });

});