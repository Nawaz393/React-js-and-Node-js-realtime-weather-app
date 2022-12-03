const http=require("http");
const requests =require("requests");
require("dotenv").config();

http.createServer((req,res)=>{

if(req.url==="/api/data"){


requests(`https://api.openweathermap.org/data/2.5/weather?q=abbottabad&appid=${process.env.Api_key}`)
.on('data', function (chunk) {
 const data =JSON.parse(chunk);
 const arrdata=[data];
 const temp=(arrdata[0].main.temp-273.15).toFixed(2);
 const min_temp=(arrdata[0].main.temp_min-273.15).toFixed(2);
 const max_temp=(arrdata[0].main.temp_max-273.15).toFixed(2);
 const status=arrdata[0].weather[0].main;
 console.log(status);
 const objdata={

        temp:[temp],
        minTemp:[min_temp],
        maxTemp:[max_temp],
        status:[status]
        };

        const jsondata=JSON.stringify(objdata);


res.end(jsondata);


})
.on('end', function (err) {
  if (err){

   return (err);
  }
 

});

}

else{


    res.end(

        `<h1>page not found</h1>
        <a href="/api/data">home</a>
        `
    )
}



}).listen(5000)