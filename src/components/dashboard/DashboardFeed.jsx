import moment from "moment/moment";
import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import { getImageURL, copyUrl } from "../../lib/utils";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown, Spin } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const items = [
  {
    key: "1",
    label: <div>Copy</div>,
  },
  {
    key: "2",
    label: <div>Delete</div>,
  },
];

const items1 = [
  {
    key: "1",
    label: <div>Copy</div>,
  },
];

export default function DashboardFeed(props) {
  const { currentUser } = props;
  const data = {
    name: "test",
    description: "test",
    url: "https://example.com",
    date: "2022-01-01 10:00:00.123Z",
    image: "null",
  };
  
  const [imageList, setImageList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImageData();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const fetchImageData = async (event) => {
    try {
      const resultList = await pb.collection("upload").getList(1, 30);
      setImageList(resultList);
    } catch (err) {
      toast.success(err, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleDeleteImage = async (targetImg) => {
    const deleteImg = await pb.collection("upload").delete(targetImg);
    window.location.reload();
  };

  async function handleChange(event) {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    formData.append("title", event.target.files[0].name);
    formData.append("uploader", currentUser?.model.id);
    formData.append("email", currentUser?.model.email);

    setLoading(true);
    try {
      const record = await pb.collection("upload").create(formData);

      //1. Diable button
      //2. Change button content to Loading blah blah
      window.location.reload();
      // const deleteImg = await pb.collection("upload").delete("");
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  }

  const handleMenuClick = (e, data) => {
    if (e.key === "1") {
      copyUrl(getImageURL(data.collectionId, data.id, data.image, 100));
      toast.success(`คัดลอกลิงค์ ${data.title} แล้ว`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (e.key === "2") {
      handleDeleteImage(data.id);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Dropzone file upload */}
      <Spin tip="Loading..." spinning={loading} size="large">
        <label
          className="grid place-content-center border border-indigo-600 text-indigo-600 rounded-full cursor-pointer bg-indigo-600/25 hover:bg-indigo-600 hover:text-white fixed right-4 bottom-4 h-20 w-20  
       "
        >
          <p className="text-3xl font-bold leading-3 -mt-2 ">+</p>
          <input
            type="file"
            disabled={loading}
            className="hidden"
            onChange={(event) => handleChange(event)}
          />
        </label>

        {/* Image grid loop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {imageList?.items.map((data, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-2 border rounded-md"
            >
              <div
                onClick={() =>
                  openInNewTab(
                    getImageURL(data.collectionId, data.id, data.image, 100)
                  )
                }
                className="flex gap-2 items-center cursor-pointer "
              >
                <img
                  src={getImageURL(data.collectionId, data.id, data.image, 100)}
                  alt=""
                  className="w-12 h-12 mr-2"
                />
                <div className="">
                  <p className="font-semibold text-sm">{data.title}</p>
                  <p className="text-xs text-gray-400">
                    {moment(data.created).format("DD/MM/YYYY")}
                  </p>
                  <p className="text-xs ">{data.email}</p>
                </div>
              </div>
              <Dropdown
                menu={
                  currentUser?.model.id === data.uploader
                    ? {
                        items: items,
                        onClick: (e) => handleMenuClick(e, data),
                      }
                    : {
                        items: items1,
                        onClick: (e) => handleMenuClick(e, data),
                      }
                }
                trigger={["click"]}
                className="cursor-pointer"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <EllipsisOutlined />
                </a>
              </Dropdown>
            </div>
          ))}
        </div>
      </Spin>
      <ToastContainer />
    </div>
  );
}