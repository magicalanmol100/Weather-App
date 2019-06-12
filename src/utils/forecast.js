const request=require('request')
forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/87e4aae95d2450b62e07d2e77c9824d8/'+latitude+','+longitude+'?units=si'
    // request({url:url,json:true},(error,response)=>{
        request({url,json:true},(error,{body})=>{

        if(error)
        {
            callback("Unable to connect to weather service",undefined)
        }
        else if(body.error){
              callback('Unable to find location',undefined)
        }
        else{
              callback(undefined,body.daily.data[0].summary +" .It is currently "+body.currently.temperature+" degrees out.There is a "+body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports=forecast