import {useState} from 'react';
import { useHistory } from 'react-router-dom'


export default function Register(){
    const history = useHistory()
    const [createForm, setCreateForm] = useState({
        username: "",
        firstname: "",
        email: "",
        password: ""
    })


    const createUser = async (e) => {
        e.preventDefault();
        const body = { ...createForm };
        try {
            const response = await fetch('https://capstoneback.herokuapp.com/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(body, {token: window.localStorage.getItem("token")})
            });
        } catch (error) {
            console.log(error);
        }
        setCreateForm({
            username: "",
            firstname: "",
            email: "",
            password: ""
        })
        // setCreateModal(false)
        history.push('/login')
    }

    const createChange = (e) => {
        setCreateForm({
          ...createForm, [e.target.id]: e.target.value
        })

      }

      return (
          <div>
              <form onSubmit={createUser}>
                <label>
                {" "}
                Username:{" "}
                <input
                    type="text"
                    id="username"
                    value={createForm.username}
                    onChange={createChange}
                />
                </label>
                <label>
                    {" "}
                    Fisrt Name:{" "}
                        <input
                            type="text"
                            id="firstname"
                            value={createForm.firstname}
                            onChange={createChange}
                        />
                </label>
                <label>
                    {" "}
                    Email:{" "}
                        <input
                            type="text"
                            id="email"
                            value={createForm.email}
                            onChange={createChange}
                        />
                </label>
                <label>
                    {" "}
                    Password:{" "}
                        <input
                            type="password"
                            id="password"
                            value={createForm.password}
                            onChange={createChange}
                        />
                        <input type="submit"/>
                </label>
              </form>
          </div>
      )
}