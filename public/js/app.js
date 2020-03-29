class ProductList extends React.Component {
  state = { products: [] }

  componentDidMount () {
    this.setState({ products: Sample.products })
  }

  handleUpVote = (productID) => {
    const updatedProducts = this.state.products.map(product => {
      if (productID === product.id) {
        return Object.assign({}, product, { votes: product.votes + 1 })
      } else {
        return product
      }
    })
    this.setState({ products: updatedProducts })
  }

  render () {
    const products = this.state.products.sort((a, b) => b.votes - a.votes)

    const productComponents = products.map(product =>
      <Product
        key={`product-${product.id}`}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onUpVote={this.handleUpVote}
      />
    )
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    )
  }
}

class Product extends React.Component {
  handleUpClick = () => {
    this.props.onUpVote(this.props.id)
  }

  render () {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl}/>
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpClick}>
              <i className="large caret up icon"></i>
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img className="ui avatar image" src={this.props.submitterAvatarUrl}/>
          </div>
        </div>
      </div>)
  }
}

ReactDOM.render(<ProductList/>, document.getElementById('content'))
