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

    describe('/GET search', () => {
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

    describe('/GET location', () => {
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

    describe('/GET date', () => {
        context('without arguments', function() {
            it('it should result in a 404 status code', (done) => {
            chai.request(server)
                .get('/date/')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
            });
        });

        context('with a bad argument', function() {
            it('it should return an incorrect format message', (done) => {
                chai.request(server)
                .get('/date/2314')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal('Incorrect Format. Parameter must follow this format: yyyy-mm-dd');
                    done();
                });
            });
        });

        context('with a argument that returns no results', function() {
            it('it should return "No results found"', (done) => {
                chai.request(server)
                .get('/date/2010-01-01')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal('No results found');
                    done();
                });
            });
        });

        context('with a valid argument', function() {
            it('it should GET data with the provided date', (done) => {
                chai.request(server)
                .get('/date/2021-03-22')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('Infection Prevention and Control (Australia)');
                    done();
                });
            });
        });

        context('with another valid argument', function() {
            it('it should GET data with the provided date, returning multiple results', (done) => {
                chai.request(server)
                .get('/date/2021-03-24')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('Wellbeing First - Mindfulness');
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

    describe('/GET date/before', () => {
        context('with a bad argument', function() {
            it('it should return an incorrect format message', (done) => {
                chai.request(server)
                .get('/date/before/2314')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal('Incorrect Format. Parameter must follow this format: yyyy-mm-ddThh:mm:ss.mmmZ');
                    done();
                });
            });
        });

        context('with a argument that returns no results', function() {
            it('it should return "No results found"', (done) => {
                chai.request(server)
                .get('/date/before/2010-01-01T00:00:00.000Z')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal('No results found');
                    done();
                });
            });
        });

        context('with a valid argument', function() {
            it('it should GET data with the provided date, returning all results', (done) => {
                chai.request(server)
                .get('/date/before/2021-03-25T00:00:00.000Z')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('Infection Prevention and Control (Australia)');
                    res.text.should.include('Wellbeing First - Mindfulness');
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

        context('with another valid argument', function() {
            it('it should GET data with the provided date, returning one results', (done) => {
                chai.request(server)
                .get('/date/before/2021-03-23T00:00:00.000Z')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('Infection Prevention and Control (Australia)');
                    done();
                });
            });
        });
    });

    describe('/GET date/after', () => {
        context('with a bad argument', function() {
            it('it should return an incorrect format message', (done) => {
                chai.request(server)
                .get('/date/after/2314')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal('Incorrect Format. Parameter must follow this format: yyyy-mm-ddThh:mm:ss.mmmZ');
                    done();
                });
            });
        });

        context('with a argument that returns no results', function() {
            it('it should return "No results found"', (done) => {
                chai.request(server)
                .get('/date/after/2030-01-01T00:00:00.000Z')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.equal('No results found');
                    done();
                });
            });
        });

        context('with a valid argument', function() {
            it('it should GET data with the provided date, returning all results', (done) => {
                chai.request(server)
                .get('/date/after/2021-03-22T00:00:00.000Z')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('Infection Prevention and Control (Australia)');
                    res.text.should.include('Wellbeing First - Mindfulness');
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

        context('with another valid argument', function() {
            it('it should GET data with the provided date, returning multiple results', (done) => {
                chai.request(server)
                .get('/date/after/2021-03-23T00:00:00.000Z')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a('string');
                    res.text.should.include('Wellbeing First - Mindfulness');
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
});
