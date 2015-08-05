/* SharePoint StickyFooter by Randy Drisgill (http://blog.drisgill.com) - Jan. 21, 2013  */

function calcFooter(){
	var $footer = $("#customFooter");
	var footerheight = $footer.outerHeight();
	//hide footer allows for smoother window resizing
	$footer.hide();

	var bodyheight = $("#s4-bodyContainer").outerHeight();
	var $ribbon = $("#ms-designer-ribbon")
	var ribbonheight = $ribbon.outerHeight();
	var windowheight = $(window).height();

	//if ribbon is hidden size is zero
	if($ribbon.css('display') == 'none'){
		ribbonheight = 0;
	}
	
	//if no ms-designer-ribbon try to calculate with suitebar + ribbonrow
	if(ribbonheight==null){
		ribbonheight = $("#suiteBarTop").height() + $("#s4-ribbonrow").height();
	}
	
	//handle null if something wasn't found
	ribbonheight == null && (ribbonheight = 0);
	
	//if content is less than the window size add margin to customFooter
	var difference = windowheight - (bodyheight + ribbonheight + footerheight + $("#customHeader").outerHeight());
	if (difference > 0) $('#customFooter').css('margin-top', difference);
	
	//show footer after calculating
	$footer.show();
}

$(document).ready(function() {
    calcFooter();
	
	//change footer with window resize
	$(window).resize(calcFooter);
});