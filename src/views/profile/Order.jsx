import { Container } from "@mui/system";
import React from "react";
import { CgFileDocument } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { addBasketsCartToCheckouts, addUSABasketsCartToCheckouts } from "./helper";
import { API_URL } from "../../http";

const Order = () => {
  const navigate = useNavigate();
  const basket = useSelector((state) => state.basket);
  const checkouts = useSelector((state) => 
    addBasketsCartToCheckouts(basket, state.user?.user?.checkout));
  const USAcheckouts = useSelector((state) => 
    addUSABasketsCartToCheckouts(basket, state.user?.user?.checkout));
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
                onClick={() => navigate("/profile/adresses")}
                className={`item ${
                  pathName === "/profile/adresses" && "active"
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
                      <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                          {/* <div className="order-name mb-2 f-medium">
                            Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel
                            Cor i 10
                          </div> */}
                          <div className="flex gap-x-6">
                            <div>
                              <strong>ID заказа:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                №{i + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="md:text-end text-lg">
                          <strong>
                            Статус оплаты:{" "}
                            {item.PAY_STATUS ? (
                              <span className="text-green-700">Оплачено</span>  
                            ) : (
                              <span className="status-payment">Не оплачено</span>  
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
                            <strong>Цвет:</strong>
                            <span style={{ color: "#828282" }}>Чёрный</span>
                          </div>
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
                            {item.created_at.split('T')[0]} {item.created_at.split('T')[1]}
                          </span>
                        </div>
                      </div>
                      {item.cart?.map((cart) => (
                        <Link to="/" className="department-box" key={cart.id}>
                          <div className="department-image relative">
                            <div className="discount">-6%</div>
                            <img
                              src={API_URL + cart.product.media[0]?.img_url}
                              alt=""
                            />
                          </div>
                          <div className="department-text">
                            <div className="department-name">
                              acer aspire 3 intel pentium n4500/4gb/500gb hdd/in...
                            </div>
                            {/* <div className="department-rassrochka">462 000 сум/ 12 мес</div> */}
                            <div className="department-price">
                              <div className="price">{cart.total} Сум</div>
                              {/* <div className="price_old">3 474 240 Сум</div> */}
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="text-end text-lg mt-6">
                        <strong>
                          Стоимость:{" "}
                          <span className="order-price">{item.totalPrice} Сум</span>
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
                      <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                          {/* <div className="order-name mb-2 f-medium">
                            Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel
                            Cor i 10
                          </div> */}
                          <div className="flex gap-x-6">
                            <div>
                              <strong>ID заказа:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                №{i + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="md:text-end text-lg">
                          <strong>
                            Статус оплаты:{" "}
                            {item.PAY_STATUS ? (
                              <span className="text-green-700">Оплачено</span>  
                            ) : (
                              <span className="status-payment">Не оплачено</span>  
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
                            <strong>Цвет:</strong>
                            <span style={{ color: "#828282" }}>Чёрный</span>
                          </div>
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
                            {item.created_at.split('T')[0]} {item.created_at.split('T')[1]}
                          </span>
                        </div>
                      </div>
                      {item.cart?.map((cart) => (
                        <Link to="/" className="department-box" key={cart.id}>
                          <div className="department-image relative">
                            <div className="discount">-6%</div>
                            <img
                              src={API_URL + cart.product.media[0]?.img_url}
                              alt=""
                            />
                          </div>
                          <div className="department-text">
                            <div className="department-name">
                              acer aspire 3 intel pentium n4500/4gb/500gb hdd/in...
                            </div>
                            {/* <div className="department-rassrochka">462 000 сум/ 12 мес</div> */}
                            <div className="department-price">
                              <div className="price">{cart.total} Сум</div>
                              {/* <div className="price_old">3 474 240 Сум</div> */}
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="text-end text-lg mt-6">
                        <strong>
                          Стоимость:{" "}
                          <span className="order-price">{item.totalPrice} Сум</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
                {/* <div className="order-block">
                  <div style={{ font: "-webkit-mini-control" }}>
                    Адрес из карты: 41.43254634546 63.2435344
                  </div>
                  <div className="order-cart border-b md:flex gap-x-4 bg-gray md:p-6 p-2">
                    <div>
                      <img
                        src="https://picsum.photos/120/120"
                        alt=""
                      />
                    </div>
                    <div style={{ width: "-webkit-fill-available" }}>
                      <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                          <div className="order-name mb-2 f-medium">
                            Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel
                            Cor i 10
                          </div>
                          <div className="flex gap-x-6">
                            <div>
                              <strong>ID заказа:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                №8
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="md:text-end text-lg">
                          <strong>
                            Статус оплаты:{" "}
                            <span className="status-payment">Не оплачено</span>
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
                              Ilhom Nasriddinov
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2 media-pt">
                          <div>
                            <strong>Цвет:</strong>
                            <span style={{ color: "#828282" }}>Чёрный</span>
                          </div>
                          <div>
                            <strong>Номер телефона:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              +998900511676
                            </span>
                          </div>
                          <div>
                            <strong>Вид оплаты:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              Наличный
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Адрес покупателя:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            Diydor 10
                          </span>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Число:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            2020-05-05 19:38
                          </span>
                        </div>
                      </div>
                      <div className="text-end text-lg mt-6">
                        <strong>
                          Стоимость:{" "}
                          <span className="order-price">500 000</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-block">
                  <div style={{ font: "-webkit-mini-control" }}>
                    Адрес из карты: 41.43254634546 63.2435344
                  </div>
                  <div className="order-cart border-b md:flex gap-x-4 bg-gray md:p-6 p-2">
                    <div>
                      <img
                        src="https://picsum.photos/120/120"
                        alt=""
                      />
                    </div>
                    <div style={{ width: "-webkit-fill-available" }}>
                      <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                          <div className="order-name mb-2 f-medium">
                            Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel
                            Cor i 10
                          </div>
                          <div className="flex gap-x-6">
                            <div>
                              <strong>ID заказа:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                №8
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="md:text-end text-lg">
                          <strong>
                            Статус оплаты:{" "}
                            <span className="status-payment">Не оплачено</span>
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
                              Ilhom Nasriddinov
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2 media-pt">
                          <div>
                            <strong>Цвет:</strong>
                            <span style={{ color: "#828282" }}>Чёрный</span>
                          </div>
                          <div>
                            <strong>Номер телефона:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              +998900511676
                            </span>
                          </div>
                          <div>
                            <strong>Вид оплаты:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              Наличный
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Адрес покупателя:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            Diydor 10
                          </span>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Число:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            2020-05-05 19:38
                          </span>
                        </div>
                      </div>
                      <div className="text-end text-lg mt-6">
                        <strong>
                          Стоимость:{" "}
                          <span className="order-price">500 000</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div> */}
              </>
            )}
            {value === "3" && (
              <>
                <div className="order-block">
                  <div style={{ font: "-webkit-mini-control" }}>
                    Адрес из карты: 41.43254634546 63.2435344
                  </div>
                  <div className="order-cart border-b md:flex gap-x-4 bg-gray md:p-6 p-2">
                    <div>
                      <img
                        src="https://picsum.photos/120/120"
                        alt=""
                      />
                    </div>
                    <div style={{ width: "-webkit-fill-available" }}>
                      <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                          <div className="order-name mb-2 f-medium">
                            Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel
                            Cor i 10
                          </div>
                          <div className="flex gap-x-6">
                            <div>
                              <strong>ID заказа:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                №8
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="md:text-end text-lg">
                          <strong>
                            Статус оплаты:{" "}
                            <span className="status-payment">Не оплачено</span>
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
                              Ilhom Nasriddinov
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2 media-pt">
                          <div>
                            <strong>Цвет:</strong>
                            <span style={{ color: "#828282" }}>Чёрный</span>
                          </div>
                          <div>
                            <strong>Номер телефона:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              +998900511676
                            </span>
                          </div>
                          <div>
                            <strong>Вид оплаты:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              Наличный
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Адрес покупателя:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            Diydor 10
                          </span>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Число:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            2020-05-05 19:38
                          </span>
                        </div>
                      </div>
                      <div className="text-end text-lg mt-6">
                        <strong>
                          Стоимость:{" "}
                          <span className="order-price">500 000</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-block">
                  <div style={{ font: "-webkit-mini-control" }}>
                    Адрес из карты: 41.43254634546 63.2435344
                  </div>
                  <div className="order-cart border-b md:flex gap-x-4 bg-gray md:p-6 p-2">
                    <div>
                      <img
                        src="https://picsum.photos/120/120"
                        alt=""
                      />
                    </div>
                    <div style={{ width: "-webkit-fill-available" }}>
                      <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                          <div className="order-name mb-2 f-medium">
                            Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel
                            Cor i 10
                          </div>
                          <div className="flex gap-x-6">
                            <div>
                              <strong>ID заказа:</strong>
                              <span
                                style={{ color: "#828282", marginLeft: "4px" }}
                              >
                                №8
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="md:text-end text-lg">
                          <strong>
                            Статус оплаты:{" "}
                            <span className="status-payment">Не оплачено</span>
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
                              Ilhom Nasriddinov
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2 media-pt">
                          <div>
                            <strong>Цвет:</strong>
                            <span style={{ color: "#828282" }}>Чёрный</span>
                          </div>
                          <div>
                            <strong>Номер телефона:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              +998900511676
                            </span>
                          </div>
                          <div>
                            <strong>Вид оплаты:</strong>
                            <span
                              style={{ color: "#828282", marginLeft: "4px" }}
                            >
                              Наличный
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Адрес покупателя:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            Diydor 10
                          </span>
                        </div>
                        <div className="md:col-span-2 media-pt">
                          <strong>Число:</strong>
                          <span style={{ color: "#828282", marginLeft: "4px" }}>
                            2020-05-05 19:38
                          </span>
                        </div>
                      </div>
                      <div className="text-end text-lg mt-6">
                        <strong>
                          Стоимость:{" "}
                          <span className="order-price">500 000</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
