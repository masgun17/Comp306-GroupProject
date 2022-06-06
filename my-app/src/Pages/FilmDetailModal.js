import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../Styles/FilmDetailModal.css";
import { getCommentsAction, getRatingCountsAction, createCommentAction } from "../Tools/actions";

export default function FilmDetailModal({
  selectedFilm,
  modalShow,
  onHide,
  ...props
}) {
  const [selected, setSelected] = useState(selectedFilm);
  const [commentArr, setCommentArr] = useState([]);
  const [smallRating, setSmallRating] = useState(0);
  const [bigRating, setBigRating] = useState(5);
  const [ratingCounts, setRatingCounts] = useState("");
  const [enteredComment, setEnteredComment] = useState("");
  const [enteredRating, setEnteredRating] = useState();
  const [warningMessage, setWarningMessage] = useState("");
  const [userAlreadyCommented, setUserAlreadyCommented] = useState(true);


  let userLogged = sessionStorage.getItem('isLogin');
  let uid = sessionStorage.getItem('uid');

  useEffect(() => {
    setSelected(selectedFilm);
  }, [selectedFilm]);

  useEffect( () => {
    if (commentArr !== []) {
      commentArr.forEach(element => {
        console.log(element);
      });
    }
  }, [commentArr])

  const fetchCommentsAndRatingCounts = async () => {
    setTimeout(() => {
      var jsonData = {
        data: [
          {
            Sid: selectedFilm.id,
            rating_small: smallRating,
            rating_big: bigRating,
          },
        ],
      };
      const resultComment = getCommentsAction(jsonData).then((onResolved) => {
        setCommentArr(onResolved);
      });
    }, 100);

    setTimeout(() => {
      var jsonData = {
        data: [
          {
            Sid: selectedFilm.id,
          },
        ],
      };
      var ratingCountArr = ["", "", "", "", ""];
      const result = getRatingCountsAction(jsonData).then((onResolved) => {
        // console.log(onResolved);
        onResolved.forEach((element) => {
          ratingCountArr[element.rating - 1] = element.rating_count;
        });
        setRatingCounts(ratingCountArr);
        // console.log(ratingCountArr);
      });
    }, 200);
  }

  useEffect(() => {
    if (selectedFilm) {
      fetchCommentsAndRatingCounts();
    }
    setEnteredComment("");
    setEnteredRating();
    setWarningMessage("");
  }, [modalShow]);

  const filterComments = async (index) => {
    var jsonData = {
      data: [
        {
          Sid: selectedFilm.id,
          rating_small: index+1,
          rating_big: index+1,
        },
      ],
    };
    const resultComment = getCommentsAction(jsonData).then((onResolved) => {
      setCommentArr(onResolved);
    });
  }

  const filterCommentsAll = async () => {
    var jsonData = {
      data: [
        {
          Sid: selectedFilm.id,
          rating_small: 0,
          rating_big: 5,
        },
      ],
    };
    const resultComment = getCommentsAction(jsonData).then((onResolved) => {
      setCommentArr(onResolved);
    });
  }

  

  const createComment = async () => {

    if (enteredRating < 1 || enteredRating > 5) {
      setWarningMessage("Enter a valid rating!");
    } else {
      var jsonData = {
        data: [
          {
            Sid: selectedFilm.id,
            Uid: parseInt(uid),
            Comment: enteredComment,
            Rating: parseInt(enteredRating),
          },
        ],
      };
      const result = createCommentAction(jsonData).then((onResolved) => {
        if (onResolved === 'Bad Request ') {
          setWarningMessage("You have already commented!");
        } else if (onResolved === 'Comment added Successfully') {
          setWarningMessage("");
          fetchCommentsAndRatingCounts();
        }
      });
    }

    
  }

  return (
    <div className="FilmDetailModalWrapper">
      <Modal
        {...props}
        // size="md"
        aria-labelledby="contained-modal-title-vcenter"
        contentClassName="modal-content"
        dialogClassName="modal-dialog"
        centered
        onHide={onHide}
      >
        {selected && (
          <div className="modal-wrapper" style={{ overflowY: "auto" }}>
            <div className="modal-title">
              <div className="alignCenter">
                <h1>
                  <strong>{selectedFilm.title}</strong>
                </h1>
                <h4>{selectedFilm.director}</h4>
                <h5>{selectedFilm.actor}</h5>
              </div>
            </div>

            <Modal.Body>
              <div className="modal-body">{selectedFilm.description}</div>

              <div className="modal-footer">
                <div className="LeftPanel">
                  <div className="FilmInfo">
                    <strong>Type: </strong> {selectedFilm.type}
                    <br />
                    <strong>Duration: </strong> {selectedFilm.duration}
                    <br />
                    <strong>Year: </strong> {selectedFilm.year}
                    <br />
                    <strong>Genre: </strong> {selectedFilm.genre}
                    <br />
                    <strong>Country: </strong> {selectedFilm.country}
                    <br />
                    <strong>Platform: </strong> {selectedFilm.platform}
                    <br />
                    <strong>Rating: </strong> {selectedFilm.rating}
                    <br />
                  </div>

                  <div className="RatingCountWrapper">
                    User Ratings:
                    {Array.isArray(ratingCounts) && ratingCounts.map((element, index) => (
                      <div className="Rating" type="button" onClick={() => filterComments(index)}>
                        <div>{index + 1}:</div>
                        <div>{element === '' ? 0 : element}</div>
                      </div>
                    ))}
                    <div className="Underline" type="button" onClick={filterCommentsAll}>
                      All Comments
                    </div>
                  </div>
                </div>

                <div
                  className="CommentSection"
                  // style={{ overflowY: "visible" }}
                >
                  <h5>Comments</h5>
                  {userLogged && 
                    <div className="CreateCommentWrapper">
                      {/* <label> */}
                        <input type="text" placeholder="Enter your comment" style={{height: "100px", marginBottom: "5px"}} value={enteredComment} onChange={e => setEnteredComment(e.target.value)} />
                        <input type="number" placeholder="Enter your rating between 0-5" min={0} max={5} value={enteredRating} onChange={e => setEnteredRating(e.target.value)} />
                      {/* </label>  */}
                        <div className="AddCommentButton" type='button' onClick={createComment} >Add Comment</div>
                        {warningMessage !== "" && <div>{warningMessage}</div>}
                      <div>
                        
                      </div>
                    </div>}

                  {commentArr &&
                    commentArr.map((element, index) => (
                      <div className="IndividualComment">
                        {element.Username}
                        <div className="CommentRatingRow">
                          <div>{element.Comment}</div>
                          <div>{element.Rating}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Modal.Body>
          </div>
        )}
      </Modal>
    </div>
  );
}
