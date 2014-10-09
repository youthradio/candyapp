
// Functions called on load
$(drag);
$(mobile);


// Variables
var item=0
var candies= []
var description;
var image;
var candy;
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
    var lead_amount = ui.draggable.data().amount
    var name = ui.draggable.data().name
    var image_src = ui.draggable.attr("src")
    total_amount = total_amount + lead_amount
    var others = ["Did you know that harmful amounts of lead can permanently damage kids' developing brains?", "Did you know that according to California law, businesses are required to warn customers when the amount of lead in food exceeds ten parts per billion?", "Did you know that candy, toys and jewelry can all be sources of lead exposure?"]
    if (name == "Lucky Country Aussie Style Soft Black licorice"){
       description = "Many types of black licorice are made with molasses, which may be a source of lead contamination. Even though 'all natural' candies sound better for you, they may also be more likely to contain lead when an ingredient (molasses) has become contaminated. In July 2014, Lucky was one of several companies that signed a legal agreement to reformulate their products so they would not exceed 0.035ppm by December 2014, and said they would lower levels even further by 2017."
    }else if(name == "Panda Licorice"){
       description = "Many types of black licorice are made with molasses, which may be a source of lead contamination. In July 2014, Panda was one of several companies that signed a legal agreement to reformulate their products so they would not exceed 0.035ppm by December 2014, and said they would lower levels even further by 2017."
    }else if(name =="Trader Joe's Coated Licorice Candy"){
       description = "Many types of black licorice are made with molasses, which may be a source of lead contamination. In July 2014, Trader Joe's was one of several companies that signed a legal agreement to reformulate their so they would not exceed 0.035ppm by December 2014, and said they would lower levels even further by 2017."
    }else if(name =="Licorice Allsorts Candy"){
       description = "Many types of black licorice are made with molasses, which may be a source of lead contamination. Depending on the sourcing and processing, candy may be above or below the FDA’s legal limit of 0.1ppm."
    }else if(name =="Santos Rewadi Sugar"){
       description = "Did you know that according to California law, businesses are required to warn customers when the amount of lead in food exceeds ten parts per billion?"
    }else if(name == "Gingerbon"){
      description = "Like molasses, ginger is an ingredient that may be at a higher risk for lead contamination depending on how it is grown and processed. This phenomenon has prompted some ginger candy-producing companies to reformulate or find new sources for their ginger in order to reduce the risk of contamination."
    }else if (name == "Red Vines Black Licorice Twist"){
      description = "Although Red Vines&reg; black licorice was recalled for lead contamination in August 2012, the FDA cleared the product a few months later. In the 2013-2014 California Public Health Department testing report, black licorice Red Vines did not test positive for lead."
    }else if (name =="Red Vines Original Red Twist"){
      description = "Unlike most types of black licorice, red licorice does not contain molasses, which is thought to be a likely source of lead contamination."
    }else{
      description = others[Math.floor(Math.random()*others.length)]
    }
      candy = {Product: name, Lead: lead_amount + " ppm", image: image_src, disclaimer: description}
    candies.push(candy)
    if (item === 20){
      total_amount = Math.round(total_amount * 1000) / 1000 + " ppm"
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

  // Loads d3 receipt with all data.
  function loadReceipt(items, total){

    var thead = d3.select("#items").select("thead").selectAll("th")
      .data(d3.keys(items[0]).splice(0,2)).enter().append("th").text(function(d){return d;})

    var tr = d3.select("#items").select("tbody").selectAll("tr")
      .data(items)
      .enter()
      .append("tr")
      .attr("data-image", function(d){ return d.image})
      .attr("data-disclaimer", function(d){ return d.disclaimer})
      .attr("data-lead", function(d){ return d.Lead})
      .on("click", function(d){append(this.dataset.image, this.dataset.disclaimer, this.dataset.lead)})

    var td = tr.selectAll("td")
      .data(function(d){return d3.values(d).splice(0,2)})
      .enter().append("td")
      .text(function(d){return d})


    final(total)

    function final(total){
      total = "TOTAL: " + total
      $("#total").html(total)
      $('#myModal4').modal('show')
      setTimeout(function() {$('#paper-holder').addClass('print');}, 2000);
    }

    function append(image, disclaimer, lead){
      bg_img = "background-image:url('" + image + "');"
      div = d3.select("#candy_info")
      div.selectAll("*").remove()
      div.append("div").attr("style", bg_img).attr( 'class', 'image_info')
      div.append("div").attr( 'class', 'burst').append("p").html(lead).attr('class', function(d) { return (this.innerHTML === "0 ppm" ? "burst-text-zero" : "burst-text"); })
      div.append("p").html(disclaimer).attr( 'class', 'disclaimer')
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