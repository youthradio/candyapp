
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
    var new_width = lead_amount + "%"
    if (lead_status == candy_status ){
      ui.draggable.toggle("drop");
      right++
      score++
      $(".meter").css("width", new_width )
      snd_right.play();
      $("#score").html(score)
      if (right === 20){
        $("#score").html("You're done! Your score is " + score)
        }
      if (score > 0){
        $("#score").addClass("green")
      }else{
        $("#score").removeClass("green")
      }
      if(candy_ing=="m"){
        $(".answer").html("<span class='right'>RIGHT! </span>Many types of black licorice are made with molasses, which may be a source of lead contamination.")
      }else if(candy_ing=="g"){
        $(".answer").html("<span class='right'>RIGHT! </span>Ginger candies often contain lead.")
      }else if(candy_ing =="p"){
        $(".answer").html("<span class='right'>RIGHT! </span>Did you know that candy, toys and jewelry can all be sources of lead exposure?")
      }else if(candy_ing=="panda"){
        $(".answer").html("<span class='right'>RIGHT! </span>In July 2014, Panda was one of several companies that signed a legal agreement to reformulate their products so they would no exceed the legal limit for lead.")
      }else if(candy_ing == "tj"){
        $(".answer").html("<span class='right'>RIGHT! </span>In July 2014, Trader Joe's was one of several companies that signed a legal agreement to reformulate their products so they would no longer exceed the legal limit for lead.")
      }else if(candy_ing == "tj2"){
        $(".answer").html("<span class='right'>RIGHT! </span>Did you know that harmful amounts of lead can permanently damage kids' developing brains?")
      }else if(candy_ing == "tj4"){
        $(".answer").html("<span class='right'>RIGHT! </span>In July 2014, Trader Joe's was one of several companies that signed a legal agreement to reformulate their products so they would no longer exceed the legal limit for lead.")
      }else if(candy_ing == "santos"){
        $(".answer").html("<span class='right'>RIGHT! </span>Did you know that according to California law, businesses are required to warn customers when the amount of lead in food exceeds ten parts per billion?")
      }else if(candy_ing == "rm"){
        $(".answer").html("<span class='right'>RIGHT! </span>Unlike most types of black licorice, red licorice does not contain molasses, which is thought to be a likely source of lead contamination.")
      }else{
        $(".answer").html("<span class='right'>RIGHT! </span>Nice job!")
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
        $(".answer").html("<span class='wrong'>WRONG! </span>Remember, some candy with molasses often contains lead.")
      }else if(candy_ing=="g"){
        $(".answer").html("<span class='wrong'>WRONG! </span>Ginger candies often contain lead.")
      }else if(candy_ing=="panda"){
        $(".answer").html("<span class='wrong'> WRONG! </span>Even though 'all natural' candies sound better for you, they may also be more likely to contain lead when an ingredient (molasses) has become contaminated.")
      }else if(candy_ing=="tj3"){
        $(".answer").html("<span class='wrong'> WRONG! </span>Although Red Vines&reg; black licorice was recalled for lead contamination in August 2012, the FDA cleared the product a few months later.")
      }else{
        $(".answer").html("<span class='wrong'>WRONG! </span>Try again!")
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