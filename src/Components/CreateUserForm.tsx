import { ChangeEvent, FormEvent, useState } from "react";
import { ICreateUserModel } from "../types/User";

interface ICreateUserFormProps {
    onSubmit: (formData: FormData) => void;
}

const CreateUserForm: React.FC<ICreateUserFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<ICreateUserModel>({
      login: '',
      password: '',
      fullName: '',
      photo: null
    });
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      setFormData(prevState => ({
        ...prevState,
        photo: file,
      }));
    };
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
  
      const formDataToSend = new FormData();
      formDataToSend.append('login', formData.login);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('fullName', formData.fullName);
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }
  
      onSubmit(formDataToSend);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Login:
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Photo:
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <button type="submit">Create User</button>
      </form>
    );
  };
  
  export default CreateUserForm;