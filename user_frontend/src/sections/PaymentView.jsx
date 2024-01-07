// import Container from "@mui/material/Container";
// import cod from "../images/cash-on-delivery-icon.svg";
// const PaymentView = () => {
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
//   return (
//     // <Container maxWidth={false} sx={{ marginY: "100px" }}>
//     //   <Box sx={{ textAlign: "center" }}>
//     //     <img src={cod} alt="" width={120} height={120} />
//     //     <Box sx={{ mt: 4 }}>
//     //       <Typography sx={{ mb: "12px" }}>
//     //         Cảm ơn Quý khách đã mua hàng trên PetShop!
//     //       </Typography>
//     //       <Typography
//     //         sx={{
//     //           width: { md: "85%", lg: "80%", xl: "65%" },
//     //           mx: "auto",
//     //           mb: "12px",
//     //           px: "12px",
//     //         }}
//     //       >
//     //         Thời gian giao hàng dự kiến từ 2 - 5 ngày (có thể kéo dài hơn nếu bị
//     //         ảnh hưởng bởi những tình huống bất khả kháng: thiên tai, bão lũ...).
//     //         PetShop sẽ liên lạc với quý khách để xác nhận đơn và thông báo cụ
//     //         thể.
//     //       </Typography>
//     //       <Typography>Rất mong quý khách hàng thông cảm!</Typography>
//     //       <Typography
//     //         sx={{
//     //           width: { md: "85%", lg: "80%", xl: "65%" },
//     //           mx: "auto",
//     //           mb: "12px",
//     //           px: "12px",
//     //         }}
//     //       >
//     //         Để xem lại thông tin đơn hàng, quý khách vui lòng kiểm tra xác nhận
//     //         đơn hàng đã được gửi qua email <strong>buihuubang123</strong>
//     //       </Typography>
//     //       <Typography
//     //         sx={{
//     //           width: { md: "85%", lg: "80%", xl: "65%" },
//     //           mx: "auto",
//     //           mb: "12px",
//     //           px: "12px",
//     //         }}
//     //       >
//     //         Trong trường hợp Quý khách không phải là Người trực tiếp nhận hàng.
//     //         Quý khách vui lòng thông báo cho Người nhận luôn bật điện thoại để
//     //         nhận liên lạc từ nhân viên giao hàng của PetShop
//     //       </Typography>
//     //       <Link href="/">
//     //         <Button variant="contained">Trở về trang chủ</Button>
//     //       </Link>
//     //     </Box>
//     //   </Box>
//     // </Container>
//     <p>Lỗi</p>
//     <Container maxWidth={false} sx={{ marginY: "100px" }}>
//       {location?.search !== "" && vnp_ResponseCode !== "00" ? (
//         <Box sx={{ textAlign: "center" }}>
//           <img src={cod} alt="" width={120} height={120} />
//           <Box sx={{ mt: 4 }}>
//             <Typography sx={{ mb: "12px" }}>
//               Cảm ơn Quý khách đã mua hàng trên PetShop!
//             </Typography>
//             <Typography
//               sx={{
//                 width: { md: "85%", lg: "80%", xl: "65%" },
//                 mx: "auto",
//                 mb: "12px",
//                 px: "12px",
//               }}
//             >
//               Thời gian giao hàng dự kiến từ 2 - 5 ngày (có thể kéo dài hơn nếu
//               bị ảnh hưởng bởi những tình huống bất khả kháng: thiên tai, bão
//               lũ...). PetShop sẽ liên lạc với quý khách để xác nhận đơn và thông
//               báo cụ thể.
//             </Typography>
//             <Typography>Rất mong quý khách hàng thông cảm!</Typography>
//             <Typography
//               sx={{
//                 width: { md: "85%", lg: "80%", xl: "65%" },
//                 mx: "auto",
//                 mb: "12px",
//                 px: "12px",
//               }}
//             >
//               Để xem lại thông tin đơn hàng, quý khách vui lòng kiểm tra xác
//               nhận đơn hàng đã được gửi qua email <strong>buihuubang123</strong>
//             </Typography>
//             <Typography
//               sx={{
//                 width: { md: "85%", lg: "80%", xl: "65%" },
//                 mx: "auto",
//                 mb: "12px",
//                 px: "12px",
//               }}
//             >
//               Trong trường hợp Quý khách không phải là Người trực tiếp nhận
//               hàng. Quý khách vui lòng thông báo cho Người nhận luôn bật điện
//               thoại để nhận liên lạc từ nhân viên giao hàng của PetShop
//             </Typography>
//             <Link href="/">
//               <Button variant="contained">Trở về trang chủ</Button>
//             </Link>
//           </Box>
//         </Box>
//       ) : vnp_ResponseCode === "00" ? (
//         <p>Lỗi</p>
//       ) : (
//         <p>Qua vpay</p>
//       )}
//     </Container>
//   );
// };

// export default PaymentView;
