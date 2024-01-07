import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getBrands, deleteBrand } from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Ảnh",
    dataIndex: "image",
  },
  {
    title: "Tên thương hiệu",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const brandImageListRef = ref(storage, "images/brand");
  useEffect(() => {
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands.data);

  const deletingBrand = useSelector((state) => state.brand);

  const { isError, isSuccess, deletedBrand } = deletingBrand;

  useEffect(() => {
    if (isSuccess && deletedBrand) {
      toast.success("Xoá thành công thương hiệu");
    }
    if (isError) {
      toast.error("Lỗi khi xoá loại thương hiệu");
    }
  }, [deletedBrand]);

  const fetchData = async () => {
    var data = [];
    var brandLength = 0;
    if (brandState) {
      brandLength = brandState.length;
    }
    const response = await listAll(brandImageListRef);

    for (let i = 0; i < brandLength; i++) {
      const imageLinks = JSON.parse(brandState[i].brand_Image);
      const main_image = imageLinks[0];
      var url =
        "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900";
      if (main_image) {
        const matchingItem = response.items.find((item) =>
          item.name.endsWith(main_image)
        );
        if (matchingItem) {
          url = await getDownloadURL(matchingItem);
        }
      }
      data.push({
        key: i + 1,
        image: (
          <>
            <img src={url} width={100} height={100} />
          </>
        ),
        name: brandState[i].name,
        action: (
          <>
            <Link
              to={`/admin/brand/${brandState[i].id}`}
              className="fs-3 text-danger"
            >
              <BiEdit size="30px" />
            </Link>
            <button
              className="ms-3 fs-3 text-danger border-0"
              onClick={() => showModal(brandState[i].id)}
            >
              <AiFillDelete size="30px" />
            </button>
          </>
        ),
      });
    }
    return data;
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => setData(result));
  }, [brandState]);

  const deletebrand = (e) => {
    dispatch(deleteBrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 200);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh mục thương hiệu</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletebrand(brandId);
        }}
        title="Bạn có muốn xoá thương hiệu này không?"
      />
    </div>
  );
};

export default BrandList;
