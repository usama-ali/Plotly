function buildMetadata(sample) {
var url="metadata/" +sample
console.log(url);
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(url).then(function(response)
  {
    
    var panel=d3.select("#sample-metadata");
  
    

    // Use `.html("") to clear any existing metadata
    panel.html("");
    console.log(response);
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(response).forEach(function([key, value]) {
    
      console.log(key, value);  
      var cell = panel.append("h6");
          cell.text(`${key} : ${value}`);
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
});
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var charturl="/samples/"+sample;
  
  d3.json(charturl).then(function(data) {
    console.log(`data ${data}`);
    var label = data.otu_ids;
    var values = data.sample_values;
    var hovertext=data.otu_labels;
    var data = [{

      values: values.slice(0,10),
      labels: label.slice(0,10),
      hovertext : hovertext.slice(0,10),
      type: 'pie'
      
    }];
    console.log(data)
    
    var layout = {
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('pie', data, layout);
    
    
    var trace1 = {

      x: label,
    
      y: values,
    
      mode: "markers",
    
      type: "scatter",
    
      text: hovertext,
    
      marker: {
    
        color: label,
        size:values,
    
   }
    
    };
      
    // Create the data array for the plot
    
    var data = [trace1];
    
    
    
    // Define the plot layout
    
    var layout = {
    
      title: "Olympic trends over the years",
    
      xaxis: { title: "Year" },
    
      yaxis: { title: "Olympic Event" },
      
    };
    
    
    
    // Plot the chart to a div tag with id "plot"
    
    Plotly.newPlot('bubble', data, layout);   
    
  });
}
  
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      console.log(`sample data :${sample}`)
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
