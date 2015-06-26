var fieldName = document.getElementById("fieldName");
var fieldInputs = document.getElementById("fieldInputs");
var output = document.getElementById("output");
var ans;


/////////
// CORE
/////////

$(document).ready(function(){
	$("#list b").click(function(){
		showField($(this).attr("id"));
	});
});

function showField(o){
	var obj = window[o + "Obj"];
	fieldName.innerHTML = $("b#" + o).text();
	fieldInputs.innerHTML = "";
	for (var i = 0; i < obj.length; i++){
		fieldInputs.innerHTML += "<p>" + "<label for=in" + i + ">" + obj[i] + "</label>"
			+ "<input type=text name=in" + i + ">" + "</p>";
	};
	fieldInputs.innerHTML += "<p>" + "<button name=submit id=submit>Submit</button>" + "</p>";
	$("button#submit").click(function(){
		compute(o);
	});
}

function compute(o){
	var inputs = fieldInputs.getElementsByTagName("input");
	var fStr = o + "(", pStr = inputs[0].value;
	for (var i = 1; i < inputs.length; i++) {
		pStr +=  "," + inputs[i].value;
	};
	pStr = pStr.replace('ans', ans);
	ans = eval( fStr + pStr + ")" );
	output.value = ans;
}

/////////////
// ITEMS
/////////////

var facObj = ["Number"];
var evalexpObj = ["Expression"];
var ncrObj = ["N", "R"];
var isPrimeObj = ["Number"];
var listFactorsObj = ["Number"];
var primeFactorObj = ["Number"];

////////////
// FUNCTIONS
////////////

function fac(n){
	var i = 1;
	while (n>1){ i = i * n; n--; };
	return i;
}

function evalexp(s){
	return eval(s);
}

function ncr(n, r){
	var nr = n-r;
	if (nr > r){ // swap
		r = nr + r;
		nr = r - nr;
		r = r - nr;
	}
	var s = 1;
	while (n>r){ s = s * n; n--; };
	return s/fac(nr);
}

function isPrime(n){
	var j = isPrime_(n);
	return n + " is " + ((j==1) ? "prime" : "not prime");
}

function isPrime_(n){
	if (n<2)
		return 0;
	else if(n<4)
		return 1;
	else if (n%2 == 0)
		return 0;
	else if (n%3 == 0)
		return 0;
	else if (n<25)
		return 1;
	else {
		var f = 5;
		var r = Math.sqrt(n);
		while (f < r){
			if (n % f == 0)
				return 0;
			if (n % (f+2) == 0)
				return 0;
			f += 6;
		}
		return 1;
	}
}

function listFactors(n){
	var z = Math.sqrt(n);
	var str = "";
	var str2 = "";
	for (var i = 2; i <= z; i++){
		if (n % i == 0){ 
			str += i + ", ";
			str2 = ", " + (n/i) + str2;
		}
	};
	return str + str2.slice(2);
}

function primeFactor(n){
	var s = "", c = 0;
	if (n%2 == 0){
		while (n % 2 == 0){
			n = n/2; c++;
		};
		if (c>1)
			s += 2 + "^" + c;
		else
			s += 2;
	}
	var l = Math.round( Math.sqrt(n) );
	for (var i = 3; i<l; i+=2){
		if (n%i == 0){
			c = 0;
			while (n%i == 0){
				n=n/i; c++;
			};
			if (c>1)
				s += " * " + i + "^" + c;
			else
				s += " * " + i;
		}
	}
	if (n > 1){ s+= " * " + n; }

	if (s.indexOf(" ") == 0) s = s.slice(3);
	return s;
}