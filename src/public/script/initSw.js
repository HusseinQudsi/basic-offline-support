(function () {
	"use strict";

	if ("serviceWorker" in navigator) {

		try {
			navigator
				.serviceWorker
				.register("./serviceWorker.js", {
					updateViaCache: "none",
				})
				.then(function (swRegistration) {

					var svcworker = swRegistration.installing || swRegistration.waiting || swRegistration.active;

					console.info('ServiceWoker Status: ' + svcworker);

				})
				.catch(function (e) {
					errorHanlder(e);
				});

		} catch (e) {
			errorHanlder(e);
		}

		function errorHanlder(error) {
			throw new Error("ServiceWoker failed to initialize, error:" + error.toString());
		}
	}
})();