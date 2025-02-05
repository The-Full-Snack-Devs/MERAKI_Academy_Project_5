import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [newUser, setnewUser] = useState({});
  const [Res, setRes] = useState("");
  const [Show, setShow] = useState(false);

  const CreateUser = () => {
    axios
      .post("http://localhost:5000/users/register", newUser)
      .then((rese) => {
        setRes(rese.data.message);
        setShow(true);
      })
      .catch((err) => {
        setRes(err.response.data.message);
        setShow(true);
      });
  };

  const uploadHandler = (x) => {
    const data = new FormData();
    data.append("file", x);
    data.append("upload_preset", "l2udrjei");

    axios
      .post("https://api.cloudinary.com/v1_1/dl7wtfv68/upload", data)
      .then(function (rese) {
        setnewUser({ ...newUser, Image: rese.data.url });
      })
      .catch(function (err) {
        console.log(err.response.data);
      });
  };

  return (
    <div>
      <div>
        <h2>
          Create Your Account
        </h2>
        <div>
          <label>
            Image
          </label>
          <div>
          <input
            type="file"
            onChange={(e) => {
              uploadHandler(e.target.files[0])
            }}
          />
        </div>
        </div>
        <div>
          <label>
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            onChange={(e) =>
              setnewUser({ ...newUser, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label>
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            onChange={(e) =>
              setnewUser({ ...newUser, lastName: e.target.value })
            }
          />
        </div>

        <div>
          <label>
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="0771234567"
            pattern="[0-9]{10}"
            onChange={(e) => setnewUser({ ...newUser, phone: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
          />
        </div>

        <div>
          <label>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setnewUser({ ...newUser, password: e.target.value })
            }
          />
        </div>

        <button
          onClick={CreateUser}
        >
          Create..
        </button>

        {Show && (
          <p
            className={`text-center mt-4 ${
              Res == "Account Created Successfully" ? "text-teal-600" : "text-red-500"
            }`}
          >
            {Res}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
