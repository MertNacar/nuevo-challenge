import React from 'react'


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incoming: false,
      searchingName: null,
      searchingID: null,
      searchingAuthor: null,
      searchingPublisher: null,
      books: null,
      DetailedBooks: null
    }

    this.handleID = this.handleID.bind(this);

  }

  //Updated a state of books with GET method
  async componentDidMount() {
    const url = 'https://5c8935d341fb3f001434bd61.mockapi.io/Books';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ incoming: true, books: data });
  }


  //For searching with name, get method with id, updated a state of detailbooks for specific book
  async handleID(id) {
    const url = 'https://5c8935d341fb3f001434bd61.mockapi.io/Books/' + id
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ DetailedBooks: data });

  }

  //GET input book name
  handleInputBookName = (input) => {
    return e => {
      this.setState({
        [input]: e.target.value
      })
    }
  }

  //GET input author
  handleInputAuthor = (input) => {
    return e => {
      this.setState({
        [input]: e.target.value
      })
    }
  }

  //GET input publisher
  handleInputPublisher = (input) => {
    return e => {
      this.setState({
        [input]: e.target.value
      })
    }
  }

  //if any input not null set myDataID as id of this book
  SearchName(callback) {

    let Books = this.state.books;
    Books.map((data) => {
      if (
        data.bookName == this.state.searchingName ||
        data.author.authorName == this.state.searchingAuthor ||
        data.publisher.publisherName == this.state.searchingPublisher) {
        localStorage.setItem('myDataID', data.id);
        return callback(data.id)
      }
    })

  }


  render() {
    //Searched book in detailBooks for detail page
    let detailBooks = this.state.DetailedBooks
    //for Detail page button
    let path = `/detail/${localStorage.getItem("myDataID")}`
    let books = this.state.books

    if (!this.state.incoming || !this.state.books) return <div>Bulunamadı.</div>

    //Print Searched Book
    if (detailBooks) {
      return (
        <div>
          <span className='container'>{detailBooks.bookName}</span>
          <span className='container'>{detailBooks.author.authorName}</span>
          <span className='container'>{detailBooks.publisher.publisherName}</span>
          <hr />
          <div><a href={path}><button> Detaylar</button></a></div>
          <hr />
        </div>
      )
    }


    return (
      <div>
        <h1>Book Page</h1>
        <h3>Herhangi biriyle aramak için giriniz.</h3>
        <div>
          <input
            placeholder="Kitap adı giriniz."
            type="text"
            value={this.state.searchingName || ""}
            onChange={this.handleInputBookName('searchingName')}
          >
          </input>
        </div>

        <div>
          <input
            placeholder="Yazar adı giriniz."
            type="text"
            value={this.state.searchingAuthor || ""}
            onChange={this.handleInputAuthor('searchingAuthor')}
          >
          </input>
        </div>

        <div>
          <input
            placeholder="YayınEvi adı giriniz."
            type="text"
            value={this.state.searchingPublisher || ""}
            onChange={this.handleInputPublisher('searchingPublisher')}
          >
          </input>
        </div>

        <hr />
        <div>
          <button
            onClick={() => this.SearchName(this.handleID)}
          > Ara
            </button>
        </div>

        <hr />

        {/*All books fetch HERE  */}
        {books.map(el => {
          return <div>
            <span className='container'>{el.bookName}</span>
            <span className='container'>{el.author.authorName}</span>
            <span className='container'>{el.publisher.publisherName}</span>

            <hr />
          </div>
        })}

      </div>
    )
  }
}
export default Root