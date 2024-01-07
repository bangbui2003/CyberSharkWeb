import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import BlogCard from "../components/BlogCard.js";
import Container from "../components/Container.js";
const Blog = () => {
  return (
    <>
      <Meta title={"Tin tức"} />
      <BreadCumb title="Tin tức" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Tìm kiếm theo sản phẩm</h3>
              <div>
                <ul className="ps-0">
                  <li>Laptop</li>
                  <li>Tai nghe</li>
                  <li>Bàn phím</li>
                  <li>Chuột</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-6 mb-3">
                <BlogCard />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
