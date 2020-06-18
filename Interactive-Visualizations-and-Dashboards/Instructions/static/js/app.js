
function demographicInfo(subjectId){

    d3.json("data/samples.json").then((data)=> {
        console.log("inside demographic info function")
       // console.log(data.metadata);
        var metadata_values = data.metadata.filter(sample => sample.id == subjectId)[0];
       // console.log(metadata_values);
        
        var display_metadata = d3.select('#sample-metadata');
        display_metadata.html("");

        Object.entries(metadata_values).forEach((key) => {   
            display_metadata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });


        });
}

//demographicInfo(945);


function plots(subjectId){

    d3.json("data/samples.json").then((data)=> {
        console.log("plot function")
        console.log(data.samples);
        var samples = data.samples;
        for ( i=0;i<samples.length;i++)
        {
            if (samples[i].id ==subjectId)
            {
                console.log(samples[i].otu_ids);
                var otu_arr =samples[i].otu_ids.slice(0, 10).reverse();
                var otu_xvalue = otu_arr.map(data => "OTU :" +data)
                
                var sampleValues = samples[i].sample_values.slice(0,10).reverse();

                var labels =  samples[i].otu_labels.slice(0,10);
                
                var trace1 = {
                    x: sampleValues ,
                    y: otu_xvalue ,
                    text: labels,
                    type: "bar",
                    color:'blue',
                    orientation: "h"
                  };
                  
                  var data = [trace1];
                  
                  var layout = {
                    title: "'Bar' Chart",
                    xaxis: { title: "otu_ids"},
                    yaxis: { title: "Labels"}
                  };
                  
                  Plotly.newPlot("bar", data, layout);   


                  //Bubble Plot
                  var trace1 = {
                    x: samples[i].otu_ids,
                    y: samples[i].sample_values,
                    mode: "markers",
                    marker: {
                        size: samples[i].sample_values,
                        color: samples[i].otu_ids
                    },
                    text:  samples[i].otu_labels
        
                };
        
                // set the layout for the bubble plot
                var layout_2 = {
                    xaxis:{title: "OTU ID"},
                    height: 600,
                    width: 1000
                };
        
                // creating data variable 
                var data1 = [trace1];
        
            // create the bubble plot
            Plotly.newPlot("bubble", data1, layout_2); 
            
           
            // Gauge
            var data = [
                {
                  type: "indicator",
                  mode: "gauge+number+delta",
                 //value: 420,
                  title: { text: "Frequency of wash", font: { size: 24 } },
                  delta: { reference: 400, increasing: { color: "red" } },
                  gauge: {
                   axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
                 //   bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                      { range: [0, 1], color: "lightgreen" },
                      { range: [1,2], color: "green" },
                      { range: [2, 3], color: "cyan" },
                      { range: [3, 4], color: "royalblue" }
                    ],
                    threshold: {
                      line: { color: "red", width: 4 },
                      thickness: 0.75,
                      value: 490
                    }
                  }
                }
              ];
              
              var layout = {
                width: 500,
                height: 400,
                margin: { t: 25, r: 25, l: 25, b: 25 },
                paper_bgcolor: "lavender",
                font: { color: "darkblue", family: "Arial" }
              };
              
              Plotly.newPlot('gauge', data, layout);
                
            }
        }

    });

   
    


}


//plot(945);

function init() {
    //  dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log("inside the init function");
        console.log(data);

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
       plots(data.names[0]);
      demographicInfo(data.names[0]);
    });
}

init();

function optionChanged(id) {
    plots(id);
    demographicInfo(id);
}






