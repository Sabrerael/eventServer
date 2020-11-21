let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../event_API_Host');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Events', () => {
    describe('/GET Default', () => {
    it('it should GET data from the default path', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.a('string');
                res.text.should.include('Infection Prevention and Control (Australia)');
                res.text.should.include('Wellbeing First - Mindfulness');
                res.text.should.include('10 Minutes Managing Stress');
                res.text.should.include('10 Minute Pandemic Awareness');
                res.text.should.include('Morning Yoga Kickstart');
                done();
            });
        });
    });

    describe('/GET Search', () => {
        context('without arguments', function() {
            it('it should result in a 404 status code', (done) => {
            chai.request(server)
                .get('/search/')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
            });
        });

        context('with a bad argument', function() {
            it('it should return "No results found"', (done) => {
                chai.request(server)
                .get('/search/data')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal('No results found');
                    done();
                });
            });
        });

        context('with a valid argument', function() {
            it('it should GET data with the provided value in the title', (done) => {
                chai.request(server)
                .get('/search/control')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('Infection Prevention and Control (Australia)');
                    done();
                });
            });
        });

        context('with another valid argument', function() {
            it('it should GET data with the provided value in the title, returning two results', (done) => {
                chai.request(server)
                .get('/search/10%20minute')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('10 Minutes Managing Stress');
                    res.text.should.include('10 Minute Pandemic Awareness');
                    done();
                });
            });
        });
    });

    describe('/GET Location', () => {
        context('without arguments', function() {
            it('it should result in a 404 status code', (done) => {
            chai.request(server)
                .get('/location/')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
            });
        });

        context('with a bad argument', function() {
            it('it should return "No results found"', (done) => {
                chai.request(server)
                .get('/location/data')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal('No results found');
                    done();
                });
            });
        });

        context('with a valid argument', function() {
            it('it should GET data with the provided value in the title', (done) => {
                chai.request(server)
                .get('/location/Brisbane')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('Infection Prevention and Control (Australia)');
                    done();
                });
            });
        });

        context('with another valid argument', function() {
            it('it should GET data with the provided location, returning multiple results', (done) => {
                chai.request(server)
                .get('/location/Gold%20Coast')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('10 Minutes Managing Stress');
                    res.text.should.include('10 Minute Pandemic Awareness');
                    res.text.should.include('Morning Yoga Kickstart');
                    res.text.should.include('Hand Hygiene in the Workplace');
                    res.text.should.include('Equal Employment Opportunity');
                    res.text.should.include('First Aid - Basics');
                    done();
                });
            });
        });
    });

    describe('/GET Date', () => {
    it('it should GET data with the provided date', (done) => {
        chai.request(server)
            .get('/date/data')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.a('string');
            done();
            });
        });
    });
});
