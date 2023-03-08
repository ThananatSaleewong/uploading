import moment from "moment/moment";
import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import { getImageURL, copyUrl } from "../../lib/utils";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown, Pagination, Spin } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useToast } from "react-toastify";

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
  const location = useLocation();
  // console.log(location.search);

  const searchParams = new URLSearchParams(document.location.search);
  // console.log(searchParams.get("p"));

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
  const [page, setPage] = useState({ page: 1, pageSize: 24 });
  // const { toasts, handlers } = useToast();
  console.log(imageList);
  useEffect(() => {
    fetchImageData();
  }, [page]);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const fetchImageData = async (event) => {
    setLoading(true);
    try {
      const resultList = await pb
        .collection("upload")
        .getList(page.page, page.pageSize, {
          sort: "-created",
        });
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
    setLoading(false);
  };

  const handleDeleteImage = async (targetImg) => {
    const toastId = toast.loading("Loading...");
    try{
      const deleteImg = await pb.collection("upload").delete(targetImg);
      toast.success("Deleted !");
      await fetchImageData();
    }catch(error){
      toast.error("asdasd" ,{
        duration: 3000,
        className: "bg-red-100 p-4 font-semebold",
      });
      
    }
    toast.dismiss(toastId);
    // window.location.reload();
  };
  async function handleChange(event) {
    console.log(event.target.files);
    const { files } = event.target;
    if (files.length !== 0) {
      const toastId = toast.loading("Loading...");
      const formData = new FormData();
      formData.append("image", files[0]);
      formData.append("title", files[0].name);
      formData.append("uploader", currentUser?.model.id);
      formData.append("email", currentUser?.model.email);

      setLoading(true);
      toastId;
      try {
        const res = await pb.collection("upload").create(formData);
        toast.success("Successfully toasted!");
        //1. Diable button
        //2. Change button content to Loading blah blah
        // window.location.reload();
        await fetchImageData();
      } catch (error) {
        console.log(error);
        const errorMessage = error.data.data.image.message || "Unknown error";
        toast.error(errorMessage, {
          duration: 3000,
          className: "bg-red-100 p-4 font-semebold",
        });
      }
      setLoading(false);
      toast.dismiss(toastId);
    }
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

  const onChangePagination = (page, pageSize) => {
    setPage({ ...page, page: page, pageSize: pageSize });
  };

  const onChangePaginationSize = (current, size) => {
    setPage({ ...page, page: 1, pageSize: size });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Dropzone file upload */}
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
          accept="image/png, image/jpg, image/jpeg, image/gif, image/webp, image/svg"
        />
      </label>

      {/* Image grid loop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                className="w-36 h-36 mr-2"
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
      <Pagination
        pageSize={page.pageSize}
        pageSizeOptions={[24, 48, 84]}
        total={imageList?.totalItems}
        showSizeChanger
        onChange={onChangePagination}
        onShowSizeChange={onChangePaginationSize}
      />
    </div>
  );
}
