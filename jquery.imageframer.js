(function($) {
  $.fn.frameIt = function(options) {
  
    settings = $.extend({
      frameColor: '#000000',
      frameWidth: 20,
      matteColor: '#555555',
      matteBorder: {
        x: '10%',
        y: '10%'
      },
      innerColor: '#ffffff',
      innerWidth: 3,
      imageHeight: 0,
      imageWidth: 0
    }, options );
    
  
    return this.each(function() {
    
      if (!$(this).is('img')) {
        return;
      }
      
      var $image = $(this);      
      $image.load(function(e) {
        $image.wrap('<div class="frame-matte"></div>');
        var w = Math.max($image.width(), settings.imageWidth);
        var h = Math.max($image.height(), settings.imageHeight);
        var matte = new Object();
        if (settings.matteBorder.x.match(/%/)) {
          matte.leftBorder = w * parseFloat(settings.matteBorder.x.replace('%', ''))/100.0
        } else {
          matte.leftBorder = parseInt(settings.matteBorder.x.replace('px', ''))
        }
        if (settings.matteBorder.y.match(/%/)) {
          matte.topBorder = h * parseFloat(settings.matteBorder.y.replace('%', ''))/100.0
        } else {
          matte.topBorder = parseInt(settings.matteBorder.y.replace('px', ''))
        }
        matte.w = w + (2 * matte.leftBorder)
        matte.h = h + (2 * matte.topBorder)
        $image.parent().css({ 'width': (matte.w + 2*settings.frameWidth) + 'px', 'height': (matte.h + 2*settings.frameWidth) + 'px', 'position': 'relative', 'background-color': settings.matteColor, 'border-width': settings.frameWidth + 'px', 'border-color': settings.frameColor, 'border-style' : 'solid'  });
        $image.css({ 'position': 'absolute', 'left': (matte.leftBorder + settings.frameWidth - settings.innerWidth) + 'px', 'top': (matte.topBorder + settings.frameWidth - settings.innerWidth) + 'px', 'border-width': settings.innerWidth + 'px', 'border-color': settings.innerColor, 'border-style' : 'solid'    });
      });       
    });
  }
} (jQuery));