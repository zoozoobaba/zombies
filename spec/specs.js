describe("Person", function() {
  describe("initialize", function() {
    it("initializes a person object", function() {
      var newPerson = Object.create(Person);
      newPerson.initialize();
      newPerson.life.should.equal(100);
      newPerson.speed.should.equal(4);
    });
  });


  describe("isZombie", function() {
    it("returns true if life is equal to zero", function() {
      var newPerson = Object.create(Person);
      newPerson.life = 0;
      newPerson.isZombie().should.equal(true);
      newPerson.life = 23;
      newPerson.isZombie().should.equal(false);
    });
  });

  describe("nextTo", function() {
    it("returns OneSpace or TwoSpace if the coordinates of another Person are directly next/near to them", function() {
      var newPerson = Object.create(Person);
      newPerson.coordinates = [3,3];
      newPerson.nextTo([3,2]).should.equal("OneSpace");
      newPerson.nextTo([3,4]).should.equal("OneSpace");
      newPerson.nextTo([2,3]).should.equal("OneSpace");
      newPerson.nextTo([4,3]).should.equal("OneSpace");
      newPerson.nextTo([3,1]).should.equal("TwoSpace");
      newPerson.nextTo([3,5]).should.equal("TwoSpace");
      newPerson.nextTo([1,3]).should.equal("TwoSpace");
      newPerson.nextTo([5,3]).should.equal("TwoSpace");
      newPerson.nextTo([6,3]).should.equal(false);
    });
  });


  describe("infectHuman", function () {
    it("reduces the life of a human to zero", function() {
      var newPerson = Object.create(Person);
      newPerson.infectHuman();
      newPerson.life.should.equal(0);
    });
  });

  describe("atGridEdge", function () {
    it("returns returns the location of the player when at the edge of the grid", function() {
      var newPerson = Object.create(Person);
      newPerson.coordinates = [1,1];
      newPerson.atGridEdge().should.equal("nw");
    });
  });

});
