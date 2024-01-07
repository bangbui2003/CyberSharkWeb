import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import letter from "../images/newsletter.png";
import logo from "../images/game-controller.png";
import mappin from "../images/map_pin.png";
const Footer = () => {
  return (
    <>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={letter} alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up For Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Nhập vào email.."
                  aria-label="Nhập vào email..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Đăng ký
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-3">
              <div className="shop-logo d-flex">
                <img src={logo} alt="" />
                <h4 className="text-white mt-2 mb-4"> | CyberShark</h4>
              </div>
              <div>
                <p className="text-white">
                  Được biết đến là đơn vị ủy quyền bán lẻ chính thức tại Việt
                  Nam, chuyên kinh doanh các sản phẩm công nghệ chất lượng tốt.
                </p>
                <a
                  href="tel:+84 775197200"
                  className="mt-3 d-block mb-2 text-white"
                >
                  +84 5197200
                </a>
                <a
                  href="mailto:buihuubang123@gmail.com"
                  className="mt-2 d-block mb-2 text-white"
                >
                  buihuubang123@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a
                    className="text-white"
                    href="https://www.facebook.com/profile.php?id=100028291543833"
                  >
                    <BsFacebook className="fs-4" />
                  </a>
                  <a className="text-white" href="https://twitter.com/?lang=vi">
                    <BsTwitter className="fs-4" />
                  </a>
                  <a className="text-white" href="https://www.instagram.com/">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="https://www.youtube.com/">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Thông tin</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Chính sách bảo mật
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Giao hàng
                </Link>
                <Link to="/guarantee-policy" className="text-white py-2 mb-1">
                  Bảo hành{" "}
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Đổi trả
                </Link>
                <Link to="/blogs" className="text-white py-2 mb-1">
                  Bài viết
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Giới thiệu</Link>
                <Link className="text-white py-2 mb-1">
                  Các câu hỏi thường gặp
                </Link>
                <Link className="text-white py-2 mb-1">Liên hệ</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Địa chỉ</h4>
              <div className="footer-links d-flex flex-column">
                <div className="map-address d-flex align-items-center">
                  <img src={mappin} alt="" />
                  <p>Đại học Công nghệ Thông tin, VNU TP.HCM</p>
                </div>
                {/* Add the map image */}
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                Copyright &copy; CyberShark{new Date().getFullYear()} | All
                rights reserved by UIT
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
