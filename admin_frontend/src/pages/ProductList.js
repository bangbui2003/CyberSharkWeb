import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/product_catogory/categorySlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
    defaultSortOrder: "ascend",
    width: "5%",
  },
  {
    title: "Hình ảnh",
    width: "15%",
    dataIndex: "image",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    width: "15%",
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: "Loại sản phẩm",
    width: "15%",
    dataIndex: "category",
    sorter: (a, b) => a.category - b.category,
  },
  {
    title: "Thương hiệu",
    width: "15%",
    dataIndex: "brand",
    sorter: (a, b) => a.brand - b.brand,
  },
  {
    title: "Số lượng",
    width: "10%",
    dataIndex: "quantity",
  },
  {
    title: "Hành động",
    width: "20%",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const pImageListRef = ref(storage, "images/product");
  const productState = useSelector((state) => state.product.products.data);
  const brandState = useSelector((state) => state.brand.brands.data);
  const categoryState = useSelector((state) => state.category.categories.data);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);

  const dProduct = useSelector((state) => state.product);
  const { isSuccess, isError, deletedProduct } = dProduct;

  useEffect(() => {
    if (isSuccess && deletedProduct) {
      toast.success("Xoá thành công loại sản phẩm");
    }
    if (isError) {
      toast.error("Lỗi khi xoá loại sản phẩm");
    }
  }, [deletedProduct]);

  const fetchData = async () => {
    const response = await listAll(pImageListRef);
    var data = [];
    var productLength = 0;
    if (productState) {
      productLength = productState.length;
    }
    // Assuming productLength is defined somewhere in your code
    if (productLength !== 0) {
      for (let i = 0; i < productLength; i++) {
        const cate = categoryState.find(
          (category) => category.id == productState[i].category_Id
        );

        const bran = brandState.find(
          (brand) => brand.id == productState[i].brand_Id
        );

        const imageLinks = JSON.parse(productState[i].product_Images);
        const main_image = imageLinks[0];
        const matchingItem = response.items.find((item) =>
          item.name.endsWith(main_image)
        );
        var url =
          "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900";
        if (matchingItem) {
          url = await getDownloadURL(matchingItem);
        }
        data.push({
          key: i + 1,
          name: productState[i].name,
          category: cate.name || "",
          brand: bran.name || "",
          quantity: productState[i].quantity,
          image: (
            <>
              <img
                src={url}
                width={100}
                height={100}
                alt={`Product ${i + 1}`}
              />
            </>
          ),
          action: (
            <>
              <Link
                to={`/admin/product/${productState[i].id}`}
                className="fs-3 text-danger"
              >
                <BiEdit size="30px" />
              </Link>
              <button
                className="ms-3 fs-3 text-danger"
                onClick={() => showModal(productState[i].id)}
              >
                <AiFillDelete size="30px" />
              </button>
            </>
          ),
        });
      }
    }
    return data;
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => setData(result));
  }, [categoryState, brandState, productState]);

  const deleteproduct = (e) => {
    dispatch(deleteProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 200);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách sản phẩm</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: productState?.length,
            showTotal: (total, range) => {
              return `Hiển thị ${range[0]}-${range[1]} của ${total} kết quả`;
            },
            position: ["topRight"],
            defaultPageSize: 5,
          }}
        />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteproduct(productId);
        }}
        title="Bạn có muốn xoá loại sản phẩm này không?"
      />
    </div>
  );
};

export default ProductList;
