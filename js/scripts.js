var Universe = {
  initialize: function() {
    this.people = [];
    this.gridSizeX = 25;
    this.gridSizeY = 25;
  }
};

var Person = {
  initialize: function(universe) {
    this.life = 100;
    this.speed = 4;
    this.coordinates = []; //e.g. [3,6] for x and y coordinates
    this.direction = 0;
    this.player_color = "blue"
    this.gridSizeX = universe.gridSizeX
    this.gridSizeY = universe.gridSizeY
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

  infectHuman: function() {
    this.life = 0;
    this.player_color = "lime";
    this.speed = 6;
  },

  atGridEdge: function() {
    if (this.coordinates[1] === 1 && this.coordinates[0] === 1) {
      return "nw";
    } else if (this.coordinates[1] === 1 && this.coordinates[0] === (this.gridSizeX)) {
      return "ne";
    } else if (this.coordinates[1] === (this.gridSizeY) && this.coordinates[0] === 1) {
      return "sw";
    } else if (this.coordinates[1] === this.gridSizeY && this.coordinates[0] === (this.gridSizeX)) {
      return "se";
    } else if (this.coordinates[1] === 1) {
      return "n";
    } else if (this.coordinates[0] === (this.gridSizeX)) {
      return "e";
    } else if (this.coordinates[1] === (this.gridSizeY)) {
      return "s";
    } else if (this.coordinates[0] === 1) {
      return "w";
    } else {
      return false
    };
  },

  directionToMove: function() {
    this.direction = Math.ceil(Math.random() * 4)  //1=North, 2=East, 3=South, 4=West

    if (this.atGridEdge() === "ne" && (this.direction === 1 || this.direction === 2) ) {
      this.direction =  (3,4)[Math.floor(Math.random()*2)];
    } else if (this.atGridEdge() === "nw" && (this.direction === 1 || this.direction === 4) ) {
      this.direction =  (2,3)[Math.floor(Math.random()*2)];
    } else if (this.atGridEdge() === "se" && (this.direction === 2 || this.direction === 3) ) {
      this.direction =  (1,4)[Math.floor(Math.random()*2)];
    } else if (this.atGridEdge() === "sw" && (this.direction === 3 || this.direction === 4) ) {
      this.direction =  (1,2)[Math.floor(Math.random()*2)];
    } else if (this.atGridEdge() === "n" && this.direction === 1) {
      this.direction =  (2,3,4)[Math.floor(Math.random()*3)];
    } else if (this.atGridEdge() === "e" && this.direction === 2) {
      this.direction =  (1,3,4)[Math.floor(Math.random()*3)];
    } else if (this.atGridEdge() === "s" && this.direction === 3) {
      this.direction =  (1,2,4)[Math.floor(Math.random()*3)];
    } else if (this.atGridEdge() === "w" && this.direction === 4) {
      this.direction =  (1,2,3)[Math.floor(Math.random()*3)];
    };
  },

  moveAround: function() {
    this.directionToMove()
    $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"background-color":"transparent"})
    if (this.direction === 1) {
      //Move North
      this.coordinates[1] = this.coordinates[1]-1;
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"background-color":this.player_color})
    } else if (this.direction === 2 ) {
      //Move East
      this.coordinates[0] = this.coordinates[0]+1;
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"background-color":this.player_color})
    } else if (this.direction === 3 ) {
      //Move South
      this.coordinates[1] = this.coordinates[1]+1;
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"background-color":this.player_color})
    } else if (this.direction === 4) {
      //Move West
      this.coordinates[0] = this.coordinates[0]-1;
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"background-color":this.player_color})
    }
  }
};

 var people = []


$(document).ready(function(){

  var newUniverse = Object.create(Universe);
  newUniverse.initialize();

  //creates the grid in HTML as a table
  for (var j = 1; j < newUniverse.gridSizeY+1; j++) {
    $("#grid tbody").append("<tr id=row"+j+"></tr>")
    for (var i = 1; i < newUniverse.gridSizeX+1; i++) {
      $("#row"+j).append("<td id=x"+i+j+"></td>");
    };
  };

  $("#add-human-btn").click(function(event) {
    var newHuman = Object.create(Person);

    newHuman.initialize(newUniverse);
    newUniverse.people.push(newHuman);

    newHuman.coordinates = [Math.ceil(Math.random() * newUniverse.gridSizeX), Math.ceil(Math.random() * newUniverse.gridSizeY)]
    $("#x"+ newHuman.coordinates[0] + newHuman.coordinates[1]).css({"background-color":newHuman.player_color})

    var count = 2
    var timer = window.setInterval(function(){
      if (count % newHuman.speed === 0) {
        newHuman.moveAround();
      };

      newUniverse.people.forEach(function(person) {
        if ( (newHuman.nextTo(person.coordinates) === "OneSpace") && person.isZombie()) {
          newHuman.infectHuman();
        } else if ( (newHuman.nextTo(person.coordinates) === "TwoSpace") && person.isZombie() && !newHuman.isZombie()) {
          newHuman.speed = 2;
        };
      });

      count +=1;
    }, 200);
  });

  $("#infect-human-btn").click(function(event) {
    newUniverse.people[0].infectHuman();
  });

});
