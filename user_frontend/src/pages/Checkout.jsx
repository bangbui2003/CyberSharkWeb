import { useEffect, useState } from "react";
// import BreadCumb from "../components/BreadCumb.js";
// import Meta from "../components/Meta.js";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { valueLabelFormat } from "../utils/formatter";
import { getAllProducts } from "../features/product/productSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import { base_url } from "../utils/base_url";
import CheckoutMethods from "../sections/Payment";
import { addAddress, getAllAddresses } from "../features/address/addressSlice";
import { Button, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { createOrder } from "../features/user/userSlice";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, addresses } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Chọn địa chỉ giao hàng</DialogTitle>
      <List sx={{ pt: 0 }}>
        {addresses.map((address) => (
          <ListItem disableGutters key={address.id}>
            <ListItemButton onClick={() => handleListItemClick(address)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  address &&
                  `${address.receiver_Name} ${address.receiver_Telephone}, ${address.address_Street}, ${address.address_District}, ${address.address_City}, ${address.address_City}`
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAddress")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Thêm địa chỉ" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
};

const shippingSchema = yup.object({
  receiver_Name: yup.string().required("Hãy điền tên của bạn"),
  address_Street: yup
    .string()
    .required("Hãy điền địa chỉ nhà và tên đường của bạn"),
  address_District: yup.string().required("Hãy điền quận huyện mà bạn đang ở"),
  address_City: yup.string().required("Hãy chọn thành phố bạn đang ở"),
  address_Country: yup.string().required("Hãy chọn quốc gia bạn đang ở"),
  receiver_Telephone: yup
    .string()
    .matches(/^0/, "Số điện thoại bắt đầu với số 0")
    .required("Vui lòng điền số điện thoại")
    .min(10, "Độ dài tối thiểu là 10"),
  paymentMethod: yup.string().required("Vui lòng chọn hình thức thanh toán"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const cartState = useSelector((state) => state.auth.userCart.data);
  const addressState = useSelector((state) => state.address.userAddresses);
  const authState = useSelector((state) => state.auth);
  const productState = useSelector((state) => state.product.products);

  const pImageListRef = ref(storage, "images/product");

  const fetchUser = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    setUser(user);
  };

  const fetchAddress = (cid) => {
    dispatch(getAllAddresses(cid));
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
      dispatch(getAllProducts());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      fetchAddress(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (addressState) {
      const add = addressState.find((address) => address.is_Default == 1);
      // console.log(add);
      setSelectedValue(add);
    }
  }, [addressState]);

  const handleClickOpen = () => {
    if (selectedValue === null) {
      setSelectedValue({
        customer_Id: "",
        receiver_Name: "",
        address_Street: "",
        address_District: "",
        address_City: "",
        address_Country: "",
        receiver_Telephone: "",
      });
    }
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value === "addAddress") {
      formik.resetForm({
        customer_Id: "",
        receiver_Name: "",
        address_Street: "",
        address_District: "",
        address_City: "",
        address_Country: "",
        receiver_Telephone: "",
      });
      setSelectedValue(null);
    } else {
      formik.setValues({
        receiver_Name: selectedValue.receiver_Name,
        address_Street: selectedValue.address_Street,
        address_District: selectedValue.address_District,
        address_City: selectedValue.address_City,
        address_Country: selectedValue.address_Country,
        receiver_Telephone: selectedValue.receiver_Telephone,
      });
      setSelectedValue(value);
    }
  };

  const formik = useFormik({
    initialValues: {
      customer_Id: "",
      receiver_Name: "",
      address_Street: "",
      address_District: "",
      address_City: "",
      address_Country: "",
      receiver_Telephone: "",
      paymentMethod: paymentMethod,
    },
    validationSchema: shippingSchema,
    onSubmit: async (values) => {
      if (values.paymentMethod == "VnPay") {
        values.customer_Id = user?.id;
        const data = {
          customer_Id: user.id,
          type: paymentMethod,
          amount: cartState.cart_Total,
        };
        const response = await axios.post(`${base_url}Payment`, data);
        if (!response) {
          alert("error");
        }
        const productList = JSON.parse(cartState?.cart_Detail).map(
          (product, item) => {
            return {
              product_Id: product?.Product_Id,
              quantity: product?.Quantity,
            };
          }
        );
        if (selectedValue.receiver_Name === "") {
          dispatch(
            addAddress({
              customer_Id: values.customer_Id,
              receiver_Name: values.receiver_Name,
              address_Street: values.address_Street,
              address_District: values.address_District,
              address_City: values.address_City,
              address_Country: values.address_Country,
              receiver_Telephone: values.receiver_Telephone,
              is_Default: 0,
            })
          );
          dispatch(
            createOrder({
              order_Number: response.data.data.order_Number,
              customer_Id: values.customer_Id,
              address_Id: addressState.createdAddress.data.id,
              productLists: productList,
            })
          );
        } else {
          dispatch(
            createOrder({
              order_Number: response.data.data.order_Number,
              customer_Id: values.customer_Id,
              address_Id: selectedValue?.id,
              productLists: productList,
            })
          );
        }
        if (response.data.data.payment_Url) {
          window.location.href = response.data.data.payment_Url;
        } else {
          navigate("/Payment/vnpay_return");
        }
      }
    },
  });

  useEffect(() => {
    if (selectedValue) {
      formik.setValues({
        receiver_Name: selectedValue.receiver_Name,
        address_Street: selectedValue.address_Street,
        address_District: selectedValue.address_District,
        address_City: selectedValue.address_City,
        address_Country: selectedValue.address_Country,
        receiver_Telephone: selectedValue.receiver_Telephone,
      });
    }
  }, [selectedValue]);

  const changePaymentMethodHandler = (e) => {
    setPaymentMethod(e.target.value);
    formik.values.paymentMethod = e.target.value;
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">CyberShark</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Giỏ hàng
                    </Link>
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Thông tin giao hàng
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Vận chuyển
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price"
                    aria-current="page"
                  >
                    Thanh toán
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Đia chỉ email</h4>
              <p className="user-details total">{user && user?.user.email}</p>
              <h4 className="mb-3">Thông tin giao hàng</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 justify-content-between flex-wrap"
              >
                {selectedValue && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      fontWeight={550}
                      variant="subtitle1"
                      component="div"
                    >
                      {`${selectedValue.receiver_Name} ${selectedValue.receiver_Telephone}`}{" "}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      {`${selectedValue.address_Street}, ${selectedValue.address_District}, ${selectedValue.address_City}, ${selectedValue.address_Country}`}
                    </Typography>
                  </div>
                )}

                <br />
                <Button variant="outlined" onClick={handleClickOpen}>
                  Thay đổi địa chỉ giao hàng
                </Button>
                {addressState && selectedValue && (
                  <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                    addresses={addressState}
                  />
                )}
                <div className="w-100">
                  <select
                    name="address_Country"
                    onChange={formik.handleChange("address_Country")}
                    value={formik.values.address_Country}
                    onBlur={formik.handleBlur("address_Country")}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Quốc gia
                    </option>
                    <option value="Việt Nam">Việt Nam</option>
                  </select>
                  <div className="error-message ms-2 my-1">
                    {formik.touched.address_Country &&
                      formik.errors.address_Country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Họ và Tên"
                    className="form-control"
                    name="receiver_Name"
                    onChange={formik.handleChange("receiver_Name")}
                    value={formik.values.receiver_Name}
                    onBlur={formik.handleBlur("receiver_Name")}
                  />

                  <div className="error-message ms-2 my-1">
                    {formik.touched.receiver_Name &&
                      formik.errors.receiver_Name}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="form-control"
                    name="receiver_Telephone"
                    onChange={formik.handleChange("receiver_Telephone")}
                    value={formik.values.receiver_Telephone}
                    onBlur={formik.handleBlur("receiver_Telephone")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.receiver_Telephone &&
                      formik.errors.receiver_Telephone}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="address_City"
                    onChange={formik.handleChange("address_City")}
                    value={formik.values.address_City}
                    onBlur={formik.handleBlur("address_City")}
                    className="form-control form-select"
                  >
                    <option value="" selected disabled>
                      Chọn thành phố
                    </option>
                    <option value="Tuy Hoà" selected>
                      Tuy Hoà
                    </option>
                  </select>
                  <div className="error-message ms-2 my-1">
                    {formik.touched.address_City && formik.errors.address_City}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Quận, huyện"
                    className="form-control"
                    name="address_District"
                    onChange={formik.handleChange("address_District")}
                    value={formik.values.address_District}
                    onBlur={formik.handleBlur("address_District")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.address_District &&
                      formik.errors.address_District}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Số nhà, tên đường"
                    className="form-control"
                    name="address_Street"
                    onChange={formik.handleChange("address_Street")}
                    value={formik.values.address_Street}
                    onBlur={formik.handleBlur("address_Street")}
                  />
                  <div className="error-message ms-2 my-1">
                    {formik.touched.address_Street &&
                      formik.errors.address_Street}
                  </div>
                </div>
                <h4 className="mb-3">Chọn hình thức thanh toán</h4>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CheckoutMethods
                      method={paymentMethod}
                      onChangeMethod={changePaymentMethodHandler}
                    />
                  </Grid>
                </Grid>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" /> Quay trở lại Giỏ hàng
                    </Link>
                    <Link to="/cart" className="button">
                      Tiếp tục mua sắm
                    </Link>
                    <button className="button" type="submit">
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                JSON.parse(cartState?.cart_Detail).map((item, index) => {
                  return (
                    <div className="d-flex gap-10 mb-2 align-items-center">
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-5px", right: "20px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.Quantity}
                          </span>
                          <img
                            className="img-fluid"
                            src={watch}
                            alt="product"
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="w-75">
                          {/* <h5 className="title total">abcdef</h5> */}
                          <p className="total">{item?.Product_Name}</p>
                        </div>
                      </div>
                      <div className="flex-grow-1 d-flex justify-content-end">
                        <h5 className="total-price">
                          {valueLabelFormat(item?.Price * item?.Quantity)}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="total">Tạm tính</h4>
                <h5 className="total-price">
                  {cartState
                    ? valueLabelFormat(cartState?.cart_Total)
                    : "0 VND"}
                </h5>
              </div>
              {/* <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0 total">Phí ship</h4>
                <h5 className="mb-0 total-price">20.000 VND</h5>
              </div> */}
            </div>
            <div className="d-flex justify-content-between align-items-center py-4">
              <h4 className="total">Tổng tiền</h4>
              <h5 className="total-price">
                {cartState ? valueLabelFormat(cartState?.cart_Total) : "0 VND"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
