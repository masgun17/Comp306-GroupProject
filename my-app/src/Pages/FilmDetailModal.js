import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../Styles/FilmDetailModal.css";
import { getCommentsAction } from "../Tools/actions";

export default function FilmDetailModal({ selectedFilm, onHide, ...props }) {
  const [selected, setSelected] = useState();
  const [commentArr, setCommentArr] = useState([]);

  useEffect(() => {
    if (selectedFilm) {
      setSelected(selectedFilm);
      var jsonData = {
        data: [
          {
            Sid: selectedFilm.id
          },
        ],
      };
      const resultComment = getCommentsAction(jsonData);
      setCommentArr(resultComment);
    }
    
  }, [selectedFilm]);

  return (
    <div className="FilmDetailModalWrapper">
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        contentClassName="modal-content"
        dialogClassName="modal-dialog"
        centered
        onHide={onHide}
      >
        {selected && (
          <>
            <div className="modal-title">
              <div className="alignCenter">
                <h1>
                  <strong>{selected.title}</strong>
                </h1>
                <h4>{selected.director}</h4>
                <h5>{selected.actor}</h5>
              </div>
            </div>

            <Modal.Body>
              <div className="modal-body">{selected.description}</div>

              <div className="modal-footer">
                <div className="FilmInfo">
                  <strong>Type: </strong> {selected.type}
                  <br />
                  <strong>Duration: </strong> {selected.duration}
                  <br />
                  <strong>Year: </strong> {selected.year}
                  <br />
                  <strong>Genre: </strong> {selected.genre}
                  <br />
                  <strong>Country: </strong> {selected.country}
                  <br />
                  <strong>Platform: </strong> {selected.platform}
                  <br />
                  <strong>Rating: </strong> {selected.rating}
                  <br />
                </div>
                <div className="CommentSection" style={{overflowY: 'visible'}}>
                  <h5>Comments</h5>
                  {commentArr && commentArr.map((element, index) => <div>
                    kajsdkjasnd
                  </div>)}
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
}
