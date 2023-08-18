$(function(){
      var aptData, displayData, sortBy, sortDir;
      sortBy='aptDate';
      sortDir='asc';
    
      //FUNCTION 
      function removeApt(aptID){
        var whichApt = _.find(aptData,function(item){
          return item.id == aptID;
        });
        aptData =_.without(aptData,whichApt);
        displayData =_.without(displayData,whichApt);
      }

      $.addTemplateFormatter('formatDate',function(value){
        return $.format.date(new Date(value),'MM/dd hh:mm p')
      });

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
      displayData = aptData = data;
      listAppointments(aptData);
      
    });


    // EVENTS
    $('#addApt').on('click', function(){
      $('.card-body').toggle(300);
    }); // click on add appointment


    $('.sort-menu .dropdown-item').on('click', function(){
      var sortDropdown = $(this).attr('id');
      switch (sortDropdown){
        case'sort-patientName' : 
          $('.sort-by').removeClass('active');
          sortBy = 'patientName'; break;
        case'sort-patientAddress' : 
          $('.sort-by').removeClass('active');
          sortBy = 'patientAddress'; break;
        case'sort-aptDate' : 
          $('.sort-by').removeClass('active');
          sortBy = 'aptDate'; break;
        case'sort-asc' : 
          $('.sort-dir').removeClass('active');
          sortBy = 'asc'; break;
        case'sort-desc' : 
          $('.sort-dir').removeClass('active');
          sortBy = 'desc'; break;
      }
      $(this).addClass('active');
      listAppointments(displayData);
    });

    //Typed in search box
    $('#SearchApts').keyup(function(){
      var searchText = $(this).val();
      displayData =_.filter(aptData,function(item){
        return(
          item.patientName.toLowerCase().match(searchText.toLowerCase()) ||
          item.patientAddress.toLowerCase().match(searchText.toLowerCase()) ||
          item.aptNotes.toLowerCase().match(searchText.toLowerCase())
        )
      });//filter
      listAppointments(displayData);
    }); //keyup on search

    //Add new Appointment.
    $('#aptForm').submit(function(e){
      var newItem ={};
      e.preventDefault();
      newItem.patientName = $('#patientName').val();
      newItem.patientAddress = $('#patientAddress').val();
      newItem.aptNotes= $('#aptNotes').val();
      newItem.aptDate= $('#aptDate').val();

      aptData.push(newItem);
      listAppointments(displayData);
      $('#aptForm')[0].reset();
      $('.card-body').hide(300);
    });



}); // Document is ready

