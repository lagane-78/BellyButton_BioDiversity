
function demographicInfo(subjectId){

    d3.json("data/samples.json").then((data)=> {
        console.log("inside demographic info function")
        console.log(data.metadata);
        var metadata_values = data.metadata.filter(sample => sample.id == subjectId)[0];
        console.log(metadata_values);
        
        var display_metadata = d3.select('#sample-metadata');
        display_metadata.html("");

        Object.entries(metadata_values).forEach((key) => {   
            display_metadata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });


        });
}

demographicInfo(940);

function init() {
    //  dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        // getPlots(data.names[0]);
        // getDemoInfo(data.names[0]);
    });
}

init();






