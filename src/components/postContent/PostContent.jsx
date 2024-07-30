import React, { useState, useEffect } from "react";
import style from "./postContent.module.css";
import profile from "../../assets/man-user.svg";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";
import { getDecodedToken, getuser } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function PostContent({
  post,
  comments,
  likes,
  likedPost,
  onLikeClick,
  onCommentChange,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);

  useEffect(() => {
    setPreviewPhotos(post?.img ? [post?.img] : null);
    setPreviewVideos(post?.video ? [post?.video] : null);
  }, [post]);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleVideoClick = (src) => {
    setSelectedVideo(src);
  };

  const handleCommentClick = () => {
    console.log("first comment");
  };

  const handleShareClick = () => {
    console.log("first share");
  };

  const { t } = useTranslation();
  const { comment, sharee, like } = t("community", {
    fullname: "mahmoud khairy402",
    email: "mahmoudkhairy402@gmail.com",
  });

  return (
    <div className={`${style.post} w-100 d-flex align-items-start`}>
      <div className={`${style.profileImage} col-1 me-1`}>
        <img
          src={post?.postedBy?.profileImage?.url || profile}
          alt="profileImage"
        />
      </div>
      <div className={`col-11 d-flex flex-column gap-2 ${style.postInfo}`}>
        <div className={`${style.userInfo} col-12`}>
          <div className={style.text}>
            <div className={style.name}>{post?.postedBy?.userName}</div>
            <div className={style.email}>{post?.postedBy?.email}</div>
          </div>
        </div>
        <div className={`${style.postText} col-12`}>{post?.text}</div>
        <div
          className={`${style.preview} col-12 d-flex justify-content-center flex-wrap g-1`}
        >
          {post?.img &&
            previewPhotos.map((img, index) => (
              <div
                className={`${style.imgContainer}`}
                key={img?.id}
                data-bs-toggle="modal"
                data-bs-target={`#staticBackdrop${img?.id}`}
                onClick={() => handleImageClick(img?.url)}
              >
                {img === undefined ? (
                  ""
                ) : (
                  <img src={img?.url} alt={`Preview ${index}`} />
                )}
                {/* modal */}
                <div
                  className={`modal fade ${style.modalview}`}
                  id={`staticBackdrop${img?.id}`}
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className={`modal-content ${style.modalContent}`}>
                      <div className="modal-header border-bottom-0">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div
                        className={`modal-body w-100 p-1 ${style.modalBody}`}
                      >
                        <img src={selectedImage} alt="Selected" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {post?.video &&
            previewVideos.map((video, index) => (
              <div
                className={`${style.videoContainer}`}
                key={video?.url}
                data-bs-toggle="modal"
                data-bs-target={`#staticBackdrop${video?.id}`}
                onClick={() => handleVideoClick(video?.url)}
              >
                {video === undefined ? "" : <video src={video?.url} controls />}
                {/* modal */}
                <div
                  className={`modal fade ${style.modalview}`}
                  id={`staticBackdrop${video?.id}`}
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className={`modal-content ${style.modalContent}`}>
                      <div className="modal-header border-bottom-0">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div
                        className={`modal-body w-100 p-1 ${style.modalBody}`}
                      >
                        <video src={selectedVideo} controls />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className={style.reactsNum}>
          <p className={style.likes}>
            <AiFillHeart size={16} color="#699bf7" className="me-1" />
            {likes?.length >= 1000 ? `${likes?.length / 1000}k` : likes?.length}
          </p>
          <p className={style.comments}>
            {comments.length} {comment} {/* Updated */}
          </p>
        </div>
        <div className={style.reacts}>
          <div
            className={`${
              likedPost ? `${style.like} ${style.likedPost}` : style.like
            }`}
            onClick={onLikeClick}
          >
            <AiFillHeart size={23} className={style.likeIcon} /> {like}
          </div>
          <div
            className={style.comment}
            onClick={handleCommentClick}
            data-bs-toggle="modal"
            data-bs-target={`#comment-${post._id}`}
          >
            <AiFillMessage size={23} color="#699bf7" />
            {comment}
          </div>

          <div className={style.share} onClick={handleShareClick}>
            <IoIosShareAlt size={23} color="#699bf7" />
            {sharee}
          </div>
        </div>
      </div>
    </div>
  );
}
