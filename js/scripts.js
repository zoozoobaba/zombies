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
    if (this.life == 0) {
      return true;
    } else {
      return false;
    };
  },

  nextTo: function(othersCoordintes) {
    if ( (this.coordinates[0] == othersCoordintes[0]) && ( (this.coordinates[1] == othersCoordintes[1]+1) || (this.coordinates[1] == othersCoordintes[1]-1) ) ) { //check above and below
      return true; 
    } else if ( (this.coordinates[1] == othersCoordintes[1]) && ( (this.coordinates[0] == othersCoordintes[0]+1) || (this.coordinates[0] == othersCoordintes[0]-1) ) ) { //check left and right
      return true; 
    } else {
      return false;
    };
  }

};





$(document).ready(function(){
  $("#start").click(function(event) {
  });
});
