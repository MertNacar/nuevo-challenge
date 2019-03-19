import React from 'react'
import { error } from 'util';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      lastID: null,
      inputBookName: null,
      inputName: null,
      inputPublisherName: null,
      AllBooks:null,
      requestFailed:false
    }
  }

  //Fetch All book for get last id
  async componentDidMount() {
    const url = 'https://5c8935d341fb3f001434bd61.mockapi.io/Books';
    const response = await fetch(url);
    const data = await response.json();
    let len = data.length;
    this.setState({ AllBooks:data,books: data[len - 1] });
  }

  handleInputBookName = (input) => {
    return e => {
      this.setState({
        [input]: e.target.value
      })
    }
  }

  handleInputAuthor = (input) => {
    return e => {
      this.setState({
        [input]: e.target.value
      })
    }
  }

  handleInputPublisher = (input) => {
    return e => {
      this.setState({
        [input]: e.target.value
      })
    }
  }

  //states push to json object for POST METHOD  
  async push() {
    try{
      let user = this.state.AllBooks.find(item => item.bookName == this.state.inputBookName);
      if(user) throw new Error("Bir Hatayla Karşılaştık, Tekrar deneyin.");
      const url = "https://5c8935d341fb3f001434bd61.mockapi.io/Books"
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.lastID + 1,
          bookName: this.state.inputBookName,
          author: {
            authorName: this.state.inputAuthorName
          },
          publisher: {
            publisherName: this.state.inputPublisherName,
          }
        })
      })
      let data = await response.json();
      return data;
    } catch { 
      this.setState({
        requestFailed:true
      })
    }
    }
    

  render() {
    let path = '/Books' 
    if(this.state.requestFailed) {
      return <div>Bir hatayla Karşılaştık.</div>
    } else {
    return (
      <div>
        <h1>Create Page</h1>
        <div>
          <input
            placeholder="Kitap adı giriniz."
            type="text"
            value={this.state.inputBookName || ""}
            onChange={this.handleInputBookName('inputBookName')}
            required
          >
          </input>
        </div>

        <div>
          <input
            placeholder="Yazar adı giriniz."
            type="text"
            value={this.state.inputAuthorName || ""}
            onChange={this.handleInputAuthor('inputAuthorName')}
            required
          >
          </input>
        </div>

        <div>
          <input
            placeholder="YayınEvi adı giriniz."
            type="text"
            value={this.state.inputPublisherName || ""}
            required onChange={this.handleInputPublisher('inputPublisherName')}

          >
          </input>
        </div>

        <hr />

        <a href={path}>
          <button
            onClick={() => this.push()}
          > Ekle
        </button>
        </a>
      </div>
    )
  }
  }
}
export default Create