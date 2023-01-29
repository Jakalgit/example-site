import React, {useContext} from 'react';
import Footer from "../components/Footer";
import {Link, useNavigate} from "react-router-dom";
import {CATALOG_ROUTE, DISCOUNT_ROUTE, NEW_ROUTE, POPULAR_ROUTE, REPAIR_ROUTE} from "../utils/consts";
import style_css from "../css/Home.module.css"
import general from "../css/General.module.css"
import {Carousel} from "react-bootstrap";
import {Fade} from "react-reveal";
import FindLine from "../components/FindLine";
import {Context} from "../index";

const Home = () => {

    document.title = 'Добро пожаловать!'

    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
        <div style={{marginTop: "6rem"}} className={general.height}>
            <Fade top>
                <FindLine len={10} />
            </Fade>
            <Fade>
                <Carousel variant={'dark'}>
                    <Carousel.Item>
                        <div className={style_css.carousel_block}>
                            <h1 className={style_css.welcome_text}>
                                Добро пожаловать!
                            </h1>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => navigate(DISCOUNT_ROUTE)}
                             className={style_css.carousel_block + ' ' + style_css.hover}>
                            <h1 className={style_css.welcome_text}>
                                Акции
                            </h1>
                            <h1 className={style_css.discount}>%</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={style_css.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => navigate(NEW_ROUTE)}
                             className={style_css.carousel_block + ' ' + style_css.hover}>
                            <h1 className={style_css.welcome_text}>
                                Новинки
                            </h1>
                            <h1 style={{backgroundColor: "#00E5FF"}} className={style_css.discount + ' ' + style_css.new}>new</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={style_css.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => navigate(POPULAR_ROUTE)}
                             className={style_css.carousel_block + ' ' + style_css.hover}>
                            <h1 className={style_css.welcome_text}>
                                Популярное
                            </h1>
                            <h1 style={{backgroundColor: "#FDD835"}} className={style_css.discount}>★</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={style_css.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div onClick={() => navigate(REPAIR_ROUTE)} className={style_css.carousel_block + ' ' + style_css.hover}>
                            <h1 className={style_css.welcome_text}>
                                Ремонт
                            </h1>
                            <h1 style={{backgroundColor: "#000"}} className={style_css.discount}>🛠</h1>
                        </div>
                        <Carousel.Caption>
                            <p className={style_css.prompt}>Нажмите чтобы посмотреть</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Fade>

            <div className="container">
                <div className="row">
                    <div className={style_css.cards}>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {user.setCurrentTags(['Модели']); navigate(CATALOG_ROUTE)}}>
                                <img src={require("../img/home/model.webp")} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Модели</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {user.setCurrentTags(['Аккумуляторы']); navigate(CATALOG_ROUTE)}}>
                                <img src={require("../img/home/accu.webp")} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Аккумуляторы</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {user.setCurrentTags(['Зарядные у-ва']); navigate(CATALOG_ROUTE)}}>
                                <img src={require("../img/home/charge.webp")} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Зарядные устройства</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {user.setCurrentTags(['Электроника']); navigate(CATALOG_ROUTE)}}>
                                <img src={require("../img/home/warp.webp")} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Электроника</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {user.setCurrentTags(['Колёса']); navigate(CATALOG_ROUTE)}}>
                                <img src={require("../img/home/wheel.webp")} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Колёса</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {user.setCurrentTags(['Запчасти']); navigate(CATALOG_ROUTE)}}>
                                <img src={require("../img/home/parts.webp")} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Запчасти</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {user.setCurrentTags(['Тюнинг']); navigate(CATALOG_ROUTE)}}>
                                <img src={require("../img/home/tuning.webp")} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Тюнинг</h2>
                            </div>
                        </div>
                        <div className={style_css.card_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6'}>
                            <div className={style_css.card}
                                 onClick={() => {user.setCurrentTags(['Аксессуары']); navigate(CATALOG_ROUTE)}}>
                                <img src={require("../img/home/acs.webp")} alt="" className={style_css.card_image}/>
                                <h2 className={style_css.card_name}>Аксессуары</h2>
                            </div>
                        </div>
                    </div>
                    <Fade left>
                        <h2 className={style_css.text_catalog + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Весь
                            ассортимент товаров вы можете посмотреть в <Link to={CATALOG_ROUTE}><p className={style_css.href}>каталоге</p></Link></h2>
                    </Fade>
                    <Fade right>
                        <h2 className={style_css.phone_number + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>+7(916)-639-88-04</h2>
                    </Fade>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;