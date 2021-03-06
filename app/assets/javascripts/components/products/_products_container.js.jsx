var ProductsContainer = React.createClass({
  componentWillMount(){
    this.fetchProducts();
  },

  fetchProducts() {
    // Making an AJAX request to our own server and getting @product.all in json format
    $.ajax({
      url: this.props.productsPath,
      dataType: 'json',
      success: function(data) {
        {/* console.log(data); */}
        this.setState({products: data.products});
      }.bind(this),
      error: function(data) {
        this.setState({products: []});
      }.bind(this)
    });
  },

  searchProducts(event) {
    event.preventDefault();
    if (event.target.value) {
      $.ajax({
        // Sending the AJAX search query request to the search function in products_controller (to searchkick)
        url: this.props.searchPath+"?query="+event.target.value,
        dataType: 'json',
        success: function(data) {
          {/* console.log(data); */}
          this.setState({products: data.products});
        }.bind(this),
        error: function(data) {
          this.setState({products: []});
        }.bind(this)
      });
    }
    else {
      this.fetchProducts(); // Add interval here to check for new comments every second?
    }

  },

  getInitialState() {
    return { products: [] };
  },

  render: function() {

    return (

      <div className="container for-sale-wrapper">
        <div className="for-sale-banner">
          {/* Search bar */}
          <div className="row for-sale-row">
            <div className="col-xs-12">
              <h1 className="for-sale-title">Thinking about building an app?</h1>
              <h3>What if someone already did the job for you...</h3>
              <div>

                {/* Rendering search form */}
                <ProductsSearch searchPath={this.props.searchPath} submitPath={this.searchProducts}/>

              </div>
            </div>
          </div>

          <div className="row home-row">
            {/* List of product categories */}
            <Categories products={this.props.products} searchPath={this.props.searchPath} submitPath={this.searchProducts}/>
            {/* List of search results --> */}
            <div className="col-xs-10 col-xs-offset-1 col-lg-7 col-lg-offset-1 home-product-list-wrapper">
              <h2 className="list-title">Hottest apps right now</h2>
              <div className="container home-product-list">
                <div className="row">
                  <div className="col-xs-12">

                    {/* Rendering search results */}
                    <ProductList products={this.state.products}/>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
})
