import "./adminpostcard.css";

const Adminpostcard = ({
  id,
  description,
  imageUrl,
  dateCreated,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="product-admin-card">
      <div className="product-admin-card-content">
        <div className="product-admin-card-image">
          <img
            src={`http://localhost:5000/uploads/${imageUrl}`}
            alt={`Post Image`}
            className="product-admin-card-image-img"
          />
        </div>
        <div className="product-admin-card-description">
          Created on: {dateCreated}
        </div>

        <div className="product-admin-card-description">{description}</div>
      </div>

      <div className="product-admin-card-button-container">
        <button className="product-admin-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="product-admin-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Adminpostcard;
