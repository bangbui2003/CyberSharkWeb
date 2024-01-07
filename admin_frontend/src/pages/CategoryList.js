import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import {
  getCategories,
  deleteCategory,
} from "../features/product_catogory/categorySlice";
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
    title: "Tên loại sản phẩm",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const categoryImageListRef = ref(storage, "images/category/");
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categoryState = useSelector((state) => state.category.categories.data);

  const deletingCategory = useSelector((state) => state.category);

  const { isError, isSuccess, deletedCategory } = deletingCategory;

  useEffect(() => {
    if (isSuccess && deletedCategory) {
      toast.success("Xoá thành công loại sản phẩm");
    }
    if (isError) {
      toast.error("Lỗi khi xoá loại sản phẩm");
    }
  }, [deletedCategory]);

  const fetchData = async () => {
    var categoryLength = 0;
    if (categoryState) {
      categoryLength = categoryState.length;
    }
    const response = await listAll(categoryImageListRef);
    var data = [];
    for (let i = 0; i < categoryLength; i++) {
      const imageLinks = JSON.parse(categoryState[i].category_Images);
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
        name: categoryState[i].name,
        action: (
          <>
            <Link
              to={`/admin/category/${categoryState[i].id}`}
              className="fs-3 text-danger"
            >
              <BiEdit size="30px" />
            </Link>
            <button
              className="ms-3 fs-3 text-danger border-0"
              onClick={() => showModal(categoryState[i].id)}
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
  }, [categoryState]);

  const deletecategory = (e) => {
    dispatch(deleteCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 200);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh mục loại sản phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletecategory(categoryId);
        }}
        title="Bạn có muốn xoá loại sản phẩm này không?"
      />
    </div>
  );
};

export default CategoryList;
