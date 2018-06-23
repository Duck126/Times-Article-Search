const axios = require("axios");


axios.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=obama&api-key=27abc756cdfd425bb159e404f033f5ed")
.then(function(res){
    console.log(res.data.response.docs);

})
.catch(function(err){
    console.log(err);
});

