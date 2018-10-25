(function() {
  'use strict';

  /**
   * @category Google Maps
   * @categoryTags Mapas|maps
   */
  this.cronapi.maps = {};
  
  
  /**
   * @type function
   * @name {{isInitialized}}
   * @nameTags map|init|iniciar|mapa|google|inicializado|initialize
   * @description {{isInitializedDescription}}
   * @returns {ObjectType.BOOLEAN}
   */
  this.cronapi.maps.isInitialized = function(/** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id) {
        return (document.getElementById(id)._map && document.getElementById(id)._map.started) ? true : false;
  };

  /**
   * @type function
   * @name {{initMap}}
   * @nameTags map|init|iniciar|mapa|google
   * @description {{initMapDescription}}
   */
  this.cronapi.maps.init = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{typeMap}} @blockType util_dropdown @keys roadmap|hybrid|satellite|terrain  @values {{roadmap}}|{{hybrid}}|{{satellite}}|{{terrain}}  */ type, /** @type {ObjectType.OBJECT} @description {{centerPoint}} */ centerPoint, /** @type {ObjectType.STRING} @description {{zoom}} @blockType util_dropdown @keys 16|18|10  @values {{street}}|{{buildings}}|{{city}}  */ zoom, /** @type {ObjectType.STATEMENTSENDER} @description {{statement}} */ statement ) {

   $.getScript('https://maps.googleapis.com/maps/api/js?key='+$('#'+id).attr('token')+'&libraries=places,drawing', function() {
        document.getElementById(id)._map = null;
        var map = new google.maps.Map(document.getElementById(id), {     
        center: centerPoint, 
        zoom: Number.parseInt(zoom),
        mapTypeId: type,
        mapTypeControl:false,
        streetViewControl:false,
        fullscreenControl:false
      });
      map.started = true;
      document.getElementById(id)._map = map;
      statement(map);
   
   });
  };
  
   /**
   * @type function
   * @name {{centralizeMap}}
   * @nameTags map|google|centralizar|center
   * @description {{centralizeMapDescription}}
   */
  this.cronapi.maps.centralizeMap = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{latitude}} */ latitude,  /** @type {ObjectType.STRING} @description {{longitude}} */ longitude ) {
         var map = document.getElementById(id)._map;
          map.setCenter({lat: Number.parseFloat(latitude) , lng: Number.parseFloat(longitude)});
  }
  

   // Internal function to that set advancedOptions
  this.cronapi.maps.setAdvancedOptions = function(object, advancedOptions){
      if(advancedOptions){
        try{
          object.setOptions(JSON.parse(advancedOptions));
        }catch(e){
          console.log(e);
        }
      }
  }
  

  // Internal function to maps that get or create variable from map
  this.cronapi.maps.objectFromMap = function(map, objectArray, objectId){
      
    if(map[objectArray] === undefined) map[objectArray] = {};
    
    switch(objectArray){
      case 'markers':{
        if(map[objectArray][objectId] === undefined){
          map[objectArray][objectId] = new google.maps.Marker();
        }
        return map[objectArray][objectId];
      }

      case 'polylines':{
        if(map[objectArray][objectId] === undefined){
          map[objectArray][objectId] = new google.maps.Polyline();
        }
        return map[objectArray][objectId];
      }

      case 'circles':{
        if(map[objectArray][objectId] === undefined){
          map[objectArray][objectId] = new google.maps.Circle();
        }
        return map[objectArray][objectId];
      }
      case 'rectangles':{
        if(map[objectArray][objectId] === undefined){
          map[objectArray][objectId] = new google.maps.Rectangle();
        }
        return map[objectArray][objectId];
      }
      case 'polygons':{
        if(map[objectArray][objectId] === undefined){
          map[objectArray][objectId] = new google.maps.Polygon();
        }
        return map[objectArray][objectId];
      }
    }
  }
  
  
  /**
   * @type function
   * @name {{setAdvancedMapOptions}}
   * @nameTags map|marker|create|marcador|google
   * @description {{setAdvancedMapOptionsDescription}}
   */
  this.cronapi.maps.setAdvancedMapOptions = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{advancedOptions}} */ advancedOptions  ) {
      if(advancedOptions){
        try{
          var map = document.getElementById(id)._map;
          map.setOptions(JSON.parse(advancedOptions));
        }catch(e){
          console.log(e);
        }
      }
  }
  
  
    /**
   * @type function
   * @name {{createMarker}}
   * @nameTags map|marker|create|marcador|google|criar
   * @description {{createMarkerDescription}}
   */
  this.cronapi.maps.createMarker = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{markerId}} */ markerId, /** @type {ObjectType.STRING} @description {{title}} */ title, /** @type {ObjectType.STRING} @description {{point}} */ point , /** @type {ObjectType.STRING} @description {{icon}} */ icon , /** @type {ObjectType.STRING} @description {{infoWindow}} */ infoWindow , /** @type {ObjectType.STRING} @description {{advancedOptions}} */ advancedOptions  ) {

      var map = document.getElementById(id)._map;
      var marker;
      marker = this.cronapi.maps.objectFromMap(map, 'markers' , markerId );
      marker.setPosition(point);
      marker.setMap(map);
      marker.setIcon(icon);
      marker.setTitle(title);
      if(infoWindow){
        marker.info = new google.maps.InfoWindow();
        marker.info.setContent(infoWindow);
        google.maps.event.addListener(marker,'click',function(){ marker.info.open(map,marker)});
      }
      this.cronapi.maps.setAdvancedOptions(marker, advancedOptions);
  }
  
    /**
   * @type function
   * @name {{setAdvancedMarkerOptions}}
   * @nameTags map|marker|create|marcador|google
   * @description {{setAdvancedMarkerOptionsDescription}}
   */
  this.cronapi.maps.setAdvancedMarkerOptions = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{markerId}} */ markerId, /** @type {ObjectType.STRING} @description {{advancedOptions}} */ advancedOptions  ) {
      if(advancedOptions){
        try{
          var map = document.getElementById(id)._map;
          var marker;
          marker = map.markers[markerId];
          marker.setOptions(JSON.parse(advancedOptions));
        }catch(e){
          console.log(e);
        }
      }
  }
  
    /**
   * @type function
   * @name {{changeMapZoom}}
   * @nameTags map|mapa|zoom|google|editar
   * @description {{changeMapZoomDescription}}
   */
  this.cronapi.maps.changeMapZoom = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{zoom}} @blockType util_dropdown @keys 16|18|10  @values {{street}}|{{buildings}}|{{city}}  */ zoom ) {
      var map = document.getElementById(id)._map;
      map.setZoom(Number.parseInt(zoom));
  }
  
  /**
   * @type function
   * @name {{getPropertyFromMarker}}
   * @nameTags map|mapa|zoom|google|editar
   * @description {{getPropertyFromMarkerDescription}}
   * @returns {ObjectType.OBJECT}
   */
  this.cronapi.maps.getPropertyFromMarker = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{markerId}}*/ markerId, /** @type {ObjectType.STRING} @description {{markerPropertyType}} @blockType util_dropdown @keys latitude|longitude|icon|title|infoWindow  @values {{latitude}}|{{longitude}}|{{iconItem}}|{{titleItem}}|{{infoWindowItem}}  */ property ) {
    var map = document.getElementById(id)._map;
    
    switch(property){
      case 'latitude':{
        return map.markers[markerId].getPosition().lat();
      }
      case 'longitude':{
        return map.markers[markerId].getPosition().lng();
      }
      case 'icon':{
        return map._map.markers[markerId].getIcon();
      }
      case 'title':{
        return map.markers[markerId].getTitle();
      }
      case 'infoWindow':{
        return map.markers[markerId].info;
      }
    }
  }
  
  /**
   * @type function
   * @name {{createAutoComplete}}
   * @nameTags map|autoComplete|create|auto completar|google|completar
   * @description {{createAutoCompleteDescription}}
   */
  this.cronapi.maps.createAutoComplete = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{searchType}} @blockType util_dropdown @keys geocode|address|establishment  @values {{geocode}}|{{address}}|{{establishment}}  */ searchType , /** @type {ObjectType.STRING} @description {{searchBounds}} */ searchBounds, /** @type {ObjectType.STRING} @description {{isStrictSearch}} @blockType util_dropdown @keys true|false  @values {{true}}|{{false}}  */ isStrictSearch , /** @type {ObjectType.STRING} @description {{advancedOptions}} */ advancedOptions, /** @type {ObjectType.STATEMENTSENDER} @description {{statement}} */ statement ) {
      var map = document.getElementById(id)._map;
      var autoComplete = new google.maps.places.Autocomplete(document.getElementById(id));
      autoComplete.setTypes([searchType]);
      autoComplete.setOptions({
        'bounds': searchBounds,
        'strictBounds' : isStrictSearch,
        'map':map
      });
      
      autoComplete.place_changed = function(){
        statement(autoComplete);
      }
  }
  
    /**
   * @type function
   * @name {{createLatLngPoint}}
   * @nameTags map|latitude|longitude|create|point|google
   * @description {{createLatLngPointDescription}}
   * @returns {ObjectType.OBJECT}
   */
  this.cronapi.maps.createLatLngPoint = function(  /** @type {ObjectType.STRING} @description {{latitude}} */ latitude, /** @type {ObjectType.STRING} @description {{lontitude}} */ lontitude) {
      if(window.google){
      return new google.maps.LatLng( latitude, lontitude );
      }else
      return {'lat' : Number.parseFloat(latitude), 'lng' :Number.parseFloat(lontitude) };
  }
  
  /**
   * @type function
   * @name {{createLatLngBounds}}
   * @nameTags map|latitude|longitude|create|border|bounds|google
   * @description {{createLatLngBoundsDescription}}
   * @returns {ObjectType.OBJECT}
   */
  this.cronapi.maps.createLatLngBounds = function(   /** @type {ObjectType.STRING} @description {{southWestPoint}} */ southWestPoint, /** @type {ObjectType.STRING} @description {{northEastPoint}} */ northEastPoint) {
      return new google.maps.LatLngBounds( southWestPoint, northEastPoint );
  }
  
  /**
   * @type function
   * @name {{getPropertyFromAutoComplete}}
   * @nameTags map|autoComplete|create|auto completar|google|completar|property|propriedade
   * @description {{getPropertyFromAutoCompleteDescription}}
   * @returns {ObjectType.OBJECT}
   */
  this.cronapi.maps.getPropertyFromAutoComplete = function( /** @type {ObjectType.OBJECT} @description {{autoComplete}} */  autoComplete, /** @type {ObjectType.STRING} @description {{addressPropertyType}} @blockType util_dropdown @keys addressName|latitude|longitude  @values {{address}}|{{latitude}}|{{longitude}}  */ property  ) {

      switch(property){
        
        case 'addressName':{
          return autoComplete.getPlace().formatted_address;
        }
        case 'latitude':{
          return autoComplete.getPlace().geometry.location.lat();
        }
        case 'longitude':{
          return autoComplete.getPlace().geometry.location.lng();
        }
      }
  }
  
  /**
   * @type function
   * @name {{drawCircle}}
   * @nameTags map|autoComplete|create|auto completar|google|completar
   * @description {{drawCircleDescription}}
   */
  this.cronapi.maps.drawCircle = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{circleId}} */ circleId, /** @type {ObjectType.STRING} @description {{centerPoint}} */ centerPoint, /** @type {ObjectType.STRING} @description {{radiusInMeters}} */ radiusInMeters , /** @type {ObjectType.STRING} @description {{fillColor}} */ fillColor, /** @type {ObjectType.STRING} @description {{strokeColor}} */  strokeColor, /** @type {ObjectType.STRING} @description {{fillOpacity}} */ fillOpacity , /** @type {ObjectType.STRING} @description {{advancedOptions}} */ advancedOptions) {
      var map = document.getElementById(id)._map;
      var circle;
      circle = this.cronapi.maps.objectFromMap(map, 'circles' , circleId );
      circle.setOptions(
        {'center':  centerPoint ,
        'map': map , 
        'radius': Number.parseInt(radiusInMeters) , 
        'fillColor': fillColor , 
        'strokeColor' : strokeColor , 
        'fillOpacity': fillOpacity 
        });
      this.cronapi.maps.setAdvancedOptions(circle, advancedOptions);
  }
  
  
    /**
   * @type function
   * @name {{drawRectangle}}
   * @nameTags map|autoComplete|create|draw|polygon|rectangle|google
   * @description {{drawRectangleDescription}}
   */
  this.cronapi.maps.drawRectangle = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{rectangleId}} */ rectId, /** @type {ObjectType.STRING} @description {{bounds}} */ bounds,  /** @type {ObjectType.STRING} @description {{fillColor}} */ fillColor, /** @type {ObjectType.STRING} @description {{strokeColor}} */  strokeColor, /** @type {ObjectType.STRING} @description {{fillOpacity}} */ fillOpacity , /** @type {ObjectType.STRING} @description {{advancedOptions}} */ advancedOptions) {
      var map = document.getElementById(id)._map;
      var rect;
      rect = this.cronapi.maps.objectFromMap(map, 'rectangles' , rectId );
      rect.setOptions(
        {'bounds':  bounds ,
        'map': map , 
        'fillColor': fillColor , 
        'strokeColor' : strokeColor , 
        'fillOpacity': fillOpacity 
        });
      this.cronapi.maps.setAdvancedOptions(rect, advancedOptions);
        
  }
  
  /**
   * @type function
   * @name {{drawLine}}
   * @nameTags map|autoComplete|create|auto completar|google|completar
   * @description {{drawLineDescription}}
   */
  this.cronapi.maps.drawLine = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{polylineId}} */ polylineId, /** @type {ObjectType.STRING} @description {{coordsPath}} */ coordsPath, /** @type {ObjectType.STRING} @description {{strokeColor}} */  strokeColor, /** @type {ObjectType.STRING} @description {{strokeOpacity}} */ strokeOpacity, /** @type {ObjectType.STRING} @description {{advancedOptions}} */ advancedOptions) {
      var map = document.getElementById(id)._map;
      var polyline;
      polyline = this.cronapi.maps.objectFromMap(map, 'polylines' , polylineId );
      polyline.setPath(coordsPath);
      polyline.setMap(map);
      polyline.setOptions({
        'path': coordsPath,
        'map': map,
        'strokeColor' : strokeColor,
        'strokeOpacity' : strokeOpacity
      });
      this.cronapi.maps.setAdvancedOptions(polyline, advancedOptions);
    
  }
  
  /**
   * @type function
   * @name {{drawPolygon}}
   * @nameTags map|create|polygon|google|completar
   * @description {{drawPolygonDescription}}
   */
  this.cronapi.maps.drawPolygon = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.STRING} @description {{polygonId}} */ polygonId, /** @type {ObjectType.STRING} @description {{coordsPath}} */ coordsPath, /** @type {ObjectType.STRING} @description {{fillColor}} */  fillColor, /** @type {ObjectType.STRING} @description {{fillOpacity}} */  fillOpacity, /** @type {ObjectType.STRING} @description {{strokeColor}} */  strokeColor, /** @type {ObjectType.STRING} @description {{strokeOpacity}} */ strokeOpacity, /** @type {ObjectType.STRING} @description {{advancedOptions}} */ advancedOptions) {
      var map = document.getElementById(id)._map;
      var polygon;
      polygon = this.cronapi.maps.objectFromMap(map, 'polygons' , polygonId );
      polygon.setPath(coordsPath);
      polygon.setMap(map);
      polygon.setOptions({
        'path': coordsPath,
        'map': map,
        'fillColor': fillColor , 
        'fillOpacity': fillOpacity ,
        'strokeColor' : strokeColor,
        'strokeOpacity' : strokeOpacity
      });
      this.cronapi.maps.setAdvancedOptions(polygon, advancedOptions);
  }
  
  
    /**
   * @type function
   * @name {{geocoder}}
   * @nameTags map|create|geocoder|google|geocodificar
   * @description {{geocoderDescription}}
   */
  this.cronapi.maps.geocoder = function( /** @type {ObjectType.OBJECT} @description {{requestAddress}} */ requestAddress, /** @type {ObjectType.OBJECT} @description {{requestBounds}} */ requestBounds, /** @type {ObjectType.OBJECT} @description {{requestAdvancedOptions}} */ requestAdvancedOptions , /** @type {ObjectType.STATEMENTSENDER} @description {{statement}} */ statement ) {
      var request= {
        'address': requestAddress,
        'bounds': requestBounds,
      };
      if(requestAdvancedOptions)
      request =$.extend(request,JSON.parse(requestAdvancedOptions));
      var callback = function(arrayCallback, status){
      statement(arrayCallback,status);
      }
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(request, callback);
  }
  
  /**
   * @type function
   * @name {{getPropertyFromGeocoder}}
   * @nameTags map|autoComplete|create|auto completar|google|completar|property|propriedade
   * @description {{getPropertyFromGeocoderDescription}}
   * @returns {ObjectType.OBJECT}
   */
  this.cronapi.maps.getPropertyFromGeocoder = function( /** @type {ObjectType.OBJECT} @description {{geocodeItem}} */  geocodeItem, /** @type {ObjectType.STRING} @description {{placePropertyType}} @blockType util_dropdown @keys addressName|latitude|longitude|placeId  @values {{address}}|{{latitude}}|{{longitude}}|{{placeId}}  */ property  ) {
      switch(property){
        case 'addressName':{
          return geocodeItem.formatted_address;
        }
        case 'latitude':{
          return geocodeItem.geometry.location.lat();
        }
        case 'longitude':{
          return geocodeItem.geometry.location.lng();
        }
        case 'placeId':{
          return geocodeItem.place_id;
        }
      }
  }
  
  
  /**
   * @type function
   * @name {{directionRoute}}
   * @nameTags map|autoComplete|direction|google|completar|property|propriedade
   * @description {{directionRouteDescription}}
   */
  this.cronapi.maps.directionRoute = function( /** @type {ObjectType.OBJECT} @description {{directRequest}} */  directRequest, /** @type {ObjectType.STATEMENTSENDER} @description {{statement}} */ statement   ) {
    var directionService = new google.maps.DirectionsService();
    directionService.route(directRequest,statement);
     
  }
  
  
  /**
   * @type function
   * @name {{createRequestDirection}}
   * @nameTags map|autoComplete|direction|google|completar|property|propriedade
   * @description {{createRequestDirectionDescription}}
   * @returns {ObjectType.OBJECT}
   */
  this.cronapi.maps.createRequestDirection = function( /** @type {ObjectType.OBJECT} @description {{originPoint}} */  originPoint, /** @type {ObjectType.OBJECT} @description {{destinationPoint}} */  destinationPoint, /** @type {ObjectType.OBJECT} @description {{travelMode}} @blockType util_dropdown @keys DRIVING|TRANSIT|WALKING|BICYCLING  @values {{DRIVING}}|{{TRANSIT}}|{{WALKING}}|{{BICYCLING}}  */  travelMode, /** @type {ObjectType.OBJECT} @description {{requestAdvancedOptions}} */  requestAdvancedOptions  ) {
     var request = {
       'origin': originPoint,
       'destination' : destinationPoint,
       'travelMode': travelMode
     };
     if(requestAdvancedOptions){
       request = $.extend(request,JSON.parse(requestAdvancedOptions));
     }
    return request; 
  }
  
    /**
   * @type function
   * @name {{drawRoute}}
   * @nameTags map|autoComplete|direction|google|completar|property|propriedade
   * @description drawRouteDescription
   */
  this.cronapi.maps.drawRoute = function( /** @type {ObjectType.OBJECT} @description {{mapId}} @blockType ids_from_screen*/ id, /** @type {ObjectType.OBJECT} @description {{directionResultItem}} */  directionResultItem, /** @type {ObjectType.OBJECT} @description {{requestAdvancedOptions}} */  requestAdvancedOptions , /** @type {ObjectType.STATEMENTSENDER} @description {{statement}} */ statement   ) {
   var map = document.getElementById(id)._map;
     var request = {
      'map' : map ,
      'directions': directionResultItem,
      'preserveViewport':true
     };
   if(requestAdvancedOptions){
       request = $.extend(request,JSON.parse(requestAdvancedOptions));
     }
   var direcRendered = new google.maps.DirectionsRenderer(request);
   statement(direcRendered);
  }
}).bind(window)();
