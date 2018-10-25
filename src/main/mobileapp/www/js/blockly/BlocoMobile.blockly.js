window.blockly = window.blockly || {};
window.blockly.js = window.blockly.js || {};
window.blockly.js.blockly = window.blockly.js.blockly || {};
window.blockly.js.blockly.BlocoMobile = window.blockly.js.blockly.BlocoMobile
		|| {};

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.BlocoMobile.LocalizacaoGPS = function() {

	var item, destino, item2, latOrigem, LocalizacaoUser, longOrigem, origem;
	this.cronapi.cordova.geolocation.getCurrentPosition(
			function(sender_item) {
				item = sender_item;
				this.cronapi.screen.createScopeVariable('latitudeGPS',
						this.cronapi.object
								.getProperty(item, 'coords.latitude'));
				this.cronapi.screen.createScopeVariable('longitudeGPS',
						this.cronapi.object.getProperty(item,
								'coords.longitude'));
				this.cronapi.screen.changeValueOfField("vars.input5580", [
						this.cronapi.screen.getScopeVariable('latitudeGPS'),
						',',
						this.cronapi.screen.getScopeVariable('longitudeGPS')]
						.join(''));
			}.bind(this), function(sender_item) {
				item = sender_item;
				this.cronapi.screen.notify('error', 'errr');
			}.bind(this));
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.BlocoMobile.AutoCompletarDestino = function() {

	var item, destino, item2, latOrigem, LocalizacaoUser, longOrigem, origem;
	this.cronapi.maps.createAutoComplete("textinput-Destino", 'address',
			this.cronapi.maps.createLatLngBounds(this.cronapi.maps
					.createLatLngPoint('-13.0183736\n', '-38.5480934'),
					this.cronapi.maps.createLatLngPoint('-12.7513579',
							'-38.1534927')), 'true', '', function(sender_item) {
				item = sender_item;
				this.cronapi.screen.createScopeVariable('destino', item);
			}.bind(this));
}

/**
 * BlocoMobile
 */
window.blockly.js.blockly.BlocoMobile.Executar = function() {

	var item, destino, item2, latOrigem, LocalizacaoUser, longOrigem, origem;
	if (!this.cronapi.maps.isInitialized("fram-map-mob")) {
		this.cronapi.maps.init("fram-map-mob", 'roadmap', this.cronapi.maps
				.createLatLngPoint('-13.0011623', '-38.4685141'), '16',
				function(sender_item) {
					item = sender_item;
					this.blockly.js.blockly.BlocoMobile.AutoCompletarOrigem();
					this.blockly.js.blockly.BlocoMobile.AutoCompletarDestino();
					this.blockly.js.blockly.BlocoMobile.GeraRota();
				}.bind(this));
	}
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.BlocoMobile.AutoCompletarOrigem = function() {

	var item, destino, item2, latOrigem, LocalizacaoUser, longOrigem, origem;
	this.cronapi.maps.createAutoComplete("textinput-Origem", 'address',
			this.cronapi.maps.createLatLngBounds(this.cronapi.maps
					.createLatLngPoint('-13.0183736\n', '-38.5480934'),
					this.cronapi.maps.createLatLngPoint('-12.7513579',
							'-38.1534927')), 'true', '', function(sender_item) {
				item = sender_item;
				this.cronapi.screen.createScopeVariable('origem', item);
			}.bind(this));
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.BlocoMobile.GeraRota = function() {

	var item, destino, item2, latOrigem, LocalizacaoUser, longOrigem, origem;
	destino = this.cronapi.screen.getScopeVariable('destino');
	if (this.cronapi.logic.isNullOrEmpty(this.cronapi.screen
			.getScopeVariable('latitudeGPS'))) {
		origem = this.cronapi.screen.getScopeVariable('origem');
		latOrigem = this.cronapi.maps.getPropertyFromAutoComplete(origem,
				'latitude');
		longOrigem = this.cronapi.maps.getPropertyFromAutoComplete(origem,
				'longitude');
	} else {
		latOrigem = this.cronapi.screen.getScopeVariable('latitudeGPS');
		longOrigem = this.cronapi.screen.getScopeVariable('longitudeGPS');
	}
	this.cronapi.maps.directionRoute(this.cronapi.maps.createRequestDirection(
			this.cronapi.maps.createLatLngPoint(latOrigem, longOrigem),
			this.cronapi.maps.createLatLngPoint(this.cronapi.maps
					.getPropertyFromAutoComplete(destino, 'latitude'),
					this.cronapi.maps.getPropertyFromAutoComplete(destino,
							'longitude')), 'DRIVING', null), function(
			sender_item) {
		item = sender_item;
		this.cronapi.maps.drawRoute("fram-map-mob", item,
				'{\"preserveViewport\": false}', function(sender_item) {
					item = sender_item;
				}.bind(this));
	}.bind(this));
}
