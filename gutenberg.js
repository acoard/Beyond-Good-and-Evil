//Example input: http://www.gutenberg.org/files/4363/4363-h/4363-h.htm
//What I want: Iterate over every <p> tag, and after making sure it's appropriate (length > x, doesn't contain links)
//Be able to store current 


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
// End of Array Remove

//Paras is a global variable

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function generateQuotes()
{
	//Takes httpGet('http://acoard.github.io/Beyond-Good-and-Evil/text.txt') as input

	//Creates an array of strings, each string representing to a numbered section by Nietzsche.
	var source = httpGet('http://acoard.github.io/Beyond-Good-and-Evil/text.txt')
	var threeDigits = new RegExp("\n\n(?=[0-9]{1,3}[A-Z]?.)");
	var quoteArray = source.split(threeDigits);

	//Tidy up the array, remove 'Chapter' elements, etc.
	// quoteArray.remove(0)

	quoteArray[0] = "Title: Beyond Good and Evil Author: Friedrich Nietzsche	Translator: Helen Zimmern\n	Release Date: December 7, 2009 [EBook #4363]\nLast Updated: February 4, 2013";

	return quoteArray;
}

function wordsGet(htmlResponse)
{
	// var allParas;
	// var output; //Tood: Check length of all paras make sure they don't contain <br>
	allParas = $(htmlResponse).filter('p:not(:has(br))')
	return allParas;
}

function run()
{
	var source;
	source = httpGet('http://acoard.github.io/Beyond-Good-and-Evil/source.html');
	wordsGet(source);
	paras = wordsGet(httpGet('http://acoard.github.io/Beyond-Good-and-Evil/source.html'));
	generateQuotes()

}
run()

function paraCtrl($scope){
	// var currentPara = 1;
	$scope.currentPara = 1;
	var quoteArray = generateQuotes();
	$scope.paragraph = quoteArray[$scope.currentPara];
	

	
	$scope.nextPara = function(){
		$scope.currentPara += 1;
		$scope.paragraph = quoteArray[$scope.currentPara];
	};
	$scope.randomPara = function(){
		$scope.currentPara = Math.floor(Math.random() * quoteArray.length + 1);
		$scope.paragraph = quoteArray[$scope.currentPara];

	}
	$scope.backPara = function(){
		$scope.currentPara -= 1;
		$scope.paragraph = quoteArray[$scope.currentPara];
	}
	$scope.updatePara = function(){
		$scope.paragraph = quoteArray[$scope.currentPara];	
	}
}