import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    searchedArticles: [{title: "", date:"", body: "", link:"", id:""}],
    searchParam: "",
    // title: "",
    // author: "",
    //synopsis: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  searchArticles = searchParam => {
    API.searchArticles(searchParam)
      .then(function(res){
        let data = res.data.response.docs;
        data.map(new => arts (

        ))
          this.setState({ searchedArticles:[{ 
             title: data.headline.main,
             date: data.pub_date, 
             body: data.snippet, 
             link: data.web_url, 
             id: data._id }]})
        
      })
      .catch(err => console.log(err));
  };

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name , value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveArticle({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadArticles())
  //       .catch(err => console.log(err));
  //   }
  // };

  handleSearch = event => {
    event.preventDefault();
    if (this.state.searchParam) {
      API.searchArticles(this.state.searchParam)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.searchParam}
                onChange={this.handleInputChange}
                name="searchParam"
                placeholder="Search (required)"
              />
            
              <FormBtn
                disabled={!(this.state.searchParam)}
                onClick={this.searchArticles}
              >
                Search Article
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.searchedArticles.length ? (
              <List>
                {this.state.searchedArticles.map(article => (
                  <ListItem key={this.searchedArticles.id}>
                    <a href="{this.searchedArticles.link}" target="_blank">
                      <strong>
                        {this.searchedArticles.title} Link: {this.searchedArticles.body}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
