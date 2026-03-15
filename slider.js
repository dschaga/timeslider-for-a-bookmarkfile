
// have a read :
// https://news.ycombinator.com/item?id=14064096

var rangestart;
var rangeend;
var range;

var smallest;
var largest;


function dofilter(){
	//var readabledate = "from "+ new Date(smallest*1000).toLocaleDateString() + " to " +new Date(largest*1000).toLocaleDateString();
	document.getElementById('outputEndDate').innerText = outputdaterange();

 	const elements = document.querySelectorAll('A, H3');
 	elements.forEach(el => {	
			
	  if (parseInt(el.getAttribute('ADD_DATE')) >= smallest && parseInt(el.getAttribute('ADD_DATE')) <= largest) {
	    el.style.display = 'block';
	  } else {
	    el.style.display = 'none';
	  }
	});   
}	


function outputdaterange(){
	return "from "+ new Date(smallest*1000).toLocaleDateString() + " to " +new Date(largest*1000).toLocaleDateString();
}


function findrotten() {
  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    fetch(link.href)
      .then(response => {
        if (!response.ok) {
          console.warn(`Broken link: ${link.href} - Status: ${response.status}`);
          link.style.color = 'red'; // Visually mark broken links
        }
      })
      .catch(error => {
        console.error(`Failed to reach ${link.href}:`, error);
        link.style.color = 'red';
      });
  }
};



window.onload = function() {
	
    // DOM is loaded and we are looking at the bookmarks ADD_DATE
 	const elements = document.querySelectorAll('A, H3');
 	
	//define the array which holds all date values 
	const alldates = [];

 	elements.forEach(el => {
	 	// step by step
	 	alldates.push( parseInt(el.getAttribute('ADD_DATE')) );

 	});
 	
 	//smallest and largest value
 	rangestart = smallest = Math.min(...alldates); //didn't know the  ...
 	rangeend = largest = Math.max(...alldates);
 	range = largest - smallest;
 	
 	
 	console.log(smallest + " / " + largest +" = " +range);
 	
 	
 	
 	// some labels
 	
  	const datelabel = document.createElement("label");
  	datelabel.id = "outputEndDate";
 	datelabel.innerText = "Enddate";
 	
 	
 	
 	
 	// create the slider as objects 
 	const sliders = document.createElement("div");
 	sliders.id = "slider";

 	// part for the start
    const startslider = document.createElement("input");
 	startslider.type = "range";
 	startslider.id = "startslider";

 	startslider.min = smallest;
 	startslider.max = largest;
 	startslider.value = smallest;
 	
 	
	// part for the end	 		
   	const endslider = document.createElement("input");
 	endslider.type = "range";
 	endslider.id = "endslider";

 	endslider.min = smallest;
 	endslider.max = largest;
 	endslider.value = largest;
 
 	
 	

 	// insert the elements into DOM
 	document.body.insertBefore(datelabel, document.getElementsByTagName('H1')[0]);
 	
 	document.body.insertBefore(sliders, document.getElementsByTagName('H1')[0]);
 	document.getElementById('slider').appendChild(startslider);
 	document.getElementById('slider').appendChild(endslider);




 	// lets style the range silder like here 
 	// https://stackoverflow.com/a/77669397
 	
	const style = document.createElement('style');
	style.textContent = `
	#slider input {
	  --start: 0%;
	  --stop: 100%;
	  -webkit-appearance: none;
	  appearance: none;
	  background: none;
	  pointer-events: none;
	  position: absolute;
	  height: 8px;
	  width:95%;
	}
	
	#slider input:first-of-type {
	  background-image: linear-gradient(to right, lightgrey var(--start), dodgerblue var(--start), dodgerblue var(--stop), lightgrey  var(--stop));
	}
	
	#slider ::-moz-range-thumb {
	  cursor: pointer;
	  pointer-events: auto;
	}
	#slider ::-webkit-slider-thumb {
	  cursor: pointer;
	  pointer-events: auto;
	}
	`;
	
	
	document.head.appendChild(style);
	
	
	
	
	
 	startslider.addEventListener("change", function () {
	 	
	 	var start = (((rangeend - this.value )/range) -1 )*-100;
	 	this.style.setProperty('--start', start + '%');
	 	
 		smallest = this.value;
	  	dofilter();
	});
	
	
 	endslider.addEventListener("change", function () {

	 	var end = (((rangeend - this.value )/range) -1 )*-100;
	 	this.previousElementSibling.style.setProperty('--stop', end + '%');
	 	
	 	largest = this.value;
	 	dofilter();
	});
	

	document.getElementById('outputEndDate').innerText = outputdaterange();
	
	
	 	    

};   // end on load



    
