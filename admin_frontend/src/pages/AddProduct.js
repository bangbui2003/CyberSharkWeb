import { React, useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/product_catogory/categorySlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import {
  createProducts,
  resetState,
  updateProduct,
  getProduct,
} from "../features/product/productSlice";
import { message } from "antd";

let userSchema = Yup.object().shape({
  name: Yup.string().required("Cần nhập tên sản phẩm"),
  description: Yup.string().required("Cần nhập mô tả sản phẩm"),
  cost_Price: Yup.number().required("Cần nhập giá nhập sản phẩm"),
  sale_Price: Yup.number().required("Cần nhập giá bán sản phẩm"),
  brand_Id: Yup.number().required("Cần chọn thương hiệu"),
  category_Id: Yup.number().required("Cần chọn loại sản phẩm"),
  quantity: Yup.number().required("Cần nhập số lượng"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  const brandState = useSelector((state) => state.brand.brands.data);
  const categoryState = useSelector((state) => state.category.categories.data);
  const newProduct = useSelector((state) => state.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatingProduct,
    updatedProduct,
    message,
  } = newProduct;
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

  const [images, setImages] = useState([]);
  const imageListRef = ref(storage, "images/product/");
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Thêm sản phẩm thành công!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Cập nhật sản phẩm thành công!");
      navigate("/admin/product-list");
    }
    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, isLoading]);

  const onDrop = useCallback((acceptedFiles) => {
    const updatedImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...updatedImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.preview));
  }, [images]);

  const removeFile = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: updatingProduct.name || "",
      cost_Price: updatingProduct.cost_Price || 0,
      sale_Price: updatingProduct.sale_Price || 0,
      description: updatingProduct.description || "",
      quantity: updatingProduct.quantity || 1,
      product_Images: "",
      category_Id: updatingProduct.category_Id || -1,
      brand_Id: updatingProduct.brand_Id || -1,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const updatedData = {
          name: values.name,
          cost_Price: values.cost_Price,
          sale_Price: values.sale_Price,
          description: values.description,
          quantity: values.quantity,
          product_Images: updatingProduct.product_Images,
          category_Id: values.category_Id,
          brand_Id: values.brand_Id,
        };
        const data = { id: getProductId, productData: updatedData };
        setImages([]);
        dispatch(updateProduct(data));
        setTimeout(() => {
          dispatch(resetState());
        }, 200);
      } else {
        if (!images?.length) return;
        images.forEach((image) => {
          const imageRef = ref(storage, `images/product/${image.file.name}`);
          uploadBytes(imageRef, image.file).then(() => {});
        });

        const image_array = images.map((image) => image.file.name);
        values.product_Images = JSON.stringify(image_array);

        dispatch(createProducts(values));
        formik.resetForm();
        setImages([]);
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/product-list");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Sửa" : "Thêm"} sản phẩm
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          {/* product name */}
          <CustomInput
            type="text"
            label="Nhập tên sản phẩm"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error-message">
            {formik.touched.name && formik.errors.name}
          </div>

          {/* description */}
          <div>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error-message">
            {formik.touched.description && formik.errors.description}
          </div>

          {/* Nhập giá mua sản phẩm */}
          <CustomInput
            type="number"
            label="Giá nhập sản phẩm"
            name="cost_Price"
            min="1"
            onChng={formik.handleChange("cost_Price")}
            onBlr={formik.handleBlur("cost_Price")}
            val={formik.values.cost_Price}
          />
          <div className="error-message">
            {formik.touched.cost_Price && formik.errors.cost_Price}
          </div>

          {/* Nhập giá bán sản phẩm */}
          <CustomInput
            type="number"
            label="Giá bán sản phẩm"
            name="sale_Price"
            min="1"
            onChng={formik.handleChange("sale_Price")}
            onBlr={formik.handleBlur("sale_Price")}
            val={formik.values.sale_Price}
          />
          <div className="error-message">
            {formik.touched.sale_Price && formik.errors.sale_Price}
          </div>

          {/* brand */}
          <select
            name="brand_Id"
            onChange={formik.handleChange("brand_Id")}
            onBlur={formik.handleBlur("brand_Id")}
            value={formik.values.brand_Id}
            className="form-control py-3 mb-3"
          >
            <option value="">Chọn nhà sản xuất</option>
            {brandState &&
              brandState.map((i, j) => (
                <option key={j} value={i.id}>
                  {i.name}
                </option>
              ))}
          </select>
          <div className="error-message">
            {formik.touched.brand_Id && formik.errors.brand_Id}
          </div>

          {/* category */}
          <select
            name="category_Id"
            onChange={formik.handleChange("category_Id")}
            onBlur={formik.handleBlur("category_Id")}
            value={formik.values.category_Id}
            className="form-control py-3 mb-3"
          >
            <option value="">Chọn loại sản phẩm</option>
            {categoryState &&
              categoryState.map((i, j) => (
                <option key={j} value={i.id}>
                  {i.name}
                </option>
              ))}
          </select>
          <div className="error-message">
            {formik.touched.category_Id && formik.errors.category_Id}
          </div>

          <CustomInput
            type="number"
            label="Nhập số lượng sản phẩm"
            name="quantity"
            min="0"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error-message">
            {formik.touched.quantity && formik.errors.quantity}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {images?.map((image, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    className="btn-close position-absolute"
                    onClick={() => removeFile(j)}
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img
                    src={image.preview}
                    alt={`preview-${j}`}
                    width={200}
                    height={200}
                    onLoad={() => {
                      URL.revokeObjectURL(image.preview);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5 w-100"
            type="submit"
          >
            {getProductId !== undefined ? "Sửa" : "Thêm"} sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
