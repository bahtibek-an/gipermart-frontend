import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/scss/_footer.scss";
import { AiOutlineArrowUp } from "react-icons/ai";
// import { FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
// import { FaTelegramPlane } from "react-icons/fa";
import { IconButton } from "@mui/material";
import $host from "../../http";

const Footer = () => {
  const [scrollTopBtn, setScrollTopBtn] = useState(false);
  const [ socMedia, setSocMedia ] = useState([]);
  const [ phoneNumbers, setPhoneNumbers ] = useState([]);

  const handleWindowScroll = () => {
    if (window.scrollY > 40) {
      setScrollTopBtn(true);
    } else {
      setScrollTopBtn(false);
    }
  };
  window.addEventListener("scroll", handleWindowScroll);
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const fetchSocMedia = async () => {
    const { data: { results } }  = await $host.get("outside/site-settings/");
    setSocMedia(results);
    return results;
  }

  const fetchNumbers = async () => {
    const { data: { results } } = await $host.get("outside/phone-site-settings/")
    setPhoneNumbers(results);
    return results;
  }

  useEffect(() => {
    fetchSocMedia();
    fetchNumbers();
  }, []);


  return (
    <footer className="footer">
      <Container maxWidth="xl">
        <div className="grid lg:grid-cols-4 md:grid-cols-2">
          <div className="footer-box">
            <Link to="/" className="block mb-6">
              <img
                className="footer-logo"
                src="../logoo.svg"
                alt=""
              />
            </Link>
            {/* <div className="footer__link">
              <a className="text-xl mb-1 block" href="tel:+998900511676">
                +998900511676
              </a>
              <div className="text-sm text-black">справочная служба</div>
            </div> */}
            {/* <div className="footer__link">
              <a className="text-xl mb-1 block" href="tel:+998900511676">
                +998900511676
              </a>
              <div className="text-sm text-black">интернет-магазин</div>
            </div> */}
            {phoneNumbers.length > 0 && phoneNumbers?.map((item) => (
              <div className="footer__link" key={item.id}>
                <a className="text-xl mb-1 block" href="tel:+998900511676">
                  {item.phonenumbers}
                </a>
                <div className="text-sm text-black">{item.site_type}</div>
              </div>
            ))}
            <div className="footer__link">
              <div className="f-bold text-sm text-black">
                Оставайтесь на связи
              </div>
              <div className="footer__icons flex items-center gap-4 mt-3">
                { socMedia.length > 0 && socMedia?.map((item) => (
                  <a key={item.id} href={item.link} target="_blank" rel="noreferrer">
                    <img 
                      alt=""
                      src={item.logo} 
                      className="h-7 rounded"
                    />
                  </a>
                ))}
                {/* <Link to="/">
                  <AiFillFacebook fill="#000" size={32} />
                </Link>
                <Link to="/">
                  <FaInstagramSquare fill="#000" size={32} />
                </Link>
                <Link to="/">
                  <FaTelegramPlane fill="#fff" className="bg-black" size={28} />
                </Link>
                <Link to="/">
                  <FaYoutubeSquare fill="#000" size={32} />
                </Link> */}
              </div>
            </div>
          </div>
          <div className="footer-box">
            <div className="footer__link">
              <Link to="/information/refund">Условия обмена и возврата</Link>
            </div>
            <div className="footer__link">
              <Link to="/">Каталог</Link>
            </div>
            <div className="footer__link">
              <Link to="/about-company">О компании</Link>
            </div>
            <div className="footer__link">
              <Link to="/profile">Профиль</Link>
            </div>
            <div className="footer__link">
              <Link to="/information/delivery">Доставка</Link>
            </div>
            <div className="footer__link">
              <Link to="/information/payment">Оплата</Link>
            </div>
          </div>
          <div className="footer-box">
            <div className="footer__link">
              <Link to="/information/clients">Клиентам</Link>
            </div>
            <div className="footer__link">
              <Link to="/information/personal-account">Личный кабинет</Link>
            </div>
            <div className="footer__link">
              <Link to="/information/blog">Блог</Link>
            </div>
            <div className="footer__link">
              <Link to="/">Обратная связь</Link>
            </div>
          </div>
          <div className="footer-box">
            <div className="footer__link">
              <Link to="/information/information">Информация</Link>
            </div>
            <div className="footer__link">
              <Link to="/information/user-agreement">
                Пользовательское соглашение
              </Link>
            </div>
            <div className="footer__link">
              <Link to="/information/offer">
                Политика конфиденциальности и оферта
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div className="copyright">
        <Container maxWidth="xl">
          <div className="flex items-center md:flex-nowrap flex-wrap justify-between md:pb-0 pb-24">
            <div className="text-sm md:mb-0 mb-4">
              © 2022 Любое использование контента без письменного разрешения
              запрещено
            </div>
            <div className="flex items-center md:justify-start justify-between md:w-auto w-full gap-6">
              <div>Разработка сайта</div>
              <div className="block f-bold">
                MaxWellConsult
              </div>
            </div>
          </div>
        </Container>
      </div>
      <IconButton
        className={`scrollTop ${scrollTopBtn && "show"}`}
        onClick={() => handleScrollTop()}
      >
        <AiOutlineArrowUp fill="#000" size={24} />
      </IconButton>
    </footer>
  );
};

export default Footer;
