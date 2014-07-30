
// this is the javascript. If your html is correct, this should work.

$(drag);
$(modals);
$(mobile);
var right= 0
var score = 0
var snd_right = new Audio("drop.wav"); // buffers automatically when created
var snd_wrong = new Audio("buzz.mp3")

function modals(){
  $('#myModal').modal('show')
}

function mobile(){
  if ($(window).width() < 700){
    $("body").html("<h1 id='not_for_mobile'>Not For Mobile</h1> <span class='fa-stack fa-5x not_for_mobile_pic'><i class='fa fa-paper-plane fa-stack-1x fa-inverse'></i></span>")
  }else if ($(window).width()<1000){
    var instruct = $("#instructions");
    instruct.style.left = "100px";
  }
}

function drag(){
  $(".candy").draggable({
    revert: 'invalid',
    stop: function(){
      $(this).draggable('option','revert','invalid');
      }
})

  $(".has_lead").droppable({
    drop: handleDrop
  })

  $(".has_no_lead").droppable({
     drop: handleDrop
  })


  function handleDrop(event, ui){
    var lead_status = $(this).data().status
    var candy_status = ui.draggable.data().lead
    var candy_ing = ui.draggable.data().ing
    var lead_amount = ui.draggable.data().amount
    var facts = ["<span class='right'>RIGHT!</span> Did you know that businesses are required to warn customers when the amount of lead in food exceeds ten parts per billion?", "<span class='right'>RIGHT!</span> Did you know that harmful amounts of lead can permanently damage kids' developing brains?", "<span class='right'>RIGHT!</span> Did you know that a significant number of candies sold in California stores were recently found to contain harmful amounts of lead?", "<span class='right'>RIGHT!</span> Did you know that if inhaled or swallowed, lead is very poisonous. Lead poisoning can have a major effect on the body's nervous system." ]
    var rand = facts[Math.floor(Math.random() * facts.length)];
    if (lead_status == candy_status ){
      ui.draggable.toggle("drop");
      right++
      score++
      var new_width = lead_amount + "%"
      $(".answer").html(rand)
      $(".meter").css("width", new_width )
      snd_right.play();
      $("#score").html(score)
      if (right === 20){
        $("#score").html("You're done! Your score is " + score + ".")
        }
      if (score > 0){
        $("#score").addClass("green")
      }else{
        $("#score").removeClass("green")
      }
    }else if (lead_status != candy_status ){
      ui.draggable.draggable('option','revert',true)
      score--
      $("#score").html(score)
      snd_wrong.play();
      if (score > 0){
        $("#score").addClass("green")
      }else{
        $("#score").removeClass("green")
      }
      if(candy_ing=="m"){
        $(".answer").html("<span class='wrong'>WRONG!</span> Remember, some candy with molasses often contains lead.")
      }else if(candy_ing=="g"){
        $(".answer").html("<span class='wrong'>WRONG!</span> Ginger candies often contain lead.")
      }else{
        $(".answer").html("<span class='wrong'>WRONG!</span> Try again!")
      }
    }
  }
}

// reset functions
function goBack() {
    window.location = "https://youthradio.org/";
}
function reset(){
  window.location.reload()
}