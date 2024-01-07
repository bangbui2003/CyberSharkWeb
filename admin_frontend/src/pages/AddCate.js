import { React, useEffect, useState, useCallback } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import {
  createCategory,
  getCategory,
  updateCategory,
  resetState,
} from "../features/product_catogory/categorySlice";

let userSchema = Yup.object().shape({
  name: Yup.string().required("Cần nhập tên loại sản phẩm"),
});

const AddCate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.category);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    updatingCategory,
    updatedCategory,
    message,
  } = newCategory;
  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);

  const [images, setImages] = useState([]);
  const categoryImageUrl = "images/category/";

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Thêm loại sản phẩm thành công!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Cập nhật loại sản phẩm thành công!");
      navigate("/admin/category-list");
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
    maxFiles: 1,
    disabled: images.length >= 1,
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
      name: updatingCategory.name || "",
      category_Image: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const updatedData = {
          name: values.name,
          category_Image: updatingCategory.category_Image,
        };
        const data = { id: getCategoryId, categoryData: updatedData };
        dispatch(updateCategory(data));
        setTimeout(() => {
          dispatch(resetState());
        }, 200);
        dispatch(resetState());
      } else {
        if (!images?.length) return;
        images.forEach((image) => {
          const imageRef = ref(
            storage,
            `${categoryImageUrl}${image.file.name}`
          );
          uploadBytes(imageRef, image.file).then(() => {});
        });

        const image_array = images.map((image) => image.file.name);
        values.category_Image = JSON.stringify(image_array);

        dispatch(createCategory(values));
        formik.resetForm();
        setImages([]);
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/category-list");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCategoryId !== undefined ? "Sửa" : "Thêm"} loại sản phẩm
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên loại sản phẩm"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error-message">
            {formik.touched.name && formik.errors.name}
          </div>

          <div className="bg-white border-1 p-5 text-center mt-3">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Thả ảnh vào đây ...</p>
              ) : (
                <>
                  <p>Thả một ảnh vào đây hoặc nhấn vào để chọn ảnh từ máy</p>
                  <em>Chỉ được upload tối đa 1 file ảnh</em>
                </>
              )}
            </div>
          </div>
          <div className="showimages d-flex flex-wrap gap-3 mt-3">
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
            {getCategoryId !== undefined ? "Sửa" : "Thêm"} loại sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCate;
