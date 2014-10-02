
// Functions called on load
$(drag);
$(mobile);


// Variables
var item=0
var candies= []
var images= []
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

// jQuery Drag function
function drag(){

  // Candies are "draggable"
  $(".candy").draggable({
    revert: 'invalid',
    opacity: 0.55,
    stop: function(){
      $(this).draggable('option','revert','invalid');
      }
    })

  // Makes the basket and cross "droppable"
  $(".in_cart").droppable({
    drop: buyCandy,
    activeClass: 'active',
    hoverClass: "drop-hover"
  })
  $(".out_cart").droppable({
     drop: ditchCandy,
    activeClass: 'active',
    hoverClass: "drop-hover"
  })

// Handle the drop

  function buyCandy(event, ui){
    item++
    ui.draggable.toggle("drop");
    var description;
    var lead_amount = ui.draggable.data().amount
    var name = ui.draggable.data().name
    var image_src = ui.draggable.attr("src")
    total_amount = total_amount + lead_amount
    if (name == "Lucky Country Aussie Style Soft Black licorice"){
       description = "Many types of black licorice are made with molasses, which may be a source of lead contamination. Even though 'all natural' candies sound better for you, they may also be more likely to contain lead when an ingredient (molasses) has become contaminated. In July 2014, Lucky was one of several companies that signed a legal agreement to reformulate their products so they would not exceed 0.035ppm by December 2014, and said they would lower levels even further by 2017."
    }else if(name == "Panda Licorice"){
       description = "Many types of black licorice are made with molasses, which may be a source of lead contamination. In July 2014, Panda was one of several companies that signed a legal agreement to reformulate their products so they would not exceed 0.035ppm by December 2014, and said they would lower levels even further by 2017."
    }else if(name =="Trader Joe's Candy Coated Licorice"){
       description = "Many types of black licorice are made with molasses, which may be a source of lead contamination. In July 2014, Trader Joe's was one of several companies that signed a legal agreement to reformulate their so they would not exceed 0.035ppm by December 2014, and said they would lower levels even further by 2017."
    }else if(name =="Licorice Allsorts Candy"){
       description = "Many types of black licorice are made with molasses, which may be a source of lead contamination. Depending on the sourcing and processing, candy may be above or below the FDA’s legal limit of 0.1ppm."
    }else if(name =="Santos Rewadi Sugar"){
       description = "Did you know that according to California law, businesses are required to warn customers when the amount of lead in food exceeds ten parts per billion?"
    }else if(name == "Gingerbon"){
      description = "Like molasses, ginger is an ingredient that may be at a higher risk for lead contamination depending on how it is grown and processed. This phenomenon has prompted some ginger candy-producing companies to reformulate or find new sources for their ginger in order to reduce the risk of contamination."
    }else if (name == "Red Vines Black Licorice Twist"){
      description = "Although Red Vines&reg; black licorice was recalled for lead contamination in August 2012, the FDA cleared the product a few months later. In the 2013-2014 California Public Health Department testing report, black licorice Red Vines did not test positive for lead."
    }
    var candy = {Product: name, Lead: lead_amount }
    var image = {image: image_src}
    var disclaimer = {disclaimer: description}
    candies.push(candy)
    if (item === 20){
      loadReceipt(candies, total_amount, image)
      }
  }

  function ditchCandy(event, ui){
    item++
    ui.draggable.toggle("drop");
    if (item === 20){
      loadReceipt(candies, total_amount)
      }
  }

  // Loads d3 receipt with all data.
  function loadReceipt(items, total, images){

    var thead = d3.select("#items").select("thead").selectAll("th")
      .data(d3.keys(items[0]))

      .enter().append("th").text(function(d){return d;})
    var tr = d3.select("#items").select("tbody").selectAll("tr")
      .data(items).enter().append("tr")


    var td = tr.selectAll("td")
      .data(function(d){ return d3.values(d)})
      .enter().append("td")
      .text(function(d){return d})
      .attr("data-image", images)
      // .on("click", function(d){console.log(this.attributes[0].value})


    final(total)

    function final(total){
      total = "TOTAL: " + total
      $("#total").html(total)
      $('#myModal4').modal('show')
      setTimeout(function() {$('#paper-holder').addClass('print');}, 2000);
    }


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