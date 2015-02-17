var $aaa = $('.aaa');
$aaa.each(function(){
  var $self = $(this);
  var timing = $self.attr('data-launch');

  setTimeout(function(){
    $self.addClass('a');
  }, timing);
});