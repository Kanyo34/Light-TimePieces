import React, { useState, useEffect } from 'react';
import axios from "axios"; 
import { Link, useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProducts = () => {
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Check if user is already authenticated as admin
    useEffect(() => {
        const storedAuth = localStorage.getItem('adminAuth');
        if (storedAuth === 'true') {
            setIsAdmin(true);
        }
    }, []);

    const verifyAdmin = (e) => {
        e.preventDefault();
        // Replace 'your_admin_password' with your actual admin password
        if (adminPassword === 'Passord') {
            setIsAdmin(true);
            localStorage.setItem('adminAuth', 'true');
        } else {
            setError("Invalid admin password");
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading('Please wait as we upload your data');

        try {
            const data = new FormData();
            data.append("product_name", product_name);
            data.append("product_description", product_description);
            data.append("product_cost", product_cost);
            data.append("product_photo", product_photo);

            const response = await axios.post(
                "https://gabrielkanyo.pythonanywhere.com/api/add_product", 
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                }
            );
            
            setLoading("");
            setSuccess(response.data.Message);
            // Clear form after successful submission
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");
            
        } catch (error) {
            setLoading("");
            setError(error.response?.data?.message || error.message || "An error occurred");
        }
    };

    const logoutAdmin = () => {
        localStorage.removeItem('adminAuth');
        setIsAdmin(false);
        setAdminPassword("");
        navigate('/');
    };

    if (!isAdmin) {
        return (
            <div className='row justify-content-center mt-4'>
                <div className='col-md-5 p-4 card shadow'>
                    <h2>Admin Authentication Required</h2>
                    <form onSubmit={verifyAdmin}>
                        <p className='text-danger'>{error}</p>
                        <input 
                            type="password" 
                            placeholder='Enter Admin Password' 
                            className='form-control' 
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            required
                        />
                        <br />
                        <button type='submit' className='btn btn-primary w-100'>
                            Authenticate
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className='row justify-content-center mt-4'>
            <div className='p-0'>
               <NavBar />
                <br />
            </div>
            <div className='col-md-5 p-4 card shadow'>
                <h2>Upload products</h2>
                
                <form onSubmit={submit}>
                    <p className='text-warning'>{loading}</p>
                    <p className='text-success'>{success}</p>
                    <p className='text-danger'>{error}</p>

                    <input 
                        type="text" 
                        placeholder='Product name' 
                        required  
                        className='form-control'  
                        value={product_name}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <br />
                    <textarea 
                        placeholder='Product description' 
                        className='form-control' 
                        required  
                        value={product_description}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                    <br />
                    <input 
                        type="number" 
                        placeholder='Product cost' 
                        required 
                        className='form-control'  
                        value={product_cost}
                        onChange={(e) => setProductCost(e.target.value)}
                    />
                    <br />
                    <input 
                        type="file" 
                        placeholder='Product photo' 
                        className='form-control' 
                        required 
                        onChange={(e) => setProductPhoto(e.target.files[0])} 
                        accept='image/*'
                    />
                    <br />
                    <button type='submit' className='btn btn-primary w-100'>
                        Add product
                    </button>
                </form>
                <button 
                        onClick={logoutAdmin}
                        className='btn btn-danger'
                        style={{ marginLeft: 'auto' }}
                    >
                        Logout Admin
                    </button>
            </div>
            <Footer />
        </div>
    );
};

export default AddProducts;