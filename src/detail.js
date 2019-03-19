import React from 'react'
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: ""
    }
  }

  //FETCH book with specific ID
  async componentDidMount() {
    const { match: { params } } = this.props;
    const url = 'https://5c8935d341fb3f001434bd61.mockapi.io/Books/' + params.id
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ book: data });
  }


  //PRINT specific detail book
  render() {
    let books = this.state.book
    return (
      <div>
        <h1>Detail Page</h1>
        <div>
          <span className='container'>{books.bookName}</span>
          <span className='container'>{((books || {}).author || {}).authorName}</span>
          <span className='container'>{((books || {}).publisher || {}).publisherName}</span>
          <hr />
        </div>
      </div>
    )
  }
}
export default Detail