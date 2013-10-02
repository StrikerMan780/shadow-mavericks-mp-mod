/* $Id: lightbox.js,v 1.5.2.6.4.23 2008/02/22 16:55:05 snpower Exp $ */

/**
 * jQuery Lightbox
 * @author
 *   Stella Power (snpower), <http://drupal.org/user/66894>
 *
 * Based on Lightbox v2.03.3 by Lokesh Dhakar 
 * <http://www.huddletogether.com/projects/lightbox2/>
 * Also partially based on the jQuery Lightbox by Warren Krewenki
 *   <http://warren.mesozen.com>
 *
 * Originally written to make use of the Prototype framework, and 
 * Script.acalo.us, now altered to use jQuery.
 *
 * Permission has been granted to Mark Ashmead & other Drupal Lightbox2 module
 * maintainers to distribute this file via Drupal.org 
 * Under GPL license.
 *
 */

/**
 * Table of Contents
 * -----------------
 * Configuration
 * Global Variables
 * Lightbox Class Declaration
 * - initialize()
 * - updateImageList()
 * - start()
 * - changeImage()
 * - imgNodeLoadingError()
 * - imgLoadingError()
 * - resizeImageContainer()
 * - showImage()
 * - updateDetails()
 * - updateNav()
 * - enableKeyboardNav()
 * - disableKeyboardNav()
 * - keyboardAction()
 * - preloadNeighborImages()
 * - end()
 *
 * Miscellaneous Functions
 * - getPageScroll()
 * - getPageSize()
 * - pause()
 *
 * On load event
 * - initialize()
 *
 */


var Lightbox = {
  overlayOpacity : 0.6, // controls transparency of shadow overlay
  fadeInSpeed: 'normal', // controls the speed of the image appearance
  slideDownSpeed: 'slow', // controls the speed of the image resizing animations
  borderSize : 10, // if you adjust the padding in the CSS, you will need to update this variable
  infoHeight: 20,
  imageArray : new Array,
  activeImage : null,
  inprogress : false,
  rtl : false,
 


  // initialize()
  // Constructor runs on completion of the DOM loading. Calls updateImageList 
  // and then the function inserts html at the bottom of the page which is used
  //  to display the shadow overlay and the image container.
  initialize: function() {

    var settings = Drupal.settings.lightbox2;
    Lightbox.overlayOpacity = settings.overlay_opacity;
    Lightbox.rtl = settings.rtl;

    // attach lightbox to any links with rel 'lightbox'
    Lightbox.updateImageList();

    // MAKE THE LIGHTBOX DIVS
    // Code inserts html at the bottom of the page that looks similar to this:
    // (default layout)
    //
    // <div id="overlay"></div>
    // <div id="lightbox">
    //  <div id="outerImageContainer">
    //   <div id="imageContainer">
    //    <img id="lightboxImage">
    //    <div style="" id="hoverNav">
    //     <a href="#" id="prevLink"></a>
    //     <a href="#" id="nextLink"></a>
    //    </div>
    //    <div id="loading">
    //     <a href="#" id="loadingLink">
    //      <img src="images/loading.gif">
    //     </a>
    //    </div>
    //   </div>
    //  </div>
    //  <div id="imageDataContainer">
    //   <div id="imageData">
    //    <div id="imageDetails">
    //     <span id="caption"></span>
    //     <span id="numberDisplay"></span>
    //    </div>
    //    <div id="bottomNav">
    //     <a href="#" id="bottomNavClose">
    //      <img src="images/close.gif">
    //     </a>
    //    </div>
    //   </div>
    //  </div>
    // </div>

    var Body = document.getElementsByTagName("body").item(0);

    var Overlay = document.createElement("div");
    Overlay.setAttribute('id', 'overlay');
    Overlay.style.display = 'none';
    Body.appendChild(Overlay);

    var LightboxDiv = document.createElement("div");
    LightboxDiv.setAttribute('id', 'lightbox');
    LightboxDiv.style.display = 'none';
    Body.appendChild(LightboxDiv);

    var OuterImageContainer = document.createElement("div");
    OuterImageContainer.setAttribute('id', 'outerImageContainer');
    LightboxDiv.appendChild(OuterImageContainer);

    var ImageContainer = document.createElement("div");
    ImageContainer.setAttribute('id', 'imageContainer');
    OuterImageContainer.appendChild(ImageContainer);

    var LightboxImage = document.createElement("img");
    LightboxImage.setAttribute('id', 'lightboxImage');
    ImageContainer.appendChild(LightboxImage);

    if (!settings.use_alt_layout) {
      var HoverNav = document.createElement("div");
      HoverNav.setAttribute('id', 'hoverNav');
      ImageContainer.appendChild(HoverNav);

      var PrevLink = document.createElement("a");
      PrevLink.setAttribute('id', 'prevLink');
      PrevLink.setAttribute('href', '#');
      HoverNav.appendChild(PrevLink);

      var NextLink = document.createElement("a");
      NextLink.setAttribute('id', 'nextLink');
      NextLink.setAttribute('href', '#');
      HoverNav.appendChild(NextLink);

      var Loading = document.createElement("div");
      Loading.setAttribute('id', 'loading');
      ImageContainer.appendChild(Loading);

      var LoadingLink = document.createElement("a");
      LoadingLink.setAttribute('id', 'loadingLink');
      LoadingLink.setAttribute('href', '#');
      Loading.appendChild(LoadingLink);

      var ImageDataContainer = document.createElement("div");
      ImageDataContainer.setAttribute('id', 'imageDataContainer');
      ImageDataContainer.className = 'clearfix';
      LightboxDiv.appendChild(ImageDataContainer);

      var ImageData = document.createElement("div");
      ImageData.setAttribute('id', 'imageData');
      ImageDataContainer.appendChild(ImageData);

      var ImageDetails = document.createElement("div");
      ImageDetails.setAttribute('id', 'imageDetails');
      ImageData.appendChild(ImageDetails);

      var Caption = document.createElement("span");
      Caption.setAttribute('id', 'caption');
      ImageDetails.appendChild(Caption);

      var NumberDisplay = document.createElement("span");
      NumberDisplay.setAttribute('id', 'numberDisplay');
      ImageDetails.appendChild(NumberDisplay);

      var BottomNav = document.createElement("div");
      BottomNav.setAttribute('id', 'bottomNav');
      ImageData.appendChild(BottomNav);

      var BottomNavCloseLink = document.createElement("a");
      BottomNavCloseLink.setAttribute('id', 'bottomNavClose');
      BottomNavCloseLink.setAttribute('href', '#');
      BottomNav.appendChild(BottomNavCloseLink);

      var BottomNavZoomLink = document.createElement("a");
      BottomNavZoomLink.setAttribute('id', 'bottomNavZoom');
      BottomNavZoomLink.setAttribute('href', '#');
      BottomNav.appendChild(BottomNavZoomLink);

      var BottomNavZoomOutLink = document.createElement("a");
      BottomNavZoomOutLink.setAttribute('id', 'bottomNavZoomOut');
      BottomNavZoomOutLink.setAttribute('href', '#');
      BottomNav.appendChild(BottomNavZoomOutLink);

    }

    // new layout
    else {
      var Loading = document.createElement("div");
      Loading.setAttribute('id', 'loading');
      ImageContainer.appendChild(Loading);

      var LoadingLink = document.createElement("a");
      LoadingLink.setAttribute('id', 'loadingLink');
      LoadingLink.setAttribute('href', '#');
      Loading.appendChild(LoadingLink);

      var ImageDataContainer = document.createElement("div");
      ImageDataContainer.setAttribute('id', 'imageDataContainer');
      ImageDataContainer.className = 'clearfix';
      LightboxDiv.appendChild(ImageDataContainer);

      var ImageData = document.createElement("div");
      ImageData.setAttribute('id', 'imageData');
      ImageDataContainer.appendChild(ImageData);

      var HoverNav = document.createElement("div");
      HoverNav.setAttribute('id', 'hoverNav');
      ImageData.appendChild(HoverNav);

      var PrevLink = document.createElement("a");
      PrevLink.setAttribute('id', 'prevLink');
      PrevLink.setAttribute('href', '#');
      HoverNav.appendChild(PrevLink);

      var NextLink = document.createElement("a");
      NextLink.setAttribute('id', 'nextLink');
      NextLink.setAttribute('href', '#');
      HoverNav.appendChild(NextLink);

      var ImageDetails = document.createElement("div");
      ImageDetails.setAttribute('id', 'imageDetails');
      ImageData.appendChild(ImageDetails);

      var Caption = document.createElement("span");
      Caption.setAttribute('id', 'caption');
      ImageDetails.appendChild(Caption);

      var NumberDisplay = document.createElement("span");
      NumberDisplay.setAttribute('id', 'numberDisplay');
      ImageDetails.appendChild(NumberDisplay);

      var BottomNav = document.createElement("div");
      BottomNav.setAttribute('id', 'bottomNav');
      ImageContainer.appendChild(BottomNav);

      var BottomNavCloseLink = document.createElement("a");
      BottomNavCloseLink.setAttribute('id', 'bottomNavClose');
      BottomNavCloseLink.setAttribute('href', '#');
      BottomNav.appendChild(BottomNavCloseLink);

      var BottomNavZoomLink = document.createElement("a");
      BottomNavZoomLink.setAttribute('id', 'bottomNavZoom');
      BottomNavZoomLink.setAttribute('href', '#');
      BottomNav.appendChild(BottomNavZoomLink);

      var BottomNavZoomOutLink = document.createElement("a");
      BottomNavZoomOutLink.setAttribute('id', 'bottomNavZoomOut');
      BottomNavZoomOutLink.setAttribute('href', '#');
      BottomNav.appendChild(BottomNavZoomOutLink);
    }



    $("#overlay").click(function() { Lightbox.end(); } ).hide();
    $("#lightbox").click(function() { Lightbox.end();} ).hide();
    $("#loadingLink").click(function() { Lightbox.end(); return false;} );
    $('#prevLink').click(function() { Lightbox.changeImage(Lightbox.activeImage - 1); return false; } );
    $('#nextLink').click(function() { Lightbox.changeImage(Lightbox.activeImage + 1); return false; } );
    $("#bottomNavClose").click(function() { Lightbox.end(); return false; } );
    $("#bottomNavZoom").click(function() { Lightbox.changeImage(Lightbox.activeImage, 'TRUE'); return false; } );
    $("#bottomNavZoomOut").click(function() { Lightbox.changeImage(Lightbox.activeImage, 'FALSE'); return false; } );

    // Fix positioning of Prev and Next links.
    $('#prevLink').css({ paddingTop: Lightbox.borderSize});
    $('#nextLink').css({ paddingTop: Lightbox.borderSize});

    // Force navigation links to always be displayed
    if (settings.force_show_nav) {
      $('#prevLink').addClass("force_show_nav");
      $('#nextLink').addClass("force_show_nav");
    }

  },
 
  // updateImageList()
  // Loops through anchor tags looking for 'lightbox' references and applies
  // onclick events to appropriate links. You can rerun after dynamically adding
  // images w/ajax.
  updateImageList : function() {

    // attach lightbox to any links with rel 'lightbox'
    var anchors = $('a');
    var areas = $('area');

    // loop through all anchor tags
    for (var i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      var relAttribute = String(anchor.rel);

      // use the string.match() method to catch 'lightbox' references in the rel
      // attribute
      if (anchor.href && (relAttribute.toLowerCase().match('lightbox'))) {
        anchor.onclick = function() { Lightbox.start(this); return false; };
      }
    }

    // loop through all area tags
    // todo: combine anchor & area tag loops
    for (var i = 0; i < areas.length; i++) {
      var area = areas[i];
      var relAttribute = String(area.rel);

      // use the string.match() method to catch 'lightbox' references in the rel
      // attribute
      if (area.href && (relAttribute.toLowerCase().match('lightbox'))) {
        area.onclick = function() { Lightbox.start(this); return false; };
      }
    }
  },

  // start()
  // Display overlay and lightbox. If image is part of a set, add siblings to 
  // imageArray.
  start: function(imageLink) {

    // replaces hideSelectBoxes() and hideFlash() calls in original lightbox2
    $("select, embed, object").hide();
    
    // stretch overlay to fill page and fade in
    var arrayPageSize = Lightbox.getPageSize();
    $("#overlay").hide().css({
      width: '100%',
      zIndex: '10090',
      height: arrayPageSize[1] + 'px', 
      opacity : Lightbox.overlayOpacity
    }).fadeIn();

    Lightbox.imageArray = [];
    imageNum = 0;  

    var anchors = $(imageLink.tagName);
   
    // if image is NOT part of a set..
    if ((imageLink.rel == 'lightbox')) {
      // add single image to imageArray
      Lightbox.imageArray.push(new Array(imageLink.href, imageLink.title));

    }
    else {
      // if image is part of a set..

      // loop through anchors, find other images in set, and add them to imageArray
      for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        if (anchor.href && (anchor.rel == imageLink.rel)) {
          Lightbox.imageArray.push(new Array(anchor.href, anchor.title));
        }
      }

      // remove duplicates
      for (i = 0; i < Lightbox.imageArray.length; i++) {
        for (j = Lightbox.imageArray.length-1; j > i; j--) {        
          if (Lightbox.imageArray[i][0] == Lightbox.imageArray[j][0]) {
            Lightbox.imageArray.splice(j,1);
          }
        }
      }
      while (Lightbox.imageArray[imageNum][0] != imageLink.href) {
        imageNum++;
      }
    }

    // calculate top and left offset for the lightbox 
    var arrayPageScroll = Lightbox.getPageScroll();
    var lightboxTop = arrayPageScroll[1] + (arrayPageSize[3] / 10);
    var lightboxLeft = arrayPageScroll[0];
    $('#lightbox').css({
      zIndex: '10500',
      top: lightboxTop + 'px', 
      left: lightboxLeft + 'px'
    }).show();
    
    Lightbox.changeImage(imageNum);
  },

  // changeImage()
  // Hide most elements and preload image in preparation for resizing image 
  // container.
  changeImage: function(imageNum, zoom) {

    if (this.inprogress === false) {
      this.inprogress = true;

      var settings = Drupal.settings.lightbox2;
      if (settings.disable_zoom) {
        zoom = "TRUE";
      }

      Lightbox.activeImage = imageNum; // update global var

      // hide elements during transition
      $('#loading').css({zIndex: '10500'}).show();
      $('#lightboxImage').hide();
      $('#hoverNav').hide();
      $('#prevLink').hide();
      $('#nextLink').hide();
      $('#imageDataContainer').hide();
      $('#numberDisplay').hide();  
      $('#bottomNavZoom').hide();
      $('#bottomNavZoomOut').hide();
    
      imgPreloader = new Image();
      imgPreloader.onerror = function() { Lightbox.imgNodeLoadingError(this) };

      // once image is preloaded, resize image container
      if (zoom == "TRUE") {
        imgPreloader.onload = function() {
          var photo = document.getElementById('lightboxImage');
          photo.src = Lightbox.imageArray[Lightbox.activeImage][0];
          photo.style.width = (imgPreloader.width) + 'px';
          Lightbox.resizeImageContainer(imgPreloader.width, imgPreloader.height);
          // clear onLoad, IE behaves irratically with animated gifs otherwise
          imgPreloader.onload = function() {}; 
        };
        $('#bottomNavZoom').hide();
        if (!settings.disable_zoom) {
          $('#bottomNavZoomOut').css({zIndex: '10500'}).show();
        }

      }
      else {
        // image is very large, so show a smaller version of the larger image 
        // with zoom button
        imgPreloader.onload = function() {
          var photo = document.getElementById('lightboxImage');
          photo.src = Lightbox.imageArray[Lightbox.activeImage][0];

          // resize code
          var arrayPageSize = Lightbox.getPageSize();
          var targ = { w:arrayPageSize[2] - (Lightbox.borderSize * 2), h:arrayPageSize[3] - (Lightbox.borderSize * 6) - (Lightbox.infoHeight * 4)- (arrayPageSize[3] / 10) };
          var orig = { w:imgPreloader.width, h:imgPreloader.height };
          var ratio = 1.0; // shrink image with the same aspect
          $('#bottomNavZoomOut').hide();
          $('#bottomNavZoom').hide();
          if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w) {
            ratio = ((targ.w / orig.w) < (targ.h / orig.h)) ? targ.w / orig.w : targ.h / orig.h;
            $('#bottomNavZoom').css({zIndex: '10500'}).show();
          }
          var new_width  = Math.floor(orig.w * ratio);
          var new_height = Math.floor(orig.h * ratio);
          photo.style.width = (new_width) + 'px';

          Lightbox.resizeImageContainer(new_width, new_height);

          // clear onLoad, IE behaves irratically with animated gifs otherwise
          imgPreloader.onload = function() {}; 
        };

      }
      imgPreloader.src = Lightbox.imageArray[Lightbox.activeImage][0];
    }
  },

  // imgNodeLoadingError()
  imgNodeLoadingError: function(image) {
    var settings = Drupal.settings.lightbox2;
    var original_image = Lightbox.imageArray[Lightbox.activeImage][0];
    if (settings.display_image_size != "") {
      original_image = original_image.replace(new RegExp("."+settings.display_image_size), "");
    }
    Lightbox.imageArray[Lightbox.activeImage][0] = original_image;
    image.onerror = function() { Lightbox.imgLoadingError(image) };
    image.src = original_image;
  },

  // imgLoadingError()
  imgLoadingError: function(image) {
    var settings = Drupal.settings.lightbox2;
    Lightbox.imageArray[Lightbox.activeImage][0] = settings.default_image;
    image.src = settings.default_image;
  },

  // resizeImageContainer()
  resizeImageContainer: function(imgWidth, imgHeight) {

    // get current width and height
    this.widthCurrent = $('#outerImageContainer').width();
    this.heightCurrent = $('#outerImageContainer').height();

    // get new width and height
    var widthNew = (imgWidth  + (Lightbox.borderSize * 2));
    var heightNew = (imgHeight  + (Lightbox.borderSize * 2));

    // scalars based on change from old to new
    this.xScale = ( widthNew / this.widthCurrent) * 100;
    this.yScale = ( heightNew / this.heightCurrent) * 100;

    // calculate size difference between new and old image, and resize if 
    // necessary
    wDiff = this.widthCurrent - widthNew;
    hDiff = this.heightCurrent - heightNew;

    $('#outerImageContainer').animate({width: widthNew, height: heightNew}, 'linear', function() {
      Lightbox.showImage();
    });


    // if new and old image are same size and no scaling transition is necessary
    // do a quick pause to prevent image flicker.
    if ((hDiff === 0) && (wDiff === 0)) {
      if (navigator.appVersion.indexOf("MSIE") != -1) {
        Lightbox.pause(250);
      }
      else {
        Lightbox.pause(100);
      }
    }

    var settings = Drupal.settings.lightbox2;
    if (!settings.use_alt_layout) {
      $('#prevLink').css({height: imgHeight + 'px'});
      $('#nextLink').css({height: imgHeight + 'px'});
    }
    $('#imageDataContainer').css({width: widthNew + 'px'});

  },
 
  // showImage()
  // Display image and begin preloading neighbors.
  showImage: function() {
    $('#loading').hide();
    if($.browser.safari) {
      $('#lightboxImage').css({zIndex: '10500'}).show();
    }
    else {
      $('#lightboxImage').css({zIndex: '10500'}).fadeIn(Lightbox.fadeInSpeed);
    }
    Lightbox.updateDetails();
    this.preloadNeighborImages();
    this.inprogress = false;
  },

  // updateDetails()
  // Display caption, image number, and bottom nav.
  updateDetails: function() {

    $("#imageDataContainer").hide();

    // if caption is not null
    if (Lightbox.imageArray[Lightbox.activeImage][1]) {
      $('#caption').html(Lightbox.imageArray[Lightbox.activeImage][1]).css({zIndex: '10500'}).show();
    }
    else {
      $('#caption').hide();
    }
    
    // if image is part of set display 'Image x of x' 
    if (Lightbox.imageArray.length > 1) {
      var settings = Drupal.settings.lightbox2;
      var numberDisplay = settings.image_count.replace(/\!current/, eval(Lightbox.activeImage + 1)).replace(/\!total/, Lightbox.imageArray.length);
      $('#numberDisplay').html(numberDisplay).css({zIndex: '10500'}).show();
    }

    $("#imageDataContainer").hide().slideDown(Lightbox.slideDownSpeed);
    if (Lightbox.rtl) {
      $("#bottomNav").css({float: 'left'});
    }
    var arrayPageSize = Lightbox.getPageSize();
    $('#overLay').css({height: arrayPageSize[1] + 'px'});
    Lightbox.updateNav();
  },

  // updateNav()
  // Display appropriate previous and next hover navigation.
  updateNav: function() {

    $('#hoverNav').css({zIndex: '10500'}).show();    

    // if not first image in set, display prev image button
    if (Lightbox.activeImage !== 0) {
      $('#prevLink').css({zIndex: '10500'}).show().click(function() {
        Lightbox.changeImage(Lightbox.activeImage - 1); return false;
      });
    }
    // safari browsers need to have hide() called again
    else {
      $('#prevLink').hide();
    }

    // if not last image in set, display next image button
    if (Lightbox.activeImage != (Lightbox.imageArray.length - 1)) {
      $('#nextLink').css({zIndex: '10500'}).show().click(function() {
        Lightbox.changeImage(Lightbox.activeImage + 1); return false;
      });
    }
    // safari browsers need to have hide() called again
    else {
      $('#nextLink').hide();
    }
    
    this.enableKeyboardNav();
  },


  // enableKeyboardNav()
  enableKeyboardNav: function() {
    document.onkeydown = this.keyboardAction; 
  },

  // disableKeyboardNav()
  disableKeyboardNav: function() {
    document.onkeydown = '';
  },

  // keyboardAction()
  keyboardAction: function(e) {
    if (e === null) { // ie
      keycode = event.keyCode;
      escapeKey = 27;
    }
    else { // mozilla
      keycode = e.keyCode;
      escapeKey = e.DOM_VK_ESCAPE;
    }

    key = String.fromCharCode(keycode).toLowerCase();
    
    // close lightbox
    if (key == 'x' || key == 'o' || key == 'c' || keycode == escapeKey) {
      Lightbox.end();

    // display previous image (p, <-)
    }
    else if (key == 'p' || keycode == 37) {
      if (Lightbox.activeImage !== 0) {
        Lightbox.disableKeyboardNav();
        Lightbox.changeImage(Lightbox.activeImage - 1);
      }

    // display next image (n, ->, space)
    }
    else if (key == 'n' || keycode == 39 || keycode == 32) {
      if (Lightbox.activeImage != (Lightbox.imageArray.length - 1)) {
        Lightbox.disableKeyboardNav();
        Lightbox.changeImage(Lightbox.activeImage + 1);
      }
    }
  },

  preloadNeighborImages: function() {

    if ((Lightbox.imageArray.length - 1) > Lightbox.activeImage) {
      preloadNextImage = new Image();
      preloadNextImage.src = Lightbox.imageArray[Lightbox.activeImage + 1][0];
    }
    if (Lightbox.activeImage > 0) {
      preloadPrevImage = new Image();
      preloadPrevImage.src = Lightbox.imageArray[Lightbox.activeImage - 1][0];
    }
   
  },

  end: function() {
    this.disableKeyboardNav();
    $('#lightbox').hide();
    $("#overlay").fadeOut();
    // replaces calls to showSelectBoxes() and showFlash() in original lightbox2
    $("select[display!='none'], object[display!='none'], embed[display!='none']").show();
  },



  // getPageScroll()
  // Returns array with x,y page scroll values.
  // Core code from - quirksmode.com
  getPageScroll : function() {
    
    var xScroll, yScroll;

    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    }
    else if (document.documentElement && document.documentElement.scrollTop) {  // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    }
    else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft; 
    }

    arrayPageScroll = new Array(xScroll,yScroll);
    return arrayPageScroll;
  },
 
  // getPageSize()
  // Returns array with page width, height and window width, height
  // Core code from - quirksmode.com
  // Edit for Firefox by pHaez
  getPageSize : function() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) { 
      xScroll = window.innerWidth + window.scrollMaxX;
      yScroll = window.innerHeight + window.scrollMaxY;
    }
    else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
      xScroll = document.body.scrollWidth;
      yScroll = document.body.scrollHeight;
    }
    else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
      xScroll = document.body.offsetWidth;
      yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;

    if (self.innerHeight) { // all except Explorer
      if (document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth; 
      }
      else {
        windowWidth = self.innerWidth;
      }
      windowHeight = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    }
    else if (document.body) { // other Explorers
      windowWidth = document.body.clientWidth;
      windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
      pageHeight = windowHeight;
    }
    else { 
      pageHeight = yScroll;
    }


    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) { 
      pageWidth = xScroll;  
    }
    else {
      pageWidth = windowWidth;
    }

    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
    return arrayPageSize;
  },


  // pause(numberMillis)
  pause : function(ms) {
    var date = new Date();
    curDate = null;
    do { var curDate = new Date(); }
    while (curDate - date < ms);
  }
};

// initialize the lightbox
if (Drupal.jsEnabled) {
  $(document).ready(function(){
    Lightbox.initialize();
  });
}
