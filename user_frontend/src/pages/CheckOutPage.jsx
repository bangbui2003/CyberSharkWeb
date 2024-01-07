import { Box, Button, Typography } from "@mui/material";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCumb";
// import PaymentView from "../sections/PaymentView";
import cod from "../images/cash-on-delivery-icon.svg";
import vnpay from "../images/vnpay-logo-inkythuatso.svg";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCustomerOrders,
  getSingleOrder,
  updateOrder,
} from "../features/user/userSlice";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const authState = useSelector((state) => state.auth);
  const orderState = useSelector((state) => state.auth.userOrder);
  const [searchParams] = useSearchParams();
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const order_Number = searchParams.get("vnp_TxnRef");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSingleOrder(order_Number));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (orderState !== "") {
      if (location?.search !== "" && vnp_ResponseCode === "00") {
        dispatch(
          updateOrder({
            id: orderState.data.order_Number,
            status: "Paid",
          })
        );
      }
    }
  }, [orderState]);

  return (
    <>
      <BreadCrumb title={"Thanh toán"}></BreadCrumb>
      <Container maxWidth={false} sx={{ marginY: "100px" }}>
        {location?.search !== "" && vnp_ResponseCode !== "00" ? (
          <Box sx={{ textAlign: "center" }}>
            <img src={cod} alt="" width={120} height={120} />
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ mb: "12px" }}>
                ĐƠN HÀNG ĐÃ BỊ HỦY DO GIAO DỊCH THẤT BẠI!
              </Typography>
              <Box sx={{ textAlign: "center", px: "12px" }}>
                <Typography>
                  Đơn hàng đã bị hủy vì quý khách đã hủy giao dịch
                </Typography>
                <Typography>
                  Quý khách vui lòng thực hiện lại mua hàng và thanh toán
                </Typography>
                <Typography>
                  Cảm ơn quý khách đã tin dùng dịch vụ của chúng tôi
                </Typography>
                <Link to="/cart">
                  <Button variant="contained" sx={{ marginTop: "20px" }}>
                    Thanh toán lại
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        ) : vnp_ResponseCode === "00" ? (
          <Box sx={{ textAlign: "center" }}>
            <img src={cod} alt="" width={120} height={120} />
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ mb: "12px" }}>
                Cảm ơn Khách hàng {user && user.user.ten} đã mua hàng trên
                CyberShark và thanh toán online
              </Typography>
              <Typography
                sx={{
                  width: { md: "85%", lg: "80%", xl: "65%" },
                  mx: "auto",
                  mb: "12px",
                  px: "12px",
                }}
              >
                Thời gian giao hàng dự kiến từ 2 - 5 ngày. CyberShark chúng tôi
                sẽ liên lạc với quý khách để xác nhận đơn và thông báo cụ thể.
              </Typography>
              <Typography>Rất mong quý khách hàng thông cảm!</Typography>
              <Typography
                sx={{
                  width: { md: "85%", lg: "80%", xl: "65%" },
                  mx: "auto",
                  mb: "12px",
                  px: "12px",
                }}
              >
                Để xem lại thông tin đơn hàng, khách hàng vui lòng kiểm tra xác
                nhận đơn hàng đã được gửi qua email{" "}
                <strong>{user && user.user.email}</strong>
              </Typography>
              <Typography
                sx={{
                  width: { md: "85%", lg: "80%", xl: "65%" },
                  mx: "auto",
                  mb: "12px",
                  px: "12px",
                }}
              >
                Trong trường hợp Khách hàng không phải là Người trực tiếp nhận
                hàng. Khách hàng vui lòng thông báo cho Người nhận luôn bật điện
                thoại để nhận liên lạc từ nhân viên giao hàng của PetShop
              </Typography>
              <Link href="/">
                <Button variant="contained">Trở về trang chủ</Button>
              </Link>
            </Box>
          </Box>
        ) : (
          <Container class1="compare-product-wrapper py-5 home-wrapper-2">
            <Box sx={{ textAlign: "center" }}>
              <img src={cod} alt="" width={120} height={120} />
              <Box sx={{ mt: 4 }}>
                <Typography sx={{ mb: "12px" }}>
                  Cảm ơn Khách hàng đã mua hàng trên CyberShark
                </Typography>
                <Typography
                  sx={{
                    width: { md: "85%", lg: "80%", xl: "65%" },
                    mx: "auto",
                    mb: "12px",
                    px: "12px",
                  }}
                >
                  Thời gian giao hàng dự kiến từ 2 - 5 ngày. CyberShark sẽ liên
                  lạc với Khách hàng để xác nhận đơn và thông báo cụ thể.
                </Typography>
                <Typography>Rất mong Khách hàng thông cảm!</Typography>
                <Typography
                  sx={{
                    width: { md: "85%", lg: "80%", xl: "65%" },
                    mx: "auto",
                    mb: "12px",
                    px: "12px",
                  }}
                >
                  Để xem lại thông tin đơn hàng, Khách hàng vui lòng kiểm tra
                  xác nhận đơn hàng đã được gửi qua email{" "}
                  <strong>{user && user.user.email}</strong>
                </Typography>
                <Typography
                  sx={{
                    width: { md: "85%", lg: "80%", xl: "65%" },
                    mx: "auto",
                    mb: "12px",
                    px: "12px",
                  }}
                >
                  Trong trường hợp khách hàng không phải là Người trực tiếp nhận
                  hàng. Khách hàng vui lòng thông báo cho Người nhận luôn bật
                  điện thoại để nhận liên lạc từ nhân viên giao hàng của
                  CyberShark
                </Typography>
                <Link to={"/"}>
                  <Button variant="contained">Trở về trang chủ</Button>
                </Link>
              </Box>
            </Box>
          </Container>
        )}
      </Container>
    </>
  );
};

export default CheckoutPage;
