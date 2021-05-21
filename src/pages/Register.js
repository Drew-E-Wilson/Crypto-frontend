import {useState} from 'react';
import { useHistory } from 'react-router-dom'


export default function Register({ createModal, setCreateModal }){
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
    



















// export default function Register() {
//     const [newInfo, setNewInfo] = useState({
//         firstname: "Empty",
//         lastname: "Empty",
//         genderpronouns: "Empty",
//         location: "Empty",
//         aboutme: "Empty",
//         linkedin: "Empty"
//       });
//     const handleSubmit = async (e) => {   
//         // console.log(pkKey) 
//         e.preventDefault();
//         try {
//             const response = await fetch(
//                 `https://capstoneback.herokuapp.com/`
//                 ,
//                 {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(newInfo)
//                 }
//             );
//             const data = await response.json();
//             console.log(newInfo)
//             //   setTodos([...todos, data]);
//             setNewInfo({
//                 username: "",
//                 firstname: "",
//                 email: "",
//                 password: ""
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     const handleChange = (e) => {
//         setNewInfo({ ...newInfo, [e.target.name]: e.target.value });

//         console.log(newInfo)
//       };

//     return (
//         <div >
//             <h1 >Create New User</h1>
//             <form  onSubmit={handleSubmit}>
//                 <label>
//                     Username:{""}
//                     <input
//                     type="text"
//                     name="firstname"
//                     value={newInfo.firstname}
//                     onChange={handleChange}
//                     />
//                      First name:{""}
//                     <input
//                     type="text"
//                     name="firstname"
//                     value={newInfo.firstname}
//                     onChange={handleChange}
//                     />
//                     Email:{""}
//                     <input
//                     type="text"
//                     name="firstname"
//                     value={newInfo.firstname}
//                     onChange={handleChange}
//                     />
//                     Password:{""}
//                     <input
//                     type="text"
//                     name="firstname"
//                     value={newInfo.firstname}
//                     onChange={handleChange}
//                     />
//                 </label><br /><br />
//                 <input />
//              </form>
//          </div>
//     )
// }