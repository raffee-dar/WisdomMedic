$(function(){
  var aptData, displayData, sortBy, sortDir;
  sortBy='aptDate';
  sortDir='asc';
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

  function listAppointments(info){
    info = (sortDir ==='asc') ? _.sortBy(info,sortBy):_.sortBy(info,sortBy).reverse();

    $('#patList').loadTemplate('appointment-list.html',info,{
      complete: function(){
        $('.pet-delete').on('click',function(){
          $(this).parents('.pet-item').hide(300, function(){
            var whichItem = $(this).attr('id');
            removeApt(whichItem);
            console.log(aptData);
            $(this).remove();
  
          })
        }); //delete apt
      }
    });//load template  
  }

//READ DATA
$.ajax({
  url: 'js/data.json'
}).done(function(data) {
  aptData = data;
  listAppointments(aptData);
  
});


}); //ajax loaded

