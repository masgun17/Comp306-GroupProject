import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { timePerGenreAction } from "../Tools/actions";

export default function StatisticsModal({ modalShow, onHide, ...props }) {
  let uid = sessionStorage.getItem("uid");
  const [genreList, setGenreList] = useState();

  useEffect(() => {
    if (modalShow) {
      setTimeout(() => {
        var jsonData = {
          data: [
            {
              Uid: parseInt(uid),
            },
          ],
        };
        const a = timePerGenreAction(jsonData).then((b) => setGenreList(b));
      }, 300);
    }
  }, [modalShow]);

  return (
    <div className="StatisticsWrapper">
      <Modal
        {...props}
        // size="md"
        aria-labelledby="contained-modal-title-vcenter"
        contentClassName="modal-content"
        dialogClassName="modal-dialog"
        centered
        onHide={onHide}
      >
        <div style={{ overflowY: "auto" }}>
          {genreList &&
            genreList.map((element, index) => (
              <div>
                Genre: {element.Listed_In} <br />
                Total Movie Time: {element.MovieSum}
                <br />
                Total TV Season: {element.TVSum}
                <br />
                <hr />
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}
