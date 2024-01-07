import React from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Tiêu đề",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blog.blogs);
  const data = [];
  for (let i = 0; i < blogState.length; i++) {
    data.push({
      key: i + 1,
      name: blogState[i].title,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit size="30px" />
          </Link>
          <Link to="/" className="ms-3 fs-3 text-danger">
            <AiFillDelete size="30px" />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Danh sách tin tức</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default BlogList;
