import './adminproductcard.css'
const Adminproductcard = () =>  {
return(
<div class="product-admin-card">

<div class="product-admin-card-content">
  <div class="product-admin-card-image"><img src='https://cdn.discordapp.com/attachments/1146057681736581191/1280130262075834450/0_bhCQt7Hnc21Saxg7.png?ex=66daea36&is=66d998b6&hm=36886a56031a834802c682d3df2b1e82b70f0ccd9a6297582ff7561215aacd94&' /></div>
  <div class="product-admin-card-title">Product</div>
  <div class="product-admin-card-price">$39.99</div>
  <div class="product-admin-card-description">a77a</div>
</div>

<div className='product-admin-card-button-container'>   
<button className='product-admin-button'>
    Edit
  </button>
  <button className='product-admin-button'>
   Delete
  </button>
</div>
</div>
)}

export default Adminproductcard