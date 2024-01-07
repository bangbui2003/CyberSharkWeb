import React from "react";
import { Link } from "react-router-dom";
import blog from "../images/blog-1.jpg";
const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={blog} className="img-fluid w-100" alt="blog-image" />
      </div>
      <div className="blog-content">
        <p className="date">20 MAY, 2023</p>
        <h5 className="title">
          Liệu rằng những chiếc máy tính này sẽ thống trị tương lai?
        </h5>
        <p className="desc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          atque. Laboriosam, ex rerum? Magnam voluptate dicta veniam
          consequuntur explicabo maxime animi numquam quis dolor, ipsum natus
          dignissimos alias vitae magni.
        </p>
        <Link to="/blog/:id" className="button">
          Đọc thêm
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
