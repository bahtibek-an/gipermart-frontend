import { Container } from "@mui/system";
import React from "react";
import { CgFileDocument } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import { addBasketsCartToCheckouts, addUSABasketsCartToCheckouts } from "./helper";
import { numberWithCommas } from "../../helper";
import moment from "moment-timezone";
import 'moment/locale/ru'
moment.locale("ru")

const Order = () => {
  const navigate = useNavigate();
  const basket = useSelector((state) => state.basket);
  const checkouts = useSelector((state) =>
    addBasketsCartToCheckouts(basket, state.user?.user?.checkout));
  const USAcheckouts = useSelector((state) =>
    addUSABasketsCartToCheckouts(basket, state.user?.user?.checkout));
  const exchangeRate = useSelector((state) => state.app.exchange);
  const location = useLocation();
  const pathName = location.pathname;
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div className="pages">
          <Link to="/">Магазин /</Link>
          <Link to="/profile">Личный кабинет /</Link>
          <div>Заказы</div>
        </div>
        <div className="grid xl:grid-cols-12 lg:grid-cols-4 gap-12">
          <div className="xl:col-span-4 lg:col-span-2">
            <div className="user-sidebar">
              <div
                onClick={() => navigate("/profile")}
                className={`item ${pathName === "/profile" && "active"}`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Персональные данные
              </div>
              <div
                onClick={() => navigate("/profile/order")}
                className={`item ${pathName === "/profile/order" && "active"}`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Мои заказы
              </div>
              <div
                onClick={() => navigate("/profile/addresses")}
                className={`item ${
                  pathName === "/profile/addresses" && "active"
                }`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Адреса
              </div>
              <div onClick={() => navigate("/favorites")} className="item">
                <CgFileDocument color="#2E3A59" size={24} />
                Избранные товары
              </div>
            </div>
          </div>
          <div className="xl:col-span-8 lg:col-span-4 order-section">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              className="!mb-6"
              aria-label="secondary tabs example"
            >
              <Tab value="1" label="ЗАКАЗЫ" />
              <Tab value="2" label="СПЕЦЗАКАЗ" />
              <Tab value="3" label="РАССРОЧКИ" />
            </Tabs>
            {value === "1" && (
              <>
                {checkouts.map((item, i) => (
                <div className="order-block" key={i}>
                  <div className="order-cart border-b md:flex gap-x-4 bg-gray md:p-6 p-2">
                    <div>
                    </div>
                    <div style={{ width: "-webkit-fill-available" }}>
                      <div className="grid lg:grid-cols-2 gap-2">
                        <div>
                          <strong>ID заказа: </strong>
                          <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                          >
                            {i + 1}
                          </span>
                        </div>
                        <div className="md:text-end text-lg mb-4">
                          <strong>
                            Статус оплаты:{" "}
                            {item.NAXT_STATUS ? (
                              <span className="status-payment">Ожидает подтверждения</span>
                            ) : (
                              <span className="text-green-700">Подтверждено</span>
                            )}
                          </strong>
                        </div>
                      </div>
                      <div className="grid media-grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-y-2">
                          <div>
                            <strong>Количество:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                          </div>
                          <div>
                            <strong>Имя покупателя:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.full_name}
                            </span>
                          </div>
                          <div>
                            <strong>Регион/Область:</strong>
                            <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.region}
                            </span>
                          </div>
                          <div>
                            <strong>Город/Район:</strong>
                            <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.town}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2 media-pt">
                          <div>
                            <strong>Номер телефона:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.phone_number}
                            </span>
                          </div>
                          <div>
                            <strong>Вид оплаты:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.NAXT_STATUS ? "Наличный" : "Онлайн"}
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Адрес покупателя:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            {item.address}
                          </span>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Число:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            {moment(item.created_at).format("MMMM D YYYY, h:mm")}
                          </span>
                        </div>
                      </div>
                      {item.cart?.map((cart) => (
                        <Link to={`/product/${cart.product?.id}`} className="department-box" key={cart.id}>
                          <div className="department-image relative">
                            {/*<div className="discount">-6%</div>*/}
                            <img
                              src={cart?.product?.front_image}
                              alt=""
                            />
                          </div>
                          <div className="department-text">
                            <div className="department-name">
                              <strong>
                                {cart?.product?.title_ru}
                              </strong>
                            </div>
                            {/* <div className="department-rassrochka">462 000 сум/ 12 мес</div> */}
                            <div className="department-description">{ cart.product?.descriptions }</div>
                            <div className="department-price">
                              <div className="price">{numberWithCommas(cart.total * exchangeRate)} Сум</div>
                              {/* <div className="price_old">3 474 240 Сум</div> */}
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="text-end text-lg mt-6">
                        <strong>
                          Стоимость:{" "}
                          <span className="order-price">{numberWithCommas(item.totalPrice * exchangeRate)} Сум</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </>
            )}
            {value === "2" && (
              <>
              {USAcheckouts.map((item, i) => (
                <div className="order-block" key={i}>
                  {/* <div style={{ font: "-webkit-mini-control" }}>
                    Адрес из карты: 41.43254634546 63.2435344
                  </div> */}
                  <div className="order-cart border-b md:flex gap-x-4 bg-gray md:p-6 p-2">
                    <div>
                      {/* <img
                        src="https://picsum.photos/120/120"
                        alt=""
                      /> */}
                    </div>
                    <div style={{ width: "-webkit-fill-available" }}>
                      <div className="grid lg:grid-cols-2 gap-2">
                        <div>
                            <strong>ID заказа: </strong>
                            <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                            >
                            {i + 1}
                            </span>
                        </div>
                        <div className="md:text-end text-lg mb-4">
                          <strong>
                            Статус оплаты:{" "}
                            {item.NAXT_STATUS ? (
                                <span className="status-payment">Ожидает подтверждения</span>
                            ) : (
                                <span className="text-green-700">Подтверждено</span>
                            )}
                          </strong>
                        </div>
                      </div>
                      <div className="grid media-grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-y-2">
                          <div>
                            <strong>Количество:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              5
                            </span>
                          </div>
                          <div>
                            <strong>Имя покупателя:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.full_name}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2 media-pt">
                          <div>
                            <strong>Номер телефона:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.phone_number}
                            </span>
                          </div>
                          <div>
                            <strong>Вид оплаты:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              {item.NAXT_STATUS ? "Наличный" : "Онлайн"}
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Адрес покупателя:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            {item.address}
                          </span>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Число:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            {moment(item.created_at).format("MMMM D YYYY, h:mm")}
                          </span>
                        </div>
                      </div>
                      {item.cart?.map((cart) => (
                        <Link to={`/product/${cart.product?.id}`} className="department-box" key={cart.id}>
                          <div className="department-image relative">
                            {/*<div className="discount">-6%</div>*/}
                            <img
                              src={cart?.product?.front_image}
                              alt=""
                            />
                          </div>
                          <div className="department-text">
                            <div className="department-name">
                              {cart?.product?.product?.name}
                            </div>
                            {/* <div className="department-rassrochka">462 000 сум/ 12 мес</div> */}
                            <div className="department-description">{ cart.product?.descriptions }</div>
                            <div className="department-price">
                              <div className="price">{numberWithCommas(cart.total * exchangeRate)} Сум</div>
                              {/* <div className="price_old">3 474 240 Сум</div> */}
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="text-end text-lg mt-6">
                        <strong>
                          Стоимость:{" "}
                          <span className="order-price">{numberWithCommas(item.totalPrice * exchangeRate)} Сум</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </>
            )}
            {value === "3" && (
              <>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
