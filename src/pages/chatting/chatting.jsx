import React, { useEffect, useRef, useState } from "react";
import style from "./chatting.module.css";
import defaultImageProfile from "../../assets/man-user.svg";
import noChat from "../../assets/noChat.gif";
import { IoIosSearch } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import InputEmoji from "react-input-emoji";
import { useSelector, useDispatch } from "react-redux";
import { getTheme } from "../../redux/slices/systemModeSlice";
import { Helmet } from "react-helmet";

export default function Chatting() {
  let chats = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8];
  const [activeChat, setActiveChat] = useState(true);
  const [message, setMessage] = useState("");
  const chatBodyRef = useRef(null);

  const theme = useSelector(getTheme);
  const handleOnEnter = (message) => {
    if (message !== "") {
      console.log("Message:", message);
    }
    // Add your logic to send the message
  };
  const handCloseChat = (event) => {
    if (event.key === "Escape") {
      console.log("Escape key pressed");
      setActiveChat(false);
    }
  };
  const handleOpenChat = () => {
    setActiveChat(true);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [activeChat, message]);

  useEffect(() => {
    window.addEventListener("keydown", handCloseChat);
    return () => {
      window.removeEventListener("keydown", handCloseChat);
    };
  }, []);
  return (
    <div className={`  ${style.chattingContainer}`}>
      <Helmet>
        <title>WannaMeal messenger</title>
        <meta
          name="description"
          content="chatting and contact with other users"
        />
      </Helmet>
      <div className="container-lg pt-2">
        <div className={`row p-0 w-100 d-flex gap-2 ${style.Chatting}`}>
          <div className={`${style.aside} col-2 col-lg-4`}>
            <div className={style.header}>chats</div>
            <form
              className={`d-flex col-12 mx-0  ${style.serchForm}`}
              role="search"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className={`${style.searchIcon}`}>
                {" "}
                <IoIosSearch size={20} />
              </div>
            </form>
            <div className={style.chatsUl}>
              {chats
                ? chats.map((ele) => {
                    return (
                      <div
                        className={style.singleChat}
                        onClick={handleOpenChat}
                      >
                        <div className={style.image}>
                          <img src={defaultImageProfile} alt="profile photo" />
                        </div>
                        <div className={`${style.text} d-none d-lg-block`}>
                          <div className={style.name}>
                            Mahmoud khairy hassan
                          </div>
                          <div className={style.lastMessage}>
                            welcom bro , how are you jjjjjjjjjjjkjkjkjkj kjkhnk
                            jhjg ghhjn jgjj{" "}
                          </div>
                        </div>
                        <div className={`${style.chatStatus} `}>
                          <div
                            className={`${style.lastMessageTime} d-none d-lg-block`}
                          >
                            2:21 Am
                          </div>
                          <div className={style.lastMessageNum}>1</div>
                        </div>
                      </div>
                    );
                  })
                : "no chats yet..!"}
            </div>
          </div>
          <div className={`${style.chatContent} p-0 col`}>
            <div className={style.chatHeader}>
              <div className={style.image}>
                <img src={defaultImageProfile} alt="profile photo" />
              </div>
              <div className={style.text}>
                <div className={style.name}>Mahmoud Khairy</div>
                <div className={style.email}>mahmoudkhairy402@gmail.com</div>
              </div>
            </div>
            {activeChat ? (
              <div className={style.chatBody} ref={chatBodyRef}>
                <div className={style.send}>welcome bro how are you </div>
                <div className={style.send}>welcome bro how are you </div>
                <div className={style.send}>welcome bro how are you </div>
                <div className={style.send}>welcome bro how are you </div>
                <div className={style.send}>welcome bro how are you </div>
                <div className={style.send}>welcome bro how are you </div>
                <div className={style.send}>welcome bro how are you </div>
                <div className={style.send}>welcome bro how are you </div>
                <div className={style.send}>رد يلا </div>
                <div className={style.send}>رد ي جبان</div>
                <div className={style.send}>welcome bro how are you </div>

                <div className={style.received}>
                  <div className={style.text}>
                    i`m fine bro , how are your mother
                  </div>
                  {/* <div className={`${style.profileImage} col-1 me-1`}>
                <img src={defaultImageProfile} alt="Profile" />
              </div>{" "} */}
                </div>

                <div className={style.received}>
                  <div className={style.text}>
                    i`m fine bro , how are your mother
                  </div>
                  {/* <div className={`${style.profileImage} col-1 me-1`}>
                <img src={defaultImageProfile} alt="Profile" />
              </div>{" "} */}
                </div>
              </div>
            ) : (
              <div
                className={`${style.chatBody} d-flex justify-content-center align-items-center flex-column g-1`}
              >
                <div className={style.noChatImage}>
                  <img src={noChat} alt="" srcset="" />
                </div>
                <div className={style.noChatTitle}>send messages</div>
                <div className={style.desc}>
                  send messages to your friends write now
                </div>
              </div>
            )}
            <div className={`${style.sendMessage} d-flex `}>
              <div className={`${style.textInput} col-12`}>
                <InputEmoji
                  className={style.messageInput}
                  value={message}
                  onChange={setMessage}
                  cleanOnEnter
                  onEnter={handleOnEnter}
                  placeholder="Type a message"
                  theme={`${theme}`}
                  background={theme == "light" ? "#fff" : "#0d0d0d"}
                  color={theme == "light" ? "#0d0d0d" : "#fff"}
                  borderColor="transparent"
                  keepOpened="true"
                />

                {/* <button onClick={handleOnEnter} className={style.sendIcon}>
                  <VscSend size={25} className={style.postIcon} />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
