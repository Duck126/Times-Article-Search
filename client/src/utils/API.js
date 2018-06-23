import axios from "axios";

export default {
  // Search new articles
  searchArticles: function (searchParam) {
   return axios.get("http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" + searchParam + "&api-key=27abc756cdfd425bb159e404f033f5ed")
  },
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
