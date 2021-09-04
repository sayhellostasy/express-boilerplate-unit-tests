var expect = require('chai').expect;
var chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../index')
var fs = require('fs');
describe('Card Application', function() {

    // it('should take an image and make a card', function() {
  
    //   expect(5).to.equal(5);
    //   expect(5).to.not.equal(3);
  
    // });

    it('should return status 200 on homepage GET', function(done){
        chai.request(server)
        .get('/')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        })
      });

      it('should take an image and make a card', function(done) {
        chai.request(server)
        .post('/scan')
        .send({
            'card': {
              'value': fs.createReadStream('./upload/1630406098570.jpg'),
              'options': {
                'filename': './upload/1630406098570.jpg',
                'contentType': null
              }
            }
          })
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.keys(['success','error_status','files','status_code','upload']);
          res.body['success'].should.be.a('boolean');
        //   res.body.should.have.property('status_code');
        //   res.body.status_code.should.be.equalTo(200);

        //   res.body.Success.should.have.property('_id');
        //   expect(res.body.Success.title).to.equal('Hello Title');
          done();
            });
        });

        it('should relay the message sent to it', function(done) {
            chai.request(server)
            .post('/scan')
            .send({
               'message':'Hello it relayed the same message'
              })
            .end(function(err, res){
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
            //   res.body.should.have.keys(['success','error_status','files','status_code','upload']);
            //   res.body['success'].should.be.a('boolean');
            //   res.body.should.have.property('status_code');
            //   res.body.status_code.should.be.equalTo(200);
    
            //   res.body.Success.should.have.property('_id');
            //   expect(res.body.Success.title).to.equal('Hello Title');
              done();
                });
            });
  
  });