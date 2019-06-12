const request=require('request')
const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFnaWNhbGFubW9sIiwiYSI6ImNqd2o3MWZncDBmZHYzeXA5b2gyOXcyZjIifQ.tSAbSFPa_rUFVK7iI-Q6UA&limit=1'
    //Now we have a dynamic url based off the address the user provides.Now,let's fire the request
    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to LocationServices',undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('Unable to find location.Try another one',undefined)
        }
        else{
            //When things go right,we are going to provide the caller,the caller down below.We can decide what part to expose from the response
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    }) 
 }
 module.exports=geoCode