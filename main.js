let Cities = [
    {
        Arabic_Name: "الرياض",
        English_Name: "Ar Riyāḑ"
    },
    {
        Arabic_Name: " مكة",
        English_Name: "Makkah al Mukarramah"
    },
    {
        Arabic_Name: " الشرقية",
        English_Name: "Ash Sharqīyah"
    },
    {
        Arabic_Name: "نجران",
        English_Name: "	Najrān"
    },
    {
        Arabic_Name: "القصيم",
        English_Name: "Al Qaşīm"
    },
]


for (let City of Cities){
    const content = `
        <option>${City.Arabic_Name}</option>
    `
    document.getElementById("Cities-Select").innerHTML += content
}

document.getElementById("Cities-Select").addEventListener("change", function(){
    document.getElementById("City_Name").innerHTML = this.value

    let Name_City = ""
    for (let City of Cities){
        if(City.Arabic_Name == this.value)
            {
                Name_City = City.English_Name
            }
    }
    GetPrayerTimeOfCity(Name_City)
    
})


function GetPrayerTimeOfCity(CityName){

    parameters= {
        country: "SA",
        city: CityName 
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: parameters
    })
    .then(function (response) {
        const times = response.data.data.timings

        //use function FillTimes instead of below line
        // document.getElementById("fajr-time").innerHTML = times.Fajr

        FillTimes("fajr-time", times.Fajr)
        FillTimes("sunrise-time", times.Sunrise)
        FillTimes("Dhuhr-time", times.Dhuhr)
        FillTimes("Asr-time", times.Asr)
        FillTimes("Sunset-time", times.Sunset)
        FillTimes("Isha-time", times.Isha)


        const readableDate = response.data.data.date.readable
        const weekDay = response.data.data.date.hijri.weekday.ar
        const date = weekDay + " " + readableDate
        document.getElementById("Date").innerHTML = date
        
    })
    .catch(function (error) {
    console.log(error);
    })

}

GetPrayerTimeOfCity("Makkah al Mukarramah")


    function FillTimes(id, time){
        document.getElementById(id).innerHTML = time
    }