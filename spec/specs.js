describe("Person", function() {
  describe("initialize", function() {
    it("initializes a person object", function() {
      var newPerson = Object.create(Person);
      newPerson.initialize();
      newPerson.life.should.equal(100);
      newPerson.speed.should.equal(1);
    });
  });

  describe("moveAround", function() {
    it("creates a number between 1 and 100", function() {
      var newPerson = Object.create(Person);
      newPerson.moveAround();
      newPerson.direction.should.be.within(1,100);
    });
  });

  describe("isZombie", function() {
    it("returns true if life is equal to zero", function() {
      var newPerson = Object.create(Person);
      newPerson.life = 0;
      newPerson.isZombie().should.equal(true);
    });
  });

  describe("nextTo", function() {
    it("returns true if the coordinates of another Person are directly next to them", function() {
      var newPerson = Object.create(Person);
      newPerson.coordinates = [3,3];
      newPerson.nextTo([3,2]).should.equal(true);
      newPerson.nextTo([3,4]).should.equal(true);
      newPerson.nextTo([2,3]).should.equal(true);
      newPerson.nextTo([4,3]).should.equal(true);
      newPerson.nextTo([1,3]).should.equal(false);
    });
  });

});
