import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSingleOrder } from "../features/user/userSlice";
import BreadCumb from "../components/BreadCumb";
import Container from "../components/Container";
import { getAllProducts } from "../features/product/productSlice";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const getProductDetails = async (item, imageFiles) => {
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

  return {
    url: url,
    productId: item?.Product_Id,
    productName: item?.Product_Name,
    quantity: item?.Quantity,
    price: item?.Price,
  };
};

const OrderDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState(null);
  const orderId = location.pathname.split("/")[2];
  const orderState = useSelector((state) => state.auth.userOrder);
  const productState = useSelector((state) => state.product.products);
  const pImageListRef = ref(storage, "images/product");
  // List all items (files) and prefixes (folders) under this storage reference
  const fetchData = async () => {
    const response = await listAll(pImageListRef);
    return response;
  };
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
    dispatch(getAllProducts());
  }, [dispatch, orderId]);

  useEffect(() => {
    async function fetchData() {
      // List all items (files) and prefixes (folders) under this storage reference
      const response = await listAll(pImageListRef);

      const productDetailsPromises = productState.data.map((item) =>
        getProductDetails(item, response)
      );
      const productDetails = await Promise.all(productDetailsPromises);
      setProductDetail(productDetails);
    }

    fetchData();
  }, [productState, orderState]);

  if (productDetail) {
    console.log(productDetail);
  }
  return (
    <>
      <BreadCumb title="Chi tiết đơn hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div
            className="col-12"
            style={{ backgroundColor: "white", color: "black", padding: 4 }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-content-center">
                <p style={{ fontWeight: "600" }}>Mã đơn hàng {orderId}</p>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-block">
                  {" "}
                  <p
                    style={{
                      color: "red",
                      textTransform: "uppercase",
                      fontWeight: "550",
                    }}
                  >
                    {orderState !== ""
                      ? orderState?.data.status === "Unpaid"
                        ? "Chưa thanh toán"
                        : orderState?.data.status === "Cancel"
                        ? "Đã huỷ"
                        : orderState?.data.status === "Delivery"
                        ? "Đã giao hàng"
                        : "Đã thanh toán"
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {productDetail &&
              productDetail.map((product, index) => {
                const divStyle = {
                  backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff", // Alternate colors based on index
                  padding: 16,
                };
                return (
                  <>
                    <div
                      className="row col-12 align-items-center"
                      style={divStyle}
                      key={index}
                    >
                      <div className="col-3">
                        <img src={product?.url} alt="" />
                      </div>
                      <div className="col-6">
                        <p>{product?.productName}</p>
                        <p>{product?.quantity}</p>
                      </div>
                      <div className="col-3">
                        <p>{product?.price}</p>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default OrderDetail;
