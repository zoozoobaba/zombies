var Person = {
  initialize: function() {
    this.life = 100;
    this.speed = 1;
    this.coordinates = [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)] //e.g. [3,6] for x and y coordinates
  },

  moveAround: function() {
    this.direction = Math.ceil(Math.random() * 100)  //1to25=North, 25to50=East, 51to75=South, 76to100=West 
  },

  isZombie: function() {
    if (this.life <= 0) {
      return true;
    } else {
      return false;
    };
  },

  nextTo: function(othersCoordintes) {
    if ( (this.coordinates[0] == othersCoordintes[0]) && ( (this.coordinates[1] == othersCoordintes[1]+1) || (this.coordinates[1] == othersCoordintes[1]-1) ) ) { //check above and below -- one space
      return "OneSpace"; 
    } else if ( (this.coordinates[1] == othersCoordintes[1]) && ( (this.coordinates[0] == othersCoordintes[0]+1) || (this.coordinates[0] == othersCoordintes[0]-1) ) ) { //check left and right -- one space 
      return "OneSpace";
    } else if ( (this.coordinates[0] == othersCoordintes[0]) && ( (this.coordinates[1] == othersCoordintes[1]+2) || (this.coordinates[1] == othersCoordintes[1]-2) ) ) { //check above and below -- two space
      return "TwoSpace"; 
    } else if ( (this.coordinates[1] == othersCoordintes[1]) && ( (this.coordinates[0] == othersCoordintes[0]+2) || (this.coordinates[0] == othersCoordintes[0]-2) ) ) { //check left and right -- two space
      return "TwoSpace";
    } else {
      return false;
    };
  },

  humanAttacked: function(othersCoordintes) {
    if (this.nextTo(othersCoordintes) == "OneSpace") {
      return true
    } else {
      return false;
    };
  },

  infectHuman: function() {
    this.life = 0;
  },

  locationOnGrid: function(person) {
    if (this.isZombie) {
      color = "blue";
    } else {
      color = "lime";
    };
    console.log(color);

    $("#x"+ person.coordinates[0] + person.coordinates[1]).css({"color":color});
  }
};

var people = []


$(document).ready(function(){
  for (var j = 1; j < 11; j++) {
    $("#grid tbody").append("<tr id=row"+j+"></tr>")
    for (var i = 1; i < 11; i++) { 
      $("#row"+j).append("<td id=x"+j+i+">X</td>");
    };
  };



  $("#add-human-btn").click(function(event) {
    var newHuman = Object.create(Person);
    newHuman.initialize();
    newHuman.locationOnGrid(newHuman)
    people.push(newHuman);
  });

  var timer = window.setInterval( function() {
    people[0].moveAround();
    if (people[0].direction <= 25) {
      //Move North
      $("#x"+ people[0].coordinates[0] + people[0].coordinates[1]).css({"color":"black"})
      people[0].coordinates[0] = people[0].coordinates[0]-1;
      $("#x"+ people[0].coordinates[0] + people[0].coordinates[1]).css({"color":"blue"})
    } else if (people[0].direction > 25 && people[0].direction <= 50 ) {
      //Move East
      $("#x"+ people[0].coordinates[0] + people[0].coordinates[1]).css({"color":"black"})
      people[0].coordinates[1] = people[0].coordinates[1]+1;
      $("#x"+ people[0].coordinates[0] + people[0].coordinates[1]).css({"color":"blue"})
    } else if (people[0].direction > 50 && people[0].direction <= 75 ) {
      //Move South
      $("#x"+ people[0].coordinates[0] + people[0].coordinates[1]).css({"color":"black"})
      people[0].coordinates[0] = people[0].coordinates[0]+1;
      $("#x"+ people[0].coordinates[0] + people[0].coordinates[1]).css({"color":"blue"})
    } else if (people[0].direction > 75) {
      //Move West
      $("#x"+ people[0].coordinates[0] + people[0].coordinates[1]).css({"color":"black"})
      people[0].coordinates[1] = people[0].coordinates[1]-1;
      $("#x"+ people[0].coordinates[0] + people[0].coordinates[1]).css({"color":"blue"})

    };
  }, 1000);
});
