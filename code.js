let app = angular.module("myAPP", ["ngRoute"]);
app.config(function ($routeProvider) {
	$routeProvider
		.when("/", { templateUrl: "homepage.html" })
		.when("/ticket", { templateUrl: "ticket.html" })
		.when("/services", { templateUrl: "service.html" })
		.when("/abus", { templateUrl: "about_us.html" })
		.when("/contact", { templateUrl: "contact_us.html" })
		.when("/sign", { templateUrl: "signin_up.html" })
		.when("/runaway", { templateUrl: "runaway_rapids.html" })
		.when("/park", { templateUrl: "amusement_park.html" })
		.when("/discounts", { templateUrl: "discounts.html" })
		.when("/gokarts", { templateUrl: "go_karts.html" });
});
// Go to top
app.controller("conIndex", function ($scope) {
	$scope.backToTop = function () {
		$("html, body").animate({ scrollTop: 0 }, 50);
	};
});
$(window).scroll(function () {
	if ($(this).scrollTop() > 500) {
		$(".btn-scroll-up").addClass("display").fadeIn();
	} else {
		$(".btn-scroll-up").removeClass("display").fadeOut();
	}
});
// SERVICES
//Jump to element
function myFunction1() {
	const element = document.getElementById("events");
	element.scrollIntoView();
}
function myFunction2() {
	const element = document.getElementById("parkmap");
	element.scrollIntoView();
}
function myFunction3() {
	const element = document.getElementById("restaurants");
	element.scrollIntoView();
}
function myFunction4() {
	const element = document.getElementById("gallery-head");
	element.scrollIntoView();
}

// TICKETS
app.run(function ($rootScope, $http) {
	$rootScope.ticket = [];
	$http.get("ticket.json").then(function (r) {
		$rootScope.ticket = r.data.tickets;
	});

	$rootScope.cart = [];
	$rootScope.total = 0;
});
app.controller("ticketCTRL", function ($scope, $rootScope) {
	$scope.addCart = function (id) {
		let ok = confirm("Add this ticket to your cart?");
		if (ok == true) {
			var item = $rootScope.ticket[id];

			for (var i = 0; i < $rootScope.cart.length; ++i) {
				if ($rootScope.cart[i].id == id) {
					$rootScope.cart[i].qty++;
					$rootScope.total += $rootScope.cart[i].price;
					return;
				}
			}
			var newEle = {
				name: item.name,
				price: item.price,
				qty: 1,
			};
			$rootScope.cart.push(newEle);
			$rootScope.total += item.price;
			console.log($rootScope.total);
		} else {
			return 0;
		}
	};
});

// CART
app.controller("cartCTRL", function ($scope) {
	$scope.removeAll = function () {
		$scope.total = 0;
		$scope.cart = [];
	};
});
