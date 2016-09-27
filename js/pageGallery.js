var $pageGallery = {
	  tablename:'gallery',
	  $giid :null,
	  $taskDialog:null,
	  $formValid:null,
	  defaultimg:"",
	 objdata : function(){
	 	 return $pageEntity.getColumns($pageGallery.tablename);
	},
	 init : function(){
	 	 $pageGallery.defaultimg =  $globalKudo.rootpath+"images/defaults/no-image.jpg";	
	 },
	 sliderGallery:function(){
	 	       var dataatt =  $pageGallery.objdata();
	 	       dataatt.pageIndex = 0;
	 	       dataatt.pageSize  = 6;
	 			var objgetdata = {	table: $pageGallery.tablename, 
								    	objdata : dataatt,
								    	where :"where Active = 'Y' order by Created desc"
					  };
	 		$pageEntity.GetData($globalKudo.apipath,objgetdata,function(data){
				 		var jsonobj = JSON.parse(data.data);
				 		var $newslidediv = $("<div class=\"flexslider\"></div>");
				 		var $newslideul = $("<ul class=\"slides\"></ul>");
				 		for(var i = 0;i< jsonobj.length;i++){
				 			var newslideli = '<li>'+
											      '<img src="'+jsonobj[i].Picture+'" />'+
											      '<p class="flex-caption">'+jsonobj[i].Title+'</p>'+
											  '</li>';
				 			$newslideul.append(newslideli);
				 		}
						$newslidediv.append($newslideul);
						$(".home-gallerySlider").append($newslidediv);
						$('.home-gallerySlider .flexslider').flexslider({
					    	animation: "slide",
					    	controlNav:false,
					    	itemWidth: 210,
					    	slideshowSpeed:6000,
							itemMargin: 15,
							slideshow:true,
							maxItems:3,
					    	start: function(){
						       $( window ).resize();
						        //do something
						    }
					  });
					  
				 									
			});
	 }
	
};