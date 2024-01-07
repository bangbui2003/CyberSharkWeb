import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container.js";

const SingleBlog = () => {
  return (
    <>
      <Meta title={"Dynammic Blog Name"} />
      <BreadCumb title="Dynammic Blog Name" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Quay trở lại Tin tức
              </Link>
              <h3 className="title">
                The sun will rise against the moon invador
              </h3>
              <img
                src={blog}
                className="img-fluid w-100 my-4"
                style={{ height: "auto" }}
                alt="blog"
              />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
                at ipsa architecto eos neque quidem aliquam inventore dolor
                minus aliquid velit sequi id iste, nostrum sunt et eum placeat
                distinctio? Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Distinctio, laboriosam, culpa reprehenderit ut ex veniam
                odit provident numquam doloribus quo enim doloremque animi
                aliquam aliquid. Nulla beatae fugit id atque! Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Consequatur, id veniam,
                maxime dolores eligendi minus quod error necessitatibus ducimus
                eum commodi aspernatur similique hic illum suscipit tenetur
                voluptatem, minima pariatur?
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
