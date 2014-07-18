
// this is the javascript. If your html is correct, this should work.

$(drag);

$(document).ready(function(){
$('#myModal').modal('show')
})


$(document).ready(function(){
  if ($(window).width() < 700){
  $("body").html("<h1 id='not_for_mobile'>Not For Mobile</h1> <span class='fa-stack fa-5x not_for_mobile_pic'><i class='fa fa-paper-plane fa-stack-1x fa-inverse'></i></span>")
  // window.onload= function popup(){window.alert("Best for web.");}
}
  else if ($(window).width()<1000){
  var instruct = getElementById("instructions");
  instruct.style.left= "100px";  
  }

})


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

    if (lead_status == candy_status ){
      ui.draggable.toggle("drop");
      $(".answer").html("RIGHT!")
    }else if (lead_status != candy_status ){
      ui.draggable.draggable('option','revert',true)
      if(candy_ing=="m"){
        $(".answer").html("<div class='smaller'>WRONG. Remember, some candy with molasses often contains lead.</div>")
      }else if(candy_ing=="g"){
        $(".answer").html("<div class='smaller'>WRONG. Ginger candies often contain lead.</div>")
      }else{
        $(".answer").html("<div class='smaller'>WRONG. Try again!</div>")
      }

    }
  }
}
function goBack() {
    window.history.back()
}
function reset(){
  window.location.reload()
}