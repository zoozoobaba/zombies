var Person = {
  initialize: function() {
    this.life = 100;
    this.speed = 4;
    this.coordinates = []; //e.g. [3,6] for x and y coordinates
    this.readyToMove = true;
    this.direction = 0;
    this.player_color = "blue"
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

  locationOnGrid: function() {
    if (this.isZombie) {
      this.player_color = "blue";
    } else {
      this.player_color = "lime";
    };
    console.log("#x"+ this.coordinates[0] + this.coordinates[1]);
    $("#x"+ this.coordinates[1] + this.coordinates[0]).css({"color":this.player_color});
  },

  atGridEdge: function() {
    if (this.coordinates[1] === 1 && this.coordinates[0] === 1) {
      return "nw";
    } else if (this.coordinates[1] === 1 && this.coordinates[0] === gridSizeX) {
      return "ne";
    } else if (this.coordinates[1] === gridSizeY && this.coordinates[0] === 1) {
      return "sw";
    } else if (this.coordinates[1] === gridSizeY && this.coordinates[0] === gridSizeX) {
      return "se";
    } else if (this.coordinates[1] === 1) {
      return "n";
    } else if (this.coordinates[0] === gridSizeX) {
      return "e";
    } else if (this.coordinates[1] === gridSizeY) {
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
      console.log("ne");
      console.log(this.direction);
    } else if (this.atGridEdge() === "nw" && (this.direction === 1 || this.direction === 4) ) {
      this.direction =  (2,3)[Math.floor(Math.random()*2)];
      console.log("nw");
      console.log(this.direction);
    } else if (this.atGridEdge() === "se" && (this.direction === 2 || this.direction === 3) ) {
      this.direction =  (1,4)[Math.floor(Math.random()*2)];
      console.log("se");
      console.log(this.direction);
    } else if (this.atGridEdge() === "sw" && (this.direction === 3 || this.direction === 4) ) {
      this.direction =  (1,2)[Math.floor(Math.random()*2)];
      console.log("sw");
      console.log(this.direction);
    } else if (this.atGridEdge() === "n" && this.direction === 1) {
      this.direction =  (2,3,4)[Math.floor(Math.random()*3)];
      console.log("n");
      console.log(this.direction);
    } else if (this.atGridEdge() === "e" && this.direction === 2) {
      this.direction =  (1,3,4)[Math.floor(Math.random()*3)];
      console.log("e");
      console.log(this.direction);
    } else if (this.atGridEdge() === "s" && this.direction === 3) {
      this.direction =  (1,2,4)[Math.floor(Math.random()*3)];
      console.log("s");
      console.log(this.direction);
    } else if (this.atGridEdge() === "w" && this.direction === 4) {
      this.direction =  (1,2,3)[Math.floor(Math.random()*3)];
      console.log("w");
      console.log(this.direction);
    };
  },

  moveAround: function() {
    this.directionToMove()
    if (this.direction === 1) {
      //Move North
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"color":"black"})
      this.coordinates[1] = this.coordinates[1]-1;
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"color":"blue"})
    } else if (this.direction === 2 ) {
      //Move East
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"color":"black"})
      this.coordinates[0] = this.coordinates[0]+1;
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"color":"blue"})
    } else if (this.direction === 3 ) {
      //Move South
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"color":"black"})
      this.coordinates[1] = this.coordinates[1]+1;
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"color":"blue"})
    } else if (this.direction === 4) {
      //Move West
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"color":"black"})
      this.coordinates[0] = this.coordinates[0]-1;
      $("#x"+ this.coordinates[0] + this.coordinates[1]).css({"color":"blue"})
    }
  }
};

people = []

$(document).ready(function(){

  gridSizeX = 6
  gridSizeY = 6

  for (var j = 1; j < gridSizeY+1; j++) {
    $("#grid tbody").append("<tr id=row"+j+"></tr>")
    for (var i = 1; i < gridSizeX+1; i++) {
      $("#row"+j).append("<td id=x"+i+j+">X</td>");
    };
  };

  $("#add-human-btn").click(function(event) {
    var newHuman = Object.create(Person);
    newHuman.initialize();
    newHuman.coordinates = [Math.ceil(Math.random() * gridSizeX), Math.ceil(Math.random() * gridSizeY)]
    $("#x"+ newHuman.coordinates[0] + newHuman.coordinates[1]).css({"color":newHuman.player_color})

    var count = 2

    var timer = window.setInterval(function(){
      if (count % newHuman.speed === 0) {
        newHuman.moveAround();
      };
      count +=1
    }, 300);



  });



});
