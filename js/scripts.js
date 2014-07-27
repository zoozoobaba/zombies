var Person = {
  initialize: function() {
    this.life = 100;
    this.speed = 1;
  },

  moveAround: function() {
    this.direction = Math.ceil(Math.random() * 100)  //1to25=North, 25to50=East, 51to75=South, 76to100=West 
  } 

};



$(document).ready(function(){
  $("#start").click(function(event) {
  });
});
