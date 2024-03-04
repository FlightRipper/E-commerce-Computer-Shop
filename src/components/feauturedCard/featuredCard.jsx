import './feauturedCar.css'
const FeaturedCard = ({image, price, title, description}) => {
   return (
    <div className="feauturedcard">
        <img src={`https://e-commerce-computer-shop-backend.onrender.com/uploads/${image}`} alt="" className="feauturedcard__image"/>
        <div className="feauturedcard__content" >
            <p className="feauturedcard__title">Name : {title}</p>
            <p className="feauturedcard__price">Price : {price}$</p>
            <p className="feauturedcard__description">Information : {description}</p>
        </div>
    </div>
   )
}

export default FeaturedCard