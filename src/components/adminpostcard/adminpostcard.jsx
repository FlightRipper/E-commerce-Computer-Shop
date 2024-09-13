import "./adminpostcard.css";

const Adminpostcard = ({ title, description, imageUrl, dateCreated }) => {
  return (
    <div className="product-admin-card">
      <div className="product-admin-card-content">
        <div className="product-admin-card-image">
          <img
            src={imageUrl}
            alt={`Post Image`}
            className="product-admin-card-image-img"
          />
        </div>
        <div className="product-admin-card-description">
          Created on: {dateCreated}
        </div>

        <div className="product-admin-card-date-created">{description}</div>
      </div>

      <div className="product-admin-card-button-container">
        <button className="product-admin-button">Edit</button>
        <button className="product-admin-button">Delete</button>
      </div>
    </div>
  );
};

export default Adminpostcard;
