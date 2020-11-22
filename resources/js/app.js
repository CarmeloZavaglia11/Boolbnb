// GENERAL IMPORT
require('./bootstrap');
require('chart.js/dist/Chart.min.js');
import WOW from 'wowjs';
import Typed from 'typed.js';
new WOW.WOW().init();
//------//

// PROVA ALGOLIA

$(document).ready(function() {

    if (window.location.pathname == '/'|| window.location.pathname == '/host/firstapartment/create') {
        
        // ALGOLIA INDEX

        var typed = new Typed('#smart-write', {
            strings: ["Benvenuti in ^1000 BoolBNB", "Cerca l'appartamento dei tuoi sogni!"],
            typeSpeed: 70,
            smartBackspace: true,
            backSpeed: 70,
            showCursor: false
          });          

        var placesAutocomplete = places({
            appId: 'pl19ZMXZ5X0L',
            apiKey: '035a9540a189547cb9889a73bf507a48',
            container: document.querySelector('#address-input')
        });
        
        placesAutocomplete.on('change', function(e) {

            $('#cordinates').val([e.suggestion.latlng.lat,e.suggestion.latlng.lng]);
    
        });

    }

    if (window.location.pathname == '/search') {

      var placesAutocomplete = places({
          appId: 'pl19ZMXZ5X0L',
          apiKey: '035a9540a189547cb9889a73bf507a48',
          container: document.querySelector('#address-input')
      });

      // MARKER APPARTAMENTI MAPPA

      var apartments = $('.card_apartment_search');

      var arrayApartments = [];

      for (let i = 0; i < apartments.length; i++) {
        arrayApartments.push({lat : apartments[i].dataset.lat, lng : apartments[i].dataset.lng});
      }
      
      mapShow($('#map_container').data('lat'),$('#map_container').data('lng'),arrayApartments);

      //----------------//

      placesAutocomplete.on('change', function(e) {

        $('#cordinates').val([e.suggestion.latlng.lat,e.suggestion.latlng.lng]);
        callApiApartmentSearch();
      });
      
      $('input').on('change',function() {

        

        callApiApartmentSearch();

      });

      // API CALL
      function callApiApartmentSearch() {
        $.ajax({
          method: 'GET',
          url: 'http://localhost:8000/api/search',
          data: {
            'stanze' : $('input[name=stanze]').val(), 
            'services' : $('input[name=services').val(),
            'postiletto' : $('input[name=postiletto]').val(),
            'range' : $('input[name=range]').val(),
            'address' : $('input[name=address]').val(),
            'cordinates' : $('input[name=cordinates]').val(),
          },
          success: function(data) {


            $('.bs-example').empty();


            refreshApartments(data);
          }
        });
      }

      function refreshApartments(data) {
        
        var source = $('#template').html();
        var template = Handlebars.compile(source);
        
        var apartments = data.apartments.data;
    
        console.log(apartments);

  
        apartments.forEach(apartment => {
          var context = {
            latitude: apartment.latitude,
            longitude: apartment.longitude,
            title: apartment.title,
            description: apartment.description,
            cover: apartment.imgurl
          };

          var html = template(context);



          $('.bs-example').append(html);
          
        });
        // for (var i = 0; i < apartments.lenght; i++) {
      
        //   var context = {
        //     latitude: apartments[i].latitude,
        //     longitude: apartments[i].longitude,
        //     title: apartments[i].title,
        //     description: apartments[i].description,
        //     cover: apartments[i].imgurl
        //   };

        //   var html = template(context);



        //   $('.bs-example').append(html);
          
        // }

      }



    }

    // MAPPA SHOW

    mapShow($('.card_show').data('lat'),$('.card_show').data('lng'));

    function mapShow(lat,lng,apartments) {    

        const map = L.map("map_container").setView([lat,lng], 13);

        var osmLayer = new L.TileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              minZoom: 1,
              maxZoom: 13,
              attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            }
        );

        map.addLayer(osmLayer);

        if (window.location.pathname != '/search') {
          L.marker([lat, lng]).addTo(map); 
        }

        if (apartments) {
          
          for (let i = 0; i < apartments.length; i++) {

            var marker = L.marker(apartments[i]);
            marker.addTo(map);
    
          }

        }
    
        return map;
    }


});

$(document).on('click','img.leaflet-marker-icon', function() {

  

});

//---//
