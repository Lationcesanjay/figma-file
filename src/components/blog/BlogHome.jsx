import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import { BlogCard } from './blogCard';
import { BlogFooter } from './footer';
// import { useLoginSignUp } from '../BlogApi/LoginContext';

const BlogHome = () => {
  //  const navigate = useNavigate();
  //  const {isAuthorized}=useLoginSignUp();
 

  //  if (!isAuthorized) {
  //   navigate("/login");
  // }

  return (
    <div>
      <Header />
        <BlogCard />  
      <BlogFooter />
    </div>
  );
};

export default BlogHome;
