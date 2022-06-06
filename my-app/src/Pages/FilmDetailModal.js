import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../Styles/FilmDetailModal.css";
import { getCommentsAction } from "../Tools/actions";

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

  useEffect(() => {
    setSelected(selectedFilm);
  }, [selectedFilm]);

  useEffect(() => {
    if (selectedFilm) {
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
    }
  }, [modalShow]);

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
          <div className="modal-wrapper" style={{overflowY: "auto"}}>
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
                <div
                  className="CommentSection"
                  // style={{ overflowY: "visible" }}
                >
                  <h5>Comments</h5>
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
