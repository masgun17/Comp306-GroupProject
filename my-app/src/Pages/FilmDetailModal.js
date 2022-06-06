import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../Styles/FilmDetailModal.css";

export default function FilmDetailModal({ selectedFilm, onHide, ...props }) {
  const [selected, setSelected] = useState();
  // const [commentArr, setCommentArr] = useState([]);

  useEffect(() => {
    setSelected(selectedFilm);
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
                <div className="CommentSection">
                  <h5>Comments</h5>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
}
