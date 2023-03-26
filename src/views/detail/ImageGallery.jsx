import React, { Component } from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.images = [...props.product.new_media];
    this.images.push({img_url: props.product.front_image});
    this.state = {
      nav1: null,
      nav2: null,
    };
    if(this.images.length > 0) {
      while(this.images.length < 4) {
        this.images = this.images.concat(this.images);
      }
    }
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div>
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
          className="main-img"
          arrows={false}
        >
          {this.images?.map((item, i) => (
            <div className="carousel-img" key={i}>
              <img src={item.img_url} alt="" />
            </div>
          ))}
        </Slider>
        {this.props.product?.new_media?.length > 0 && (
        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          slidesToShow={4}
          className="image-gallery"
          swipeToSlide={true}
          focusOnSelect={true}
          nextArrow={
            <IoIosArrowForward
              fill="#000"
              style={{ minWidth: "36px", height: "36px" }}
              size={36}
            />
          }
          prevArrow={
            <IoIosArrowBack
              fill="#000"
              style={{ minWidth: "36px", height: "36px" }}
              size={36}
            />
          }
        >
          {this.images?.map((item, i) => (
            <div className="carousel-img" key={i}>
              <img src={item.img_url} alt="" />
            </div>
          ))}
        </Slider>
        )}
      </div>
    );
  }
}
