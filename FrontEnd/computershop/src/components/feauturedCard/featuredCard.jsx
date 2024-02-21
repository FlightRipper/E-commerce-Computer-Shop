import './feauturedCar.css'
const FeaturedCard = ({image, price, title, description}) => {
   return (
    <div class="feauturedcard">
        <img src={`http://localhost:5000/uploads/${image}`} alt="" classname="feauturedcard__image"/>
        <div class="feauturedcard__content" >
            <p class="feauturedcard__title">{title}</p>
            <p class="feauturedcard__price">Price : {price}$</p>
            <p class="feauturedcard__description">{description}</p>
        </div>
    </div>
   )
}

export default FeaturedCard