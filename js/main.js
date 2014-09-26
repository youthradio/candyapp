
// Functions called on load
$(drag);
$(mobile);


// Variables
var item=0
var candies= []
var total_amount= 0
// On mobile
function mobile(){
  if ($(window).width() < 700){
    $("body").html("<h1 id='not_for_mobile'>Not For Mobile</h1> <span class='fa-stack fa-5x not_for_mobile_pic'><i class='fa fa-paper-plane fa-stack-1x fa-inverse'></i></span>")
  }else if ($(window).width()<1000){
    var instruct = $("#instructions");
    instruct.style.left = "100px";
  }
}

// jQuery Drag funciton
function drag(){
  $(".candy").draggable({
    revert: 'invalid',
    stop: function(){
      $(this).draggable('option','revert','invalid');
      }
    })

  // Makes the basket and cross dropable
  $(".in_cart").droppable({
    drop: buyCandy,
    activeClass: 'active'
  })
  $(".out_cart").droppable({
     drop: ditchCandy,
    activeClass: 'active'
  })

// Handle the drop

  function buyCandy(event, ui){
    item++
    ui.draggable.toggle("drop");

    var lead_amount = ui.draggable.data().amount
    var name = ui.draggable.data().name
    total_amount = total_amount + lead_amount
    console.log(total_amount)
    var candy = {Product: name, Lead: lead_amount}
    candies.push(candy)
    if (item === 20){
      loadReceipt(candies, total_amount)
      }
  }

  function ditchCandy(event, ui){
    item++
    ui.draggable.toggle("drop");
    if (item === 20){
      loadReceipt(candies, total_amount)
      }
  }

  function loadReceipt(items, total){
    console.log (total)
    var thead = d3.select("#items").select("thead").selectAll("th")
    .data(d3.keys(items[0]))
    .enter().append("th").text(function(d){return d;})

    var tr = d3.select("#items").select("tbody").selectAll("tr")
    .data(items).enter().append("tr")

    var td = tr.selectAll("td")
    .data(function(d){ return d3.values(d)})
    .enter().append("td")
    .text(function(d){return d})
    // var item = container.selectAll(".item")
    //   .data(items)
    //   .enter().append("li")
    //   .text(function(d) { return d.name; })
    //   .classed("item", true)
    $("#total").html(total)
    $('#myModal4').modal('show')
    setTimeout(function() {$('#paper-holder').addClass('print');}, 2000);
  }

//   function handleDrop(event, ui){
//     // Variables
//     var item_status = $(this).data().status
//     var candy_status = ui.draggable.data().lead
//     var candy_ing = ui.draggable.data().ing
//     var lead_amount = ui.draggable.data().amount
//     var new_width = lead_amount + "%"

// // // If answer is right
// //     if (item_status == candy_status ){
// //       ui.draggable.toggle("drop");
// //       right++
// //       score++
// //       $(".meter").css("width", new_width )
// //       snd_right.play();
// //       $("#score").html(score)

// //     // If right is 20 then the game is over
// //       if (right === 20){
// //         $('#myModal4').modal('show')
// //         $("#score-final").html(" Your score is " + score +
// //           "/20.")
// //         }
// //       if (score > 0){
// //         $("#score").addClass("green")
// //       }else{
// //         $("#score").removeClass("green")
// //       }

// //       // Handles messages for different types of candy
// //       if(candy_ing=="m"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>Many types of black licorice are made with molasses, which may be a source of lead contamination.")
// //       }else if(candy_ing=="g"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>Ginger candies often contain lead.")
// //       }else if(candy_ing =="p"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>Did you know that candy, toys and jewelry can all be sources of lead exposure?")
// //       }else if(candy_ing=="panda"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>In July 2014, Panda was one of several companies that signed a legal agreement to reformulate their products so they would no exceed the legal limit for lead.")
// //       }else if(candy_ing == "tj"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>In July 2014, Trader Joe's was one of several companies that signed a legal agreement to reformulate their products so they would no longer exceed the legal limit for lead.")
// //       }else if(candy_ing == "tj2"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>Did you know that harmful amounts of lead can permanently damage kids' developing brains?")
// //       }else if(candy_ing == "tj4"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>In July 2014, Trader Joe's was one of several companies that signed a legal agreement to reformulate their products so they would no longer exceed the legal limit for lead.")
// //       }else if(candy_ing == "santos"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>Did you know that according to California law, businesses are required to warn customers when the amount of lead in food exceeds ten parts per billion?")
// //       }else if(candy_ing == "rm"){
// //         $(".answer").html("<span class='right'>RIGHT! </span>Unlike most types of black licorice, red licorice does not contain molasses, which is thought to be a likely source of lead contamination.")
// //       }else{
// //         $(".answer").html("<span class='right'>RIGHT! </span>Nice job!")
// //       }

// // // If answer is wrong
// //     }else if (lead_status != candy_status ){
// //       ui.draggable.draggable('option','revert',true)
// //       score--
// //       $("#score").html(score)
// //       snd_wrong.play();

// //       // handles score colors
// //       if (score > 0){
// //         $("#score").addClass("green")
// //       }else{
// //         $("#score").removeClass("green")
// //       }

// //       // Handles messages for different types of candy
// //       if(candy_ing=="m"){
// //         $(".answer").html("<span class='wrong'>WRONG! </span>Remember, some candy with molasses often contains lead.")
// //       }else if(candy_ing=="g"){
// //         $(".answer").html("<span class='wrong'>WRONG! </span>Ginger candies often contain lead.")
// //       }else if(candy_ing=="panda"){
// //         $(".answer").html("<span class='wrong'> WRONG! </span>Even though 'all natural' candies sound better for you, they may also be more likely to contain lead when an ingredient (molasses) has become contaminated.")
// //       }else if(candy_ing=="tj3"){
// //         $(".answer").html("<span class='wrong'> WRONG! </span>Although Red Vines&reg; black licorice was recalled for lead contamination in August 2012, the FDA cleared the product a few months later.")
// //       }else{
// //         $(".answer").html("<span class='wrong'>WRONG! </span>Try again!")
// //       }
// //     }
// //   }
}

// reset functions
function goBack() {
    window.location = "https://youthradio.org/";
}
function reset(){
  window.location.reload()
}