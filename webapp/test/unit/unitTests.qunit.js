/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"proj_ver_run/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
