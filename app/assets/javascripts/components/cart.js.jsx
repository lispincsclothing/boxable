var Cart = React.createClass({
  checkoutClickHandler: function(){
    if (this.props.signedIn) {
      window.location.replace("http://localhost:3000/checkout");
    } else {
      $(".modal-overlay").show();
      $(".checkout-modal").slideDown();
      $(".modal-overlay").on("click", function(){
        $(".modal-overlay").hide();
        $(".checkout-modal").hide();
      });
    }
  },
  render: function(){
    var cartArray = [];
    var cart = this.props.cart;
    var totalCheckoutPrice = 0;
    for (var key in cart) {
      if (cart[key]["quantity"] > 0)
        cartArray.push(<CartItem price={cart[key]["itemInfo"]["price"]} name={cart[key]["itemInfo"]["name"]} quantity={cart[key]["quantity"]} />)
        totalCheckoutPrice += cart[key]["itemInfo"]["price"] * cart[key]["quantity"]
    }

    console.log(cartArray);
    console.log(this.props.cart);

    return (
	      <div className="cart" >
                  <div className="inventory">
                    <h2>Box Summary</h2>
                    <table className="summary">
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                      {cartArray}
                    </table>
                  </div>
	      	<div className='checkout-container'>
                  <h3>Total: ${totalCheckoutPrice.toFixed(2)}</h3>
	      	<button type="button" onClick={this.checkoutClickHandler} className="btn btn-warning" id="checkout-btn">Checkout</button>
      	        </div>
	      </div>
    );
  }
});

