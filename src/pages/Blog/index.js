import React from 'react';
import './blog.css'
import {Outlet} from "react-router-dom";


const Blog = () => {
    return (
        <div id="blog-page" className="container mt-5">
            <Outlet/>
        </div>
    );
};

export default Blog;