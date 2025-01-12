// ###########################
// # Node.js System Tests   #
// ###########################

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs');

const path = require('path');
const app = require('../index');  // Replace with your Express app file

const { expect } = chai;
chai.use(chaiHttp);

const UPLOAD_DIR = path.join(__dirname, '../uploads');

// Test for server startup
describe('Server Tests', () => {
    it('should start the server without errors', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(404); // Default route not defined
                done();
            });
    });
});

// Test for /recommend endpoint
describe('/recommend API Tests', () => {
    before(() => {
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
        }
    });

    it('should process uploaded PDF and return recommendations', (done) => {
        chai.request(app)
            .post('/recommend')
            .set('Content-Type', 'multipart/form-data')
            .attach('data', path.join(__dirname, 'test_files/sample.pdf'))
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('kmeansRecommendations');
                expect(res.body).to.have.property('knnRecommendations');
                done();
            });
    });

    it('should handle invalid file uploads gracefully', (done) => {
        chai.request(app)
            .post('/recommend')
            .set('Content-Type', 'multipart/form-data')
            .attach('data', path.join(__dirname, 'test_files/invalid_file.txt'))
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.contain('Invalid feature format');
                done();
            });
    });

    after(() => {
        if (fs.existsSync(UPLOAD_DIR)) {
            fs.rmdirSync(UPLOAD_DIR, { recursive: true });
        }
    });
});
