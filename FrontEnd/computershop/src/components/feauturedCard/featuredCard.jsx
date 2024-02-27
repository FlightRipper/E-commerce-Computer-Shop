import './feauturedCar.css'
const FeaturedCard = ({image, price, title, description}) => {
   return (
    <div className="feauturedcard">
        <img src={`http://localhost:5000/uploads/${image}`} alt="" className="feauturedcard__image"/>
        <div className="feauturedcard__content" >
            <p className="feauturedcard__title">{title}</p>
            <p className="feauturedcard__price">Price : {price}$</p>
            <p className="feauturedcard__description">{description}</p>
        </div>
    </div>
   )
}

export default FeaturedCard