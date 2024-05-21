// JavaScript Document

function show_message(html)
{
	$('body').append('<div id="dialog" align="center"></div>');
	$('#dialog').html(html);
	$('#dialog').dialog({title: "Message",
						resizable: false,
						modal: false
						});

}


hs.graphicsDir = "http://" + document.domain+"/scripts/highslide/highslide/graphics/";
hs.outlineType = '';
hs.wrapperClassName = 'draggable-header';
hs.align = 'center';



function explore_menu(id)
{
 $('#id_'+id + ' ul:first').each(function(){$(this).toggle('slow');});
}

function explore_category(id)
{
 $('#cat_id_'+id + ' ul:first').each(function(){$(this).toggle('slow'); });
}

function isValidDate(pString){
     
	 var mi = /^[\d]{4,4}[\-]{1,1}[\d]{2,2}[\-]{1,1}[\d]{2,2}$/;
	 return mi.test(pString);
  
}


function isBlank(pString){
    if (!pString || pString.length == 0) {
        return true;
    }
    return !/[^\s]+/.test(pString);
}


function calculate_nights()
{
	var start_date = $('#arrival').val();
	var end_date = $('#departure').val();
	
	if(!isValidDate(start_date)) {$('#nights_div').html(invalid_start_date); return;}
	else{
		if(isBlank(end_date)) return;
	    }
		
	if(!isValidDate(end_date)) {$('#nights_div').html(invalid_end_date); return;}
    
	var d1_arr = start_date.split("-");
	var d2_arr = end_date.split("-");
	
	var d1 = new Date(d1_arr[0],parseInt(d1_arr[1])-1,d1_arr[2]);
	var d2 = new Date(d2_arr[0],parseInt(d2_arr[1])-1,d2_arr[2]);
	
	var diff = d2.getTime() - d1.getTime(); 
	diff=Math.round(diff/60/60/24/1000);
	if(diff<=0){
		$('#nights_div').html(invalid_date_diff); 
		valid_dates = false;
		return;
		}
	else{
		$('#nights_div').html(number_of_nights+' '+diff);
		$('#nights').val(diff);
		valid_dates = true;
	}
	
}

function check_reservation() {
	if (valid_dates) {
		$('#request_form').submit();
	} else {
		alert(invalid_date_diff);
	}
}






$(document).ready(function($){
	
	$("#main_menu_container").css({'z-index':'15'});					   
	$("#main_menu_container .menu_item").hover(
		function(){
			var w =$(this).width();
			$(this).children("ul").fadeTo(50, 0.9);
			$(this).children("ul").css({'min-width':w});
			},
		function(){
			$(this).children("ul").fadeOut(50);
		}
	); //end hover
	
	$("#main_menu_container ul li").hover( 
		function(){
			var w =$(this).width();
			$(this).children("a").width(w-60);
			$(this).children("ul").css({'left': w, 'top':'0','position':'absolute'}).fadeIn(50);},
		function(){
			$(this).children("ul").fadeOut(50);
		}
	); //end hover
	
	$('#arrival').datepicker({dateFormat:"yy-mm-dd"});
	$('#departure').datepicker({dateFormat:"yy-mm-dd"});
	$('#index_photo_container').cycle({fx: "fade"});
	$('#small_photo_container').cycle({fx: "fade"});
})
//end document.ready