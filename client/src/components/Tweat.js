import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Icon, Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import {
  FaHeart,
  FaPencilAlt,
  // FaReply,
  FaTrash,
  FaRegHeart,
} from "react-icons/fa";
import { useBreakpointValue } from "@chakra-ui/media-query";
import UserAvatar from "./UserAvatar";

const Tweat = (props) => {
  const {
    tweat,
    user,
    allTweats,
    setAllTweats,
    setUpdateTweat,
    setModalOpen,
    setModalTitle,
    setModalSubtitle,
  } = props;

  const [isLiked, setIsLiked] = useState(false);

  const avatarSize = useBreakpointValue({ base: "lg", md: "xl" });

  useEffect(() => {
    setIsLiked(tweat.likes.includes(user._id));
  }, [allTweats, user]);

  const deleteHandler = () => {
    const deletedTweat = tweat;
    axios
      .delete("http://localhost:8000/api/tweats/" + tweat._id)
      .then((res) => {
        const tweats = allTweats.filter(
          (tweat) => tweat._id !== deletedTweat._id
        );
        setAllTweats(tweats);
        console.log("tweat deleted", res);
      })
      .catch((err) => console.log(err));
  };

  const editHandler = () => {
    setUpdateTweat(tweat);
    setModalOpen(true);
    setModalTitle("Edit");
    setModalSubtitle("Edit your Tweat");
  };

  const timeSincePosted = () => {
    const now = new Date();
    const posted = new Date(tweat.createdAt);
    const diff = now - posted;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (seconds < 60) {
      return seconds + " seconds ago";
    } else if (minutes < 60) {
      return minutes + " minutes ago";
    } else if (hours < 24) {
      return hours + " hours ago";
    } else if (days < 30) {
      return days + " days ago";
    } else if (months < 12) {
      return months + " months ago";
    } else {
      return years + " years ago";
    }
  };

  const likeHandler = (e) => {
    e.preventDefault();
    if (user._id) {
      const data = {
        tweatID: tweat._id,
        userID: user._id,
      };
      axios
        .put("http://localhost:8000/api/tweats/like", data)
        .then((res) => {
          tweat.likes.push(user._id);
          console.log("Liked Tweat in state:", tweat);
          setAllTweats((initialAllTweats) =>
            initialAllTweats.map((initialTweat) => {
              if (initialTweat._id === tweat._id) {
                initialTweat = tweat;
              }
              return initialTweat;
            })
          );
        })
        .catch((error) => console.log(error));
    }
  };

  const dislikeHandler = (e) => {
    e.preventDefault();
    if (user._id) {
      const data = {
        tweatID: tweat._id,
        userID: user._id,
      };
      axios
        .put("http://localhost:8000/api/tweats/dislike", data)
        .then((res) => {
          tweat.likes = tweat.likes.filter(
            (userIDInList) => userIDInList !== user._id
          );
          console.log("Disliked Tweat in state:", tweat);
          setAllTweats((initialAllTweats) =>
            initialAllTweats.map((initialTweat) => {
              if (initialTweat._id === tweat._id) {
                initialTweat = tweat;
              }
              return initialTweat;
            })
          );
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="card d-flex flex-row ">
      <div className="card-body">
       
          <div
            id="tweatCaption"
            className="bg-white text-black border rounded "
          >
            <div className="tweetProfileAlign">
              <UserAvatar user={tweat.userID} size={avatarSize} />
              <p className="card-text right-profile">
                <span>
                  {tweat.userID && tweat.userID.name}
                  <Link to={"/profile/" + tweat.userID._id}>
                    @{tweat.userID && tweat.userID.userName}
                  </Link>
                </span>
                ate at <b>{tweat.restaurantName}</b>
                <span className="tweatTime">{timeSincePosted()}</span>
              </p>
            </div>
            <p id="tweatText" className="card-text">
              {/* Comment:  */}
              <i>{tweat.text}</i>
            </p>
            <div className="feedOptions d-flex">
              {/* Like */}

              <div className="option">
                {!isLiked ? (
                  <button onClick={(e) => likeHandler(e)}>
                    <Icon as={FaRegHeart} className="likeStyle" />
                    {/* Like */}
                  </button>
                ) : (
                  <button className="liked" onClick={(e) => dislikeHandler(e)}>
                    <Icon as={FaHeart} className="likeStyle" />
                    {/* Dislike */}
                  </button>
                )}
                <span className="like-span">{tweat.likes.length} Likes</span>
              </div>
              {user._id && user._id === tweat.userID._id ? (
                <>
                  <div className="option">
                    <button onClick={editHandler} className="option-icon">
                      <Icon as={FaPencilAlt} />
                    </button>
                  </div>
                  <div className="option">
                    <button onClick={deleteHandler} className="option-icon">
                      <Icon as={FaTrash} />
                    </button>
                  </div>
                </>
              ) : null}
              {/*
                                <a href="/" className="ms-4 me-4">
                                    //Reply
                                    <p>{tweat.replies && tweat.replies.length} Replies</p>
                                    <Icon as={FaReply} />
                                </a>
                                <a href="/">
                                    //ReTweat
                                    <p>{tweat.retweats && tweat.retweats.length} Retweats</p>
                                    <i className="fa fa-share" aria-hidden="true"></i>{" "}
                                </a> 
                            */}
            </div>
          </div>
          <div className="d-flex tweat-image">
            {tweat.image && (
              <img
                id="tweatImage"
                src={`http://localhost:8000/images/${tweat.image}`}
                // className="card-img-top"
                alt={`${tweat.image}`}
              />
            )}
          </div>
        
      </div>
    </div>
  );
};
export default Tweat;
