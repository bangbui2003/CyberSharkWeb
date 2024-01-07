import React, { useEffect, useRef, useState } from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactImageZoom from "react-image-zoom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container.js";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../features/product/productSlice.js";
import { watch } from "../images/watch.jpg";
import { getBrands } from "../features/brand/brandSlice.js";
import { getCategories } from "../features/category/categorySlice.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { valueLabelFormat } from "../utils/formatter.js";
import { addToCart, getCart } from "../features/user/userSlice.js";

const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const imagesStorage = ref(storage, "images/product");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const productState = useSelector((state) => state.product.product);
  const categoryState = useSelector((state) => state.category.categories.data);
  const brandState = useSelector((state) => state.brand.brands.data);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getSingleProduct(getProductId));
  }, []);

  useEffect(() => {
    const imageFetch = async () => {
      const imgArray = JSON.parse(productState?.product_Images);
      const response = await listAll(imagesStorage);
      const urls = await Promise.all(
        imgArray?.map(async (imgFile) => {
          const matchingItem = response.items.find((imageFile) =>
            imageFile.name.endsWith(imgFile)
          );
          let url =
            "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900";
          if (matchingItem) {
            url = await getDownloadURL(matchingItem);
          }
          return url;
        })
      );
      setImages(urls);
    };

    if (productState) {
      imageFetch();
    }
  }, [productState]);

  const uploadCart = () => {
    if (user) {
      dispatch(
        addToCart({
          customer_Id: user.id,
          product_Id: getProductId,
          quantity: quantity,
        })
      );
      dispatch(getCart(localStorage.getItem("customer_Id")));
    } else {
      navigate("/login");
    }
  };

  const props = {
    width: 400,
    height: 500,
    zoomWidth: 600,
    img: images.length > 0 ? images[0] : "",
  };
  const [orderedProduct, setorderedProduct] = useState(true);

  const closeModal = () => {};
  return (
    <>
      <Meta title={`${productState?.name}`} />
      <BreadCumb title={`${productState?.name}`} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>{images.length > 0 && <ReactImageZoom {...props} />}</div>
            </div>
            <div className="other-product-images d-flex space-between gap-15">
              {images.length > 0 &&
                images.map((image, index) => {
                  if (index > 0) {
                    return (
                      <div key={index}>
                        <img
                          src={image}
                          className="img-fluid flex-grow-1"
                          alt=""
                        />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.name}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  {valueLabelFormat(productState?.sale_Price)}
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={3}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 đánh giá)</p>
                </div>
                <a className="review btn" href="#review">
                  Viết đánh giá
                </a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Loại sản phẩm: </h3>
                  <p className="product-data">
                    {
                      categoryState?.find(
                        (category) => category.id === productState?.category_Id
                      )?.name
                    }
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Thương hiệu: </h3>
                  <p className="product-data">
                    {" "}
                    {
                      brandState?.find(
                        (brand) => brand.id === productState?.brand_Id
                      )?.name
                    }
                  </p>
                </div>
                {/* <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Phân loại: </h3>
                  <p className="product-data">DEF</p>
                </div> */}
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tình trạng: </h3>
                  <p className="product-data">
                    {productState?.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Số lượng còn lại: </h3>
                  <p className="product-data">{productState?.quantity}</p>
                </div>
                <div className="d-flex gap-15 align-items-center flex-row mt-2 mb-3">
                  <h3 className="product-heading">Số lượng: </h3>
                  <div className="">
                    <input
                      type="number"
                      name="quantity"
                      min={1}
                      max={productState?.quantity}
                      style={{ width: "70px" }}
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-20 ms-5">
                    {(productState?.quantity > 0 && (
                      <>
                        <button
                          className="button border-0"
                          // data-bs-toggle="modal"
                          // data-bs-target="#staticBackdrop"
                          type="button"
                          onClick={() => {
                            uploadCart();
                          }}
                        >
                          Thêm vào giỏ hàng
                        </button>
                        <button to="/signup" className="button signup">
                          Mua ngay
                        </button>
                      </>
                    )) ||
                      (productState?.quantity <= 0 && (
                        <>
                          <button className="button border-0" type="submit">
                            Liên hệ
                          </button>
                        </>
                      ))}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" />
                      Thêm vào so sánh
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" />
                      Thêm vào danh sách yêu thích
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Giao hàng và đổi trả: </h3>
                  <p className="product-data">
                    Giao hàng và đổi trả miễn phí cho toàn bộ đơn hàng nội thành
                    thành phố Hồ Chí Minh <br />
                    Thời gian giao hàng dự kiến:
                    <b> 5 - 10 ngày</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Link tới sản phẩm</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                  >
                    Copy đường dẫn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Mô tả sản phẩm</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Nhận xét</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Nhận xét của khách hàng</h4>
                  <div className="d-flex gap-10 align-items-center">
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Dựa trên 2 reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Viết nhận xét
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Viết nhận xét</h4>
                <form action="" className="d-flex flex-column gap-20">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={0}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Gửi nhận xét</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div>
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">Võ Ngọc Lệ Xuân</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={3.5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">Sản phẩm dùng rất bền</p>
                  </div>
                  <div>
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">Quãng Đại Thi</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={3.5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">Sản phẩm này rất tuyệt vời</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Laptop</h3>
          </div>{" "}
          <div className="row">
            {/* <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard /> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
