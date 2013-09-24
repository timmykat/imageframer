(function($) {
  $.fn.frameIt = function(options) {
  
    settings = $.extend({
      frameColor: '#000000',
      frameWidth: 20,
      matteColor: '#555555',
      matteBorder: {
        xpct: 0.10,
        ypct: 0.10
      },
      innerColor: '#ffffff',
      innerWidth: 3
    }, options );
    
  
    return this.each(function() {
    
      if (!$(this).is('img')) {
        return;
      }
      
      var $image = $(this);      
      $image.load(function() {
        var thisImage = 'image-' + $('.frame-matte').length;
        $image.wrap('<div id="' + thisImage + '" class="frame-matte"></div>');
        var w = $image.width();
        var h = $image.height();
        var matte = new Object();
        matte.leftBorder = w * settings.matteBorder.xpct
        matte.topBorder = h * settings.matteBorder.ypct
        matte.w = w + (2 * matte.leftBorder)
        matte.h = h + (2 * matte.topBorder)
        console.log(matte)
        $('#' + thisImage).css({ 'width': (matte.w + 2*settings.frameWidth) + 'px', 'height': (matte.h + 2*settings.frameWidth) + 'px', 'position': 'relative', 'background-color': settings.matteColor, 'border-width': settings.frameWidth + 'px', 'border-color': settings.frameColor, 'border-style' : 'solid'  });
        $image.css({ 'position': 'absolute', 'left': (matte.leftBorder + settings.frameWidth - settings.innerWidth) + 'px', 'top': (matte.topBorder + settings.frameWidth - settings.innerWidth) + 'px', 'border-width': settings.innerWidth + 'px', 'border-color': settings.innerColor, 'border-style' : 'solid'    });
      });       
    });
  }
} (jQuery));