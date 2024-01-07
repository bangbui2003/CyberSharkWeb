import React, { useEffect, useState } from "react";
import BreadCumb from "../components/BreadCumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { getAllProducts } from "../features/product/productSlice";
import { getBrands } from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import gr_4 from "../images/gr4.svg";
import gr_3 from "../images/gr3.svg";
import gr_2 from "../images/gr2.svg";
import gr_1 from "../images/gr.svg";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const getProductDetails = async (item, brands, imageList) => {
  const imageLinks = JSON.parse(item.product_Images);
  const main_image = imageLinks[0];
  const matchingItem = imageList.items.find((imageFile) =>
    imageFile.name.endsWith(main_image)
  );
  let url =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900";
  if (matchingItem) {
    url = await getDownloadURL(matchingItem);
  }

  const brand = brands.find((brandItem) => brandItem.id == item.brand_Id);

  return {
    url,
    productId: item?.id,
    brandName: brand?.name,
    productName: item?.name,
    description: item?.description,
    productPrice: item?.sale_Price,
  };
};

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const pImageListRef = ref(storage, "images/product");

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
      const response = await listAll(pImageListRef);
      const productDetailsPromises = products.map((item) =>
        getProductDetails(item, brands, response)
      );
      const productDetails = await Promise.all(productDetailsPromises);
      setImages(productDetails);
    }

    fetchData();
  }, [products, brands]);
  return (
    <>
      <Meta title={"Cửa hàng"} />
      <BreadCumb title="Cửa hàng" />
      <Container className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Theo loại sản phẩm</h3>
                <div>
                  <ul className="ps-0">
                    <li>Laptop</li>
                    <li>Tai nghe</li>
                    <li>Bàn phím</li>
                    <li>Chuột</li>
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Tình trạng</h3>
                <div>
                  <h5 className="sub-title"></h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        Còn hàng(1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        Hết hàng(0)
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Khoảng giá</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="From"
                      />
                      <label htmlFor="floatingInput">Từ</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="To"
                      />
                      <label htmlFor="floatingInput1">Đến</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Thẻ</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Laptop
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Tai nghe
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Bàn phím
                    </span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                      Chuột
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="filter-card mb-3">
                <h3 className="filter-title">Sản phẩm ngẫu nhiên</h3>
                {}
                <div>
                  <div className="random-products mb-3 d-flex">
                    <div className="w-50">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids Headphones Bulk 10 Pack Multi Colored For Students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>200.000đ</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img
                        src="../images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids Headphones Bulk 10 Pack Multi Colored For Students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>200.000đ</b>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort by:
                    </p>
                    <select name="" id="form-control form-select">
                      <option value="manual">Featured</option>
                      <option value="best-selling">Bán chạy nhất</option>
                      <option value="title-ascending">
                        Theo bảng chữ cái A-Z
                      </option>
                      <option value="title-descending">
                        Theo bảng chữ cái Z-A
                      </option>
                      <option value="price-ascending">
                        Theo giá từ thấp -{">"} cao
                      </option>
                      <option value="price-descending">
                        Theo giá từ cao -{">"} thấp
                      </option>
                      <option value="created-ascending">Cũ -{">"} Mới</option>
                      <option value="created-descending">Mới -{">"} Cũ</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts mb-0">21 products</p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => setGrid(3)}
                        src={gr_4}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => setGrid(4)}
                        src={gr_3}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => setGrid(6)}
                        src={gr_2}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => setGrid(12)}
                        src={gr_1}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  <div className="d-flex gap-10 flex-wrap">
                    {isDataLoaded && (
                      <ProductCard grid={grid} productDetails={images} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
