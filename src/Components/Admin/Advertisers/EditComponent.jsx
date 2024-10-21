import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import Input from '../../Shared/Input/Input';
import { editAdvertiser } from '../../../Validation/validation';
import Swal from 'sweetalert2';

export default function EditComponent({ id, name, email }) {
    console.log("Props received:", { id, name, email });
    const onSubmit = async (updatedData) => {
        try {
            const formData = new FormData();
            formData.append('id', updatedData.id);
            formData.append('firstName', updatedData.name);
            formData.append('email', updatedData.email);
            const { data } = await axios.put(`https://localhost:7105/api/Advertiser/${id}`, formData);
            if (data.succeeded) {
                Swal.fire({
                    title: "Advertiser Account updated successfully",
                    text: "You can see the modified account in dashboard",
                    icon: "success"
                });
            } else {
                formik.resetForm();
                // Assuming setOpenUpdate is a state function you have defined
                setOpenUpdate(false);
            }
        } catch (error) {
            console.error('Error updating Advertiser:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            id: `${id}`,
            name: `${name}`,
            email: `${email}`,
        },
        validationSchema: editAdvertiser,
        onSubmit,
    });
    console.log("Initial Values:", formik.initialValues);
    console.log("Current Formik Values:", formik.values);
    const inputs = [
        {
            type: 'text',
            id: 'id',
            name: 'id',
            title: 'ID',
        },
        {
            type: 'text',
            id: 'name',
            name: 'name',
            title: 'Name',
        },
        {
            type: 'email',
            id: 'email',
            name: 'email',
            title: 'User Email',
        },
    ];

    const renderInputs = inputs.map((input, index) => (
        <Input
            key={index}
            type={input.type}
            id={input.id}
            name={input.name}
            title={input.title}
            value={formik.values[input.name]} // Directly binding from Formik values
            errors={formik.errors}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
        />
    ));

    return (
        <>
            {id}
            <form onSubmit={formik.handleSubmit} className="row justify-content-center">
                {renderInputs}
                <button
                    sx={{ px: 2 }}
                    variant="contained"
                    className="m-2 btn primaryBg"
                    type="submit"
                    disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0}
                >
                    Update
                </button>
            </form>
        </>
    );
}
