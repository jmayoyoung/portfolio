const hpApi = {};

//change the background to th ehouse colour and maybe the logo

hpApi.hpGetData = function(){
    $.ajax({
        url: "http://hp-api.herokuapp.com/api/characters",
        method:"GET",
        dataType: "json"

    }).then(function(response){
        hpApi.hpDisplayData(response);
        hpApi.hpFilter(response);

    });

}

hpApi.hpDisplayData = function(hpObjects){
    $('.displayCharacters').empty();
    hpObjects.forEach((hpObject) => { 
        if(hpObject.image != "" && hpObject.house != ""){
    const hpData = `
    <div class="hpContainer">
        <div class="hpImgages">
            <img src="${hpObject.image}" alt="${hpObject.name}" />
        </div>
        <p>${hpObject.name}</p>
        <p>${hpObject.house}</p>
    </div>`;
    
    $('.displayCharacters').append(hpData);
        }
    });
    
}

hpApi.hpFilter = function(response){
//use an if filter to display all of the houses
$('select').on('change', function(){
    
    const selectHouse = $('option:selected').val();
    
    if(selectHouse === "All"){
        hpApi.hpDisplayData(response);
        $('.displayHouse').empty(); 
     
    }else {
        let hpResults = response.filter((character) => {
            return character.house === selectHouse;
          });

          const hpHouseImage = `<img src="./images/${selectHouse}.jpg" alt="">`;
          hpApi.hpDisplayData(hpResults); 

          $('.displayHouse').html(hpHouseImage);
    }
  
  
  }); 

}

hpApi.init = function(){

    hpApi.hpGetData();
    
}

$(function(){
hpApi.init();

});