import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Register.module.css';

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
        
        history.push('/login')
    }

    const createChange = (e) => {
        setCreateForm({
          ...createForm, [e.target.id]: e.target.value
        })
      }

      return (
          <div className={styles.register_page}>
              <h1 className={styles.register_name}>Register User</h1>
              <form onSubmit={createUser} className={styles.form_holder}>
                <label>
                {" "}
                Username:{" "}
                <input
                    type="text"
                    id="username"
                    className={styles.input_box}
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
                            className={styles.input_box}
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
                            className={styles.input_box}
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
                            className={styles.input_box}
                            value={createForm.password}
                            onChange={createChange}
                        />
                        <input type="submit"/>
                </label>
              </form>
          </div>
      )
}