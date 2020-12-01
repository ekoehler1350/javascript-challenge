// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody =d3.select("tbody");
var button = d3.select("#filter-btn");
var inputFieldDate = d3.select("#datetime");
var inputFieldCity = d3.select("#city");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

//Input data into HTML
var populate = (dataInput) => {
	dataInput.forEach(ufoSightings => {
		var row = tbody.append("tr");
		columns.forEach(column => row.append("td").text(ufoSightings[column])
		)
	});
}

//Populate Table 
populate(data);

//Set up Filters for Date and City
button.on("click", () => {
	d3.event.preventDefault();
	var inputDate = inputFieldDate.property("value").trim();
	var inputCity = inputFieldCity.property("value").toLowerCase().trim();
	//Create filter so data fields match the input values 
	//Date filter
	var filterDate = data.filter(data => data.datetime === inputDate);
	console.log(filterDate)
	//City filter
	var filterCity = data.filter(data => data.city === inputCity);
	console.log(filterCity)
	//combined filter
	var filterCityDate = data.filter(data => data.datetime === inputFieldDate && data.city === inputCity);
	console.log(filterCityDate)

	//Add the sightings that match the filter to the table
	tbody.html("");

	let response = {
		filterCityDate, filterDate, filterCity
	} 

	if (response.filterCityDate.length !== 0) {
		populate(filterCityDate);
	}
		else if (response.filterCityDate.length === 0 && ((response.filterDate.length !== 0 || response.filterCity.length !== 0))){
			populate(filterDate) || populate(filterCity);
		}
		else {
			tbody.append("tr").append("td").text("No UFO sightings found!");
		}	
})
