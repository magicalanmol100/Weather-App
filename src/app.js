const path=require('path')
const express=require('express')
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")
const request=require('request')
const app=express()//To create a new express application
const port=process.env.PORT||3000;
const hbs=require('hbs')
//Define paths for Express Config
const publicPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Set up handlebar engines and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Anmol Goyal'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Anmol Goyal'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        HelpText:'Wanna need some help?',
        name:'Anmol Goyal'
    })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address)
  {
      return res.send({
          
          error:"Address information missing"
      })
  }
//   console.log(req.query)
    // forecast:"It is sunny outside",
    // location:"Noida",
    //   address:req.query.address
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
           return  res.send({
                error
            })
        }
      forecast(latitude,longitude,(error,forecastdata)=>{
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
        })
    })
    
    })
  })
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Help Article not found",
        name:"Anmol Goyal"
        //We could have also used error Message property here
})
})

app.get('*',(req,res)=>{
    // res.send("My 404 page")
    res.render('404',{
        title:"Requested Page not found",
        name:"Anmol Goyal"
        
    })

})
app.listen(port,()=>{
    console.log('Server is up running on port '+port)
})