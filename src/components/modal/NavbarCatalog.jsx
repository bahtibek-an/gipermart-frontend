import { Dialog } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {API_URL} from "../../http";

const NavbarCatalog = ({ openModal, closeModal, categories, closeLeftModal }) => {
    const closeAllModals = () => {
        closeModal();
        closeLeftModal();
    }

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="navbar-catalog-modal"
      >
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-x-4 gap-y-6">
          {categories.map((item) => (
            item.parent && (
            <div className="catalog-box flex flex-col gap-y-2" key={item.id}>
              <Link to={`/category/${item.id}`} onClick={closeAllModals} className="catalog-main">
                <div className="main-image">
                  <img
                    src={API_URL + item?.background_image}
                    alt=""
                  />
                </div>
                <div className="main-name">{item.name}</div>
              </Link>
              {item.children && (
                item.children.map((item) => (
                  <Link to={`/category/${item.id}`} onClick={closeAllModals} className="red" key={item.id}>
                    {item.name}
                  </Link>
                ))
              )}
            </div>
            )
          ))}    
        </div>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, null)(NavbarCatalog);
