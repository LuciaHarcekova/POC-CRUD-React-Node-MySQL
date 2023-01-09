import './App.css';
import { useState } from "react";
import axios from "axios";


function App() {

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  // Example of updated field
  const [newPassword, setNewPassword] = useState("");

  const addUser = () => {
    axios.post("http://localhost:3000/create", {
      email: username,
      firstName: firstName,
      surname: surname,
      password: password,
    })
      .then(() => {
        console.log("success");
        setUsers([
          ...users,
          {
            email: username,
            firstName: firstName,
            surname: surname,
            password: password,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    axios.get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
      });
  };

  const updateUser = (id) => {
    axios.put("http://localhost:3000/update", { password: newPassword, id: id }).then(
      (response) => {
        setUsers(
          users.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                username: val.username,
                firstName: val.firstName,
                surname: val.surname,
                password: newPassword,
                email: val.email,
              }
              : val;
          })
        );
      }
    );
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
      setUsers(
        users.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="add-user-form">

        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value)
          }}
        />

        <label>First name:</label>
        <input
          type="text"
          onChange={(event) => {
            setFirstName(event.target.value)
          }}
        />

        <label>Surname:</label>
        <input
          type="text"
          onChange={(event) => {
            setSurname(event.target.value)
          }}
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />

        <button onClick={addUser}>Add User</button>

      </div>
      <hr />
      <div className="display-users">
        <button onClick={getUsers}>Display users</button>

        {
          users.map((val, key) => {
            return (
              <div className="user-details">
                <div>
                  <h6>Username: {val.username}</h6>
                  <h6>First name : {val.firstName}</h6>
                  <h6>Surname: {val.surname}</h6>
                  <h6>Email: {val.email}</h6>
                </div>
                <div>
                  <input
                    type="text"
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                  />
                  <button onClick={() => { updateUser(val.id); }}>Update</button>
                  <button onClick={() => { deleteUser(val.id); }}>Delete</button>
                </div>
              </div>
            );
          })}

      </div>
    </div>
  );
}

export default App;
