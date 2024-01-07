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
  createBrand,
  getBrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";

let userSchema = Yup.object().shape({
  name: Yup.string().required("Cần nhập tên thương hiệu"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    updatingBrand,
    updatedBrand,
    message,
  } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const [images, setImages] = useState([]);
  const brandImageUrl = "images/brand/";

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Thêm thương hiệu thành công!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Cập nhật thương hiệu thành công!");
      navigate("/admin/brand-list");
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
      name: updatingBrand.name || "",
      brand_Image: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const updatedData = {
          name: values.name,
          brand_Image: updatingBrand.brand_Image,
        };
        const data = { id: getBrandId, brandData: updatedData };
        setImages([]);
        dispatch(updateBrand(data));
        setTimeout(() => {
          dispatch(resetState());
        }, 200);
      } else {
        if (!images?.length) return;
        images.forEach((image) => {
          const imageRef = ref(storage, `${brandImageUrl}${image.file.name}`);
          uploadBytes(imageRef, image.file).then(() => {});
        });

        const image_array = images.map((image) => image.file.name);
        values.brand_Image = JSON.stringify(image_array);

        dispatch(createBrand(values));
        formik.resetForm();
        setImages([]);
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/brand-list");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Sửa" : "Thêm"} thương hiệu
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Nhập tên thương hiệu"
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
            {getBrandId !== undefined ? "Sửa" : "Thêm"} thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
