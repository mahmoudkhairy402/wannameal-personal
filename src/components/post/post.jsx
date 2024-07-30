import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VscSend } from "react-icons/vsc";
import {
  commentPost,
  getPostStatus,
  getPostError,
  likePost,
  getlikkk,
} from "../../redux/slices/postsSLlce";
import { getDecodedToken, getuser } from "../../redux/slices/authSlice";
import PostContent from "../postContent/PostContent";
import Loading from "../loading/loading";
import style from "./post.module.css";
import defaultProfile from "../../assets/man-user.svg";
import { getProfile } from "../../redux/slices/communityUserSlice";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [likedPost, setLikedPost] = useState(false);
  const [likes, setLikes] = useState(post?.likes || []);

  const commentStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);
  const profile = useSelector(getProfile);
  const { token } = useSelector(getuser);
  const decodedToken = useSelector(getDecodedToken);
  const likesta = useSelector(getlikkk);
  console.log("🚀 ~ Post ~ likesta:", likesta);

  useEffect(() => {
    if (post?.replies) {
      setPostComments(post.replies);
    }
    setLikedPost(post?.likes?.includes(decodedToken.id));
  }, [post, decodedToken.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        const newComment = {
          userProfilePic: profile?.user?.profileImage?.url || defaultProfile,
          userName: profile?.user?.userName,
          text: commentText,
        };

        setPostComments([...postComments, newComment]);

        // Dispatch the action to add comment to server
        await dispatch(
          commentPost({ postId: post._id, text: commentText, token })
        );

        setCommentText("");
      } catch (error) {
        console.error(`Failed to add comment to ${post._id}`, postError);
      }
    }
  };

  const handleLikeClick = async () => {
    try {
      await dispatch(likePost({ postId: post._id, token })).unwrap(); // Unwrap the result to handle it as a plain promise

      const newLikedPost = !likedPost;
      setLikedPost(newLikedPost);

      if (newLikedPost) {
        setLikes([...likes, decodedToken.id]);
      } else {
        setLikes(likes.filter((like) => like !== decodedToken.id));
      }

      console.log("Post liked/unliked successfully");
    } catch (error) {
      console.error(`Failed to like ${post._id}`, error);
    }
  };

  return (
    <>
      <PostContent
        post={post}
        comments={postComments}
        likes={likes}
        likedPost={likedPost}
        onLikeClick={handleLikeClick}
        onCommentChange={setPostComments}
      />
      <div
        className="modal fade rounded-2"
        id={`comment-${post._id}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg rounded-2">
          <div className="modal-content position-relative">
            <button
              type="button"
              className={` btn-close ${style.btnClose}`}
              data-bs-dismiss="modal"
              aria-label="Close"
            />
            <div className={`modal-body p-0 ${style.modalBody} rounded-2`}>
              <PostContent
                post={post}
                comments={postComments}
                likes={likes}
                likedPost={likedPost}
                onLikeClick={handleLikeClick}
                onCommentChange={setPostComments}
              />
              <div className={`${style.comments}`}>
                {commentStatus === "loading" ? (
                  <Loading width="50px" height="50px" />
                ) : postComments && postComments.length > 0 ? (
                  postComments.map((comment, index) => (
                    <div key={index} className={style.comment}>
                      <div className={`${style.profileImage} col-1 me-1`}>
                        <img
                          src={comment.userProfilePic || defaultProfile}
                          alt="Profile"
                        />
                      </div>
                      <div className={style.commentBody}>
                        <div className={style.name}>{comment.userName}</div>
                        <div className={style.text}>{comment.text}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={style.noComments}>No comments yet.</p>
                )}
              </div>
              <div className={`${style.uploadComment} d-flex p-`}>
                <div className={`${style.profileImage} col-1 me-1`}>
                  <img
                    src={profile?.user?.profileImage?.url || defaultProfile}
                    alt="Profile"
                  />
                </div>
                <form onSubmit={handleCommentSubmit} className="col-11">
                  <div className={`${style.textInput} col-12`}>
                    <label htmlFor="comment">{profile?.user?.userName}</label>
                    <input
                      type="text"
                      name="comment"
                      id={`comment-${post?._id}`}
                      className="w-100"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className={style.sendIcon}
                      disabled={commentStatus === "loading"}
                    >
                      <VscSend size={25} className={style.postIcon} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
