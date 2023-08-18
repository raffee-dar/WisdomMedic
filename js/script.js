$(function(){
  var aptData, displayData, sortBy, sortDir;

  // EVENTS
  $('#addApt').on('click', function(){
    $('.card-body').toggle(300);
  });

  //FUNCTION 
  function removeApt(aptID){
    var whichApt = _.find(aptData,function(item){
      return item.id == aptID;
    });
    aptData =_.without(aptData,whichApt);
  }

//READ DATA
$.ajax({
  url: 'js/data.json'
}).done(function(data) {
  aptData = data;
  
  $('#patList').loadTemplate('appointment-list.html',data,{
    complete: function(){
      $('.pet-delete').on('click',function(){
        $(this).parents('.pet-item').hide(300, function(){
          var whichItem = $(this).attr('id');
          removeApt(whichItem);
         // data.splice(Number(whichItem),1);
          console.log(aptData);
          $(this).remove();

        })
      }); //delete apt
    }
  });//load template

});


}); //ajax loaded

