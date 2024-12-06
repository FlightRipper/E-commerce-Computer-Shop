import { useState } from "react";
import "../custom.scss";
import { FiUpload } from "react-icons/fi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Upload = styled.div`
  position: relative;
  box-sizing: border-box;
  border: 2px #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  cursor: pointer;
  animation: colorfulBorder 10s infinite;
  &:hover {
    background: #00000013;
  }
`;

const RegisterPage = () => {
  const { dispatch } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [imageName, setImageName] = useState("Drag and drop to upload a file");

  const handleChange = (file) => {
    setFile(file);
    setImageName(file.name);
  };

  const EyeOpenIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="18"
      viewBox="0 0 576 512"
    >
      <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
    </svg>
  );

  const EyeClosedIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="20"
      viewBox="0 0 640 512"
    >
      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
    </svg>
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(
      username,
      password,
      confirmPassword,
      email,
      phonenumber,
      address,
      file
    );

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phonenumber", phonenumber);
    formData.append("address", address);
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        // Save the user and token to the local storage
        localStorage.setItem("user", JSON.stringify(response.data.newUser));
        console.log("zaber")
        console.log(response.data.newUser)
        localStorage.setItem("token", response.data.token);

        // Update the context
        dispatch({ type: "LOGIN", payload: response.data.newUser });

        setError("Registration successful");

        navigate("/homepage");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          error.response.data.errors.forEach(errorMessage => {
            setError("Registration failed: " + errorMessage);
          });
        }
      } else {
        setError("Registration failed: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="bg-dark vh-100 vw-100 d-flex justify-content-center">
        <div className="container d-flex flex-column align-items-center justify-content-center align-self-center">
          <label className="w-50 mt-5" />
          <form
            className="p-5 bg-light rounded-5  needs-validation w-75 h-50 rounded mt-2 mb-3 Registration"
            onSubmit={handleSubmit}
          >
            <div className="d-flex justify-content-center align-items-center">
              <h1 className="custom-h1-style">Register</h1>
            </div>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label mt-3 custom-label-headers-for-inputs"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Please enter a username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label custom-label-headers-for-inputs"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                required
                placeholder="Please enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="eye-icon mb-4" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </div>
              <div id="passwordHelpBlock" className="form-text opacity-50">
                Your password must be 8-20 characters long, contain letters and
                numbers and special characters, and must not contain spaces, or
                emojis.
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="form-label custom-label-headers-for-inputs"
              >
                Confirm Password (passwords must match)
              </label>
              <input
                type="password"
                className="form-control"
                required
                placeholder="Confirm password (must match)"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <div className="mb-3 d-flex justify-content-center align-items-center wase3">
              <div className="d-flex justify-content-center align-items-center flex-column gap-2">
                <label
                  htmlFor="image"
                  className="form-label custom-label-headers-for-inputs"
                >
                  Upload Profile Picture
                </label>
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  classes="fileuploader"
                >
                  <Upload>
                    <FiUpload size={30} /> {imageName}
                  </Upload>
                </FileUploader>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column gap-2">
                <label
                  htmlFor="address"
                  className="form-label custom-label-headers-for-inputs"
                >
                  {" "}
                  Enter Your Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Enter your address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
            </div>
            <div className="mb-3 mt-3 d-flex justify-content-center align-items-center gap3laiha">
              <div className="d-flex justify-content-center align-items-center flex-column gap-2">
                <label
                  htmlFor="image"
                  className="form-label custom-label-headers-for-inputs"
                >
                  Enter your phone number
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Enter your number"
                  onChange={(e) => setPhonenumber(e.target.value)}
                  value={phonenumber}
                />
              </div>
              <div className="d-flex align-items-center flex-column gap-2 ">
                <label
                  htmlFor="address"
                  className="form-label custom-label-headers-for-inputs"
                >
                  {" "}
                  Enter Your Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            {error && (
              <div
                className={
                  error.includes("error")
                    ? "form-group text-success"
                    : "form-group text-danger"
                }
              >
                <span>{error}</span>
              </div>
            )}
            <div className="d-flex justify-content-center align-items-center">
              <h6>
                Just a visitor?<Link to={"/homepage"}> Homepage</Link>
              </h6>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="btn btn-danger w-50">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;