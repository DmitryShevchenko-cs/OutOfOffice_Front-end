import React from "react";
import CreateUserForm from "../Components/Forms/CreateUserForm";

const CreateUserPage = () => {
    const handleSubmit = async (formData: FormData) => {
        try {
            const response = await fetch('http://localhost:5182/api/manager/project-manager', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('User created successfully');
                // handle success (e.g., reset form, display message, etc.)
            } else {
                console.error('Failed to create user');
                // handle error (e.g., display error message)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <CreateUserForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateUserPage;
