import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import main_banner from "../images/main-banner.jpg";
import cat_banner from "../images/catbanner-01.jpg";
import Container from "../components/Container";
import { services } from "../utils/Data";
import laptop from "../images/laptop.png";
import headphone from "../images/headphone.png";
import mouse from "../images/mouse.png";
import keyboard from "../images/keyboard.png";
import watch from "../images/watch.jpg";
import apple from "../images/brand-01.png";
import dell from "../images/brand-04.png";
import logitech from "../images/logo-logitech.png";
import msi from "../images/logo-msi.png";
import razer from "../images/logo-razer.png";
import asus from "../images/logo-asus.png";
import steelseries from "../images/logo-steelseries.png";
import wish from "../images/wish.svg";
import compare from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addcard from "../images/add-cart.svg";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { getBrands } from "../features/brand/brandSlice";
import { valueLabelFormat } from "../utils/formatter";
const getProductDetails = async (item, brands, imageFiles) => {
  const imageLinks = JSON.parse(item.product_Images);
  const main_image = imageLinks[0];
  const matchingItem = imageFiles.items.find((imageFile) =>
    imageFile.name.endsWith(main_image)
  );
  let url =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900";
  if (matchingItem) {
    url = await getDownloadURL(matchingItem);
  }

  const brand = brands.find((brandItem) => brandItem.id == item.brand_Id);

  return {
    url: url,
    productId: item?.id,
    brandName: brand?.name,
    categoryId: item?.category_Id,
    productName: item?.name,
    description: item?.description,
    productPrice: item?.sale_Price,
  };
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsResult, productsResult] = await Promise.all([
          dispatch(getBrands()),
          dispatch(getAllProducts()),
        ]);

        if (brandsResult.payload && productsResult.payload) {
          setBrands(brandsResult.payload.data);
          setProducts(productsResult.payload.data);
          setIsDataLoaded(true);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (brands.length === 0 && products.length === 0 && !isDataLoaded) {
      fetchData();
    }
  }, [dispatch, brands, products, isDataLoaded]);

  useEffect(() => {
    async function fetchData() {
      // return storage reference for the given url
      const pImageListRef = ref(storage, "images/product");
      // List all items (files) and prefixes (folders) under this storage reference
      const response = await listAll(pImageListRef);

      const productDetailsPromises = products.map((item) =>
        getProductDetails(item, brands, response)
      );
      const productDetails = await Promise.all(productDetailsPromises);
      setImages(productDetails);
    }

    fetchData();
  }, [products, brands]);
  // if (images.length != 0) {

  // }
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <Link>
                <img
                  src={main_banner}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap justify-content-between gap-10 align-items-center">
              <div className="small-banner position-relative">
                <Link>
                  <img
                    src={cat_banner}
                    className="img-fluid rounded-3"
                    alt="catbanner"
                  />
                </Link>
              </div>
              <div className="small-banner position-relative">
                <Link>
                  <img
                    src={cat_banner}
                    className="img-fluid rounded-3"
                    alt="catbanner"
                  />
                </Link>
              </div>
              <div className="small-banner position-relative">
                <Link>
                  <img
                    src={cat_banner}
                    className="img-fluid rounded-3"
                    alt="catbanner"
                  />
                </Link>
              </div>
              <div className="small-banner position-relative">
                <Link>
                  <img
                    src={cat_banner}
                    className="img-fluid rounded-3"
                    alt="catbanner"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Laptops</h6>
                  <p>10 items</p>
                </div>
                <img src={laptop} alt="laptop" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Tai nghe</h6>
                  <p>10 items</p>
                </div>
                <img src={headphone} alt="headphone" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Chuột</h6>
                  <p>10 items</p>
                </div>
                <img src={mouse} alt="mouse" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Bàn phím</h6>
                  <p>10 items</p>
                </div>
                <img src={keyboard} alt="keyboard" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="marque-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 ww-25">
                  <img src={apple} alt="brand" />
                </div>
                <div className="mx-4 ww-25">
                  <img src={dell} alt="brand" />
                </div>
                <div className="mx-4 ww-25">
                  <img src={logitech} alt="brand" />
                </div>
                <div className="mx-4 ww-25">
                  <img src={msi} alt="brand" />
                </div>
                <div className="mx-4 ww-25">
                  <img src={razer} alt="brand" />
                </div>
                <div className="mx-4 ww-25">
                  <img src={asus} alt="brand" />
                </div>
                <div className="mx-4 ww-25">
                  <img src={steelseries} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      {/* <Container class1="special-wrapper-2 home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special products</h3>
            <div className="row">
              <SpecialProduct />
              <SpecialProduct />
              <SpecialProduct />
            </div>
          </div>
        </div>
      </Container>

      <Container class1="laptop-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Laptop</h3>
          </div>{" "}
          <div className="row"></div>
          <div className="row">
            <div className="col"></div>
            <div className="col text-center">
              <Link className="button">Xem thêm</Link>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </Container> */}

      <Container class1="headphone-wrapper home-wrapper-2 py-5 px-5">
        {" "}
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Tai nghe</h3>
          </div>{" "}
          <div className="row">
            {images.length != 0 && (
              <div className="d-flex gap-10 flex-wrap">
                {images
                  .filter(
                    (image, index) => image.categoryId === 9 && index != 0
                  )
                  .slice(0, 4)
                  .map((productDetail) => {
                    return (
                      <>
                        <div key={productDetail.productId} className={"gr-3"}>
                          <div className="product-card position-relative">
                            <div className="wishlist-icon position-absolute">
                              <button className="border-0 bg-transparent">
                                <img
                                  src={wish}
                                  className="img-fluid"
                                  alt="wishlist"
                                />
                              </button>
                            </div>
                            <div className="product-image">
                              <img
                                src={productDetail.url}
                                className=" mx-auto"
                                alt="product image"
                                width={250}
                                height={250}
                                onClick={() => {
                                  navigate("/product/:id");
                                }}
                              />
                            </div>
                            <div className="product-details">
                              <h6 className="brand">
                                {productDetail.brandName}
                              </h6>
                              <h5 className="product-title">
                                {productDetail.productName.length > 30
                                  ? productDetail.productName.substr(0, 30) +
                                    "..."
                                  : productDetail.productName}
                              </h5>
                              <ReactStars
                                count={5}
                                size={24}
                                value={3}
                                edit={false}
                                activeColor="#ffd700"
                              />
                              <p className="price">
                                <b>
                                  {valueLabelFormat(productDetail.productPrice)}
                                </b>
                              </p>
                            </div>
                            <div className="action-bar position-absolute">
                              <div className="d-flex flex-column gap-15">
                                <button className="border-0 bg-transparent">
                                  <img src={compare} alt="compare" />
                                </button>
                                <button className="border-0 bg-transparent">
                                  <img
                                    src={view}
                                    alt="view"
                                    onClick={() => {
                                      navigate(
                                        "/product/" + productDetail?.productId
                                      );
                                    }}
                                  />
                                </button>
                                <button className="border-0 bg-transparent">
                                  <img src={addcard} alt="addcart" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col text-center">
              <Link className="button">Xem thêm</Link>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </Container>

      <Container class1="keyboard-wrapper home-wrapper-2 py-5  px-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Bàn phím</h3>
          </div>{" "}
          <div className="row">
            {" "}
            {images.length != 0 && (
              <div className="d-flex gap-10 flex-wrap">
                {images
                  .filter(
                    (image, index) => image.categoryId === 10 && index != 0
                  )
                  .slice(0, 4)
                  .map((productDetail) => {
                    return (
                      <>
                        <div key={productDetail.productId} className={"gr-3"}>
                          <div className="product-card position-relative">
                            <div className="wishlist-icon position-absolute">
                              <button className="border-0 bg-transparent">
                                <img
                                  src={wish}
                                  className="img-fluid"
                                  alt="wishlist"
                                />
                              </button>
                            </div>
                            <div className="product-image">
                              <img
                                src={productDetail.url}
                                className="mx-auto"
                                alt="product image"
                                width={250}
                                height={250}
                                onClick={() =>
                                  navigate(
                                    "/product/" + productDetail?.productId
                                  )
                                }
                              />
                            </div>
                            <div className="product-details">
                              <h6 className="brand">
                                {productDetail.brandName}
                              </h6>
                              <h5 className="product-title">
                                {productDetail.productName.length > 30
                                  ? productDetail.productName.substr(0, 30) +
                                    "..."
                                  : productDetail.productName}
                              </h5>
                              <ReactStars
                                count={5}
                                size={24}
                                value={3}
                                edit={false}
                                activeColor="#ffd700"
                              />
                              <p className="price">
                                <b>
                                  {valueLabelFormat(productDetail.productPrice)}
                                </b>
                              </p>
                            </div>
                            <div className="action-bar position-absolute">
                              <div className="d-flex flex-column gap-15">
                                <button className="border-0 bg-transparent">
                                  <img src={compare} alt="compare" />
                                </button>
                                <button className="border-0 bg-transparent">
                                  <img
                                    src={view}
                                    alt="view"
                                    onClick={() =>
                                      navigate(
                                        "/product/" + productDetail?.productId
                                      )
                                    }
                                  />
                                </button>
                                <button className="border-0 bg-transparent">
                                  <img src={addcard} alt="addcart" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col text-center">
              <Link className="button">Xem thêm</Link>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </Container>

      <Container class1="mouse-wrapper home-wrapper-2 py-5  px-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Chuột</h3>
          </div>{" "}
          <div className="row">
            {images.length != 0 && (
              <div className="d-flex gap-10 flex-nowrap">
                {images
                  .filter(
                    (image, index) => image.categoryId === 11 && index != 0
                  )
                  .slice(0, 4)
                  .map((productDetail) => {
                    return (
                      <>
                        <div key={productDetail.productId} className={"gr-3"}>
                          <div className="product-card position-relative">
                            <div className="wishlist-icon position-absolute">
                              <button className="border-0 bg-transparent">
                                <img
                                  src={wish}
                                  className="img-fluid"
                                  alt="wishlist"
                                />
                              </button>
                            </div>
                            <div className="product-image">
                              <img
                                src={productDetail.url}
                                className=" mx-auto"
                                alt="product image"
                                width={250}
                                height={250}
                                onClick={() =>
                                  navigate(
                                    "/product/" + productDetail?.productId
                                  )
                                }
                              />
                            </div>
                            <div className="product-details">
                              <h6 className="brand">
                                {productDetail.brandName}
                              </h6>
                              <h5 className="product-title">
                                {productDetail.productName.length > 30
                                  ? productDetail.productName.substr(0, 30) +
                                    "..."
                                  : productDetail.productName}
                              </h5>
                              <ReactStars
                                count={5}
                                size={24}
                                value={3}
                                edit={false}
                                activeColor="#ffd700"
                              />
                              <p className="price">
                                <b>
                                  {valueLabelFormat(productDetail.productPrice)}
                                </b>
                              </p>
                            </div>
                            <div className="action-bar position-absolute">
                              <div className="d-flex flex-column gap-15">
                                <button className="border-0 bg-transparent">
                                  <img src={compare} alt="compare" />
                                </button>
                                <button className="border-0 bg-transparent">
                                  <img
                                    src={view}
                                    alt="view"
                                    onClick={() =>
                                      navigate(
                                        "/product/" + productDetail?.productId
                                      )
                                    }
                                  />
                                </button>
                                <button className="border-0 bg-transparent">
                                  <img src={addcard} alt="addcart" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col text-center">
              <Link className="button">Xem thêm</Link>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper home-wrapper-2 py-5  px-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Tin tức, khuyến mãi</h3>
          </div>
          <div className="row">
            <div className="col-3">
              <BlogCard />
            </div>
            <div className="col-3">
              <BlogCard />
            </div>
            <div className="col-3">
              <BlogCard />
            </div>
            <div className="col-3">
              <BlogCard />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
