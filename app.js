window.addEventListener('load',()=>{
    let long;
    let lat;
    let tempratureDegree=document.querySelector(".temprature-degree");
    let tempratureDescription=document.querySelector(".temprature-description");
    let locationTimezone=document.querySelector(".location-timezone");
    let tempratureSection =document.querySelector('.temprature');
    let tempratureSpan=document.querySelector('.temprature span');
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{

           // console.log(position);
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3f4edbb09cb52e4fee232de654dc9dda`;
            fetch(api)
            .then((Response)=>{
                return Response.json();
            }).then((data)=>{
                console.log(data);
                const {temp}=data.main;
                tempratureDegree.textContent=(temp-273.15)*9/5+32;
                const {description}=data.weather[0];
                tempratureDescription.textContent=description;
                locationTimezone.textContent=data.name;
               let locationIcon=document.querySelector('.weather-icon');
               const{icon}=data.weather[0];
               locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
               let celsius=(tempratureDegree.textContent-32)*5/9;
               tempratureSection.addEventListener('click',()=>{
                              if(tempratureSpan.textContent==='F')
                              {
                                  tempratureSpan.textContent='C';
                                  tempratureDegree.textContent=celsius;
                              }
                              else{
                                  tempratureSpan.textContent='F';
                                  tempratureDegree.textContent=(temp-273.15)*9/5+32;
                              }
               })

             })
        });
        
    }
})
