import './feauturedCar.css'
const FeaturedCard = (image, price, title, description) => {
   return (
    <div class="feauturedcard">
        <img src={image} alt="" />
        <div class="feauturedcard__content">
            <p class="feauturedcard__title">{title}</p>
            <p class="feauturedcard__price">{price}$</p>
            <p class="feauturedcard__description">{description}</p>
        </div>
    </div>
   )
}

export default FeaturedCard