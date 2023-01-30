import React, {useContext, useEffect, useState} from 'react';
import ItemPageCss from '../css/ItemPage.module.css'
import Footer from "../components/Footer";
import {useParams} from "react-router-dom";
import {fetchColor} from "../http/API/colorAPI";
import {fetchAllInfo, fetchOneItem} from "../http/API/itemAPI"
import {
    createBasketItem,
    decrementBasketItem, getAllBasketItems,
    getBasketItem,
    incrementBasketItem, setCountBasketItem
} from "../http/API/basketItemAPI"
import {Context} from "../index";
import {Carousel, Spinner} from "react-bootstrap";
import Alert from "../components/Alert";
import general from "../css/General.module.css";
import {Fade} from "react-reveal";
import LoadImage from "../components/LoadImage";
import CHECK from "../img/check.webp"
import X_BLACK from "../img/x_black.webp"
import CHEVRON_LEFT from "../img/chevron-left.webp"
import CHEVRON_RIGHT from "../img/chevron-right.webp"

const ItemPage = () => {

    const {item} = useContext(Context)
    const {user} = useContext(Context)

    const [count, setCount] = useState(1)
    const [itemPg, setItem] = useState({})
    const {id} = useParams()

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [info, setInfo] = useState([])
    const [color, setColor] = useState(null)

    const [loading, setLoading] = useState(true)

    const [price, setPrice] = useState('')
    const [oldPrice, setOldPrice] = useState('')

    useEffect(() => {
        fetchOneItem(id).then(dataItem => {
            setItem(dataItem)
            document.title = dataItem.name
            fetchAllInfo(dataItem.id).then(data => {
                setInfo(data.rows)
                fetchColor(id).then(color => {
                    setColor(color)
                    getBasketItem(id, user.basket.id).then(data => {
                        if (data === "Ошибка" || data === "Error") {
                            setCount(1)
                        } else {
                            setCount(data.count)
                        }
                        setLoading(false)
                    })
                })
            })
        })
    }, [])

    useEffect(() => {
        if (itemPg.price) {
            let priceSTR = itemPg.price.toString()
            if (priceSTR.length > 3) {
                setPrice(priceSTR.slice(0, priceSTR.length - 3) + ' ' + priceSTR.slice(priceSTR.length - 3, priceSTR.length))
            } else {
                setPrice(priceSTR)
            }
        }

        if (itemPg.old_price) {
            let priceSTR = itemPg.old_price.toString()
            if (priceSTR.length > 3) {
                setOldPrice(priceSTR.slice(0, priceSTR.length - 3) + ' ' + priceSTR.slice(priceSTR.length - 3, priceSTR.length))
            } else {
                setOldPrice(priceSTR)
            }
        }
    }, [itemPg])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    useEffect(() => {
        if (count < 1) {
            setCountBasketItem(id, user.basket.id, 1).then(() => {
                setCount(1)
                let prMas = item.basketItems.map(item => {
                    if (item.id === id) {
                        item.count = 1
                    }
                    return item
                })
                item.setBasketItems(prMas)
            })
        }
        if (count > 99) {
            setCountBasketItem(id, user.basket.id, 99).then(() => {
                setCount(1)
                let prMas = item.basketItems.map(item => {
                    if (item.id === id) {
                        item.count = 99
                    }
                    return item
                })
                item.setBasketItems(prMas)
            })
        }
    }, [count])

    const increment = () => {
        let _count = count
        if (count < 99) {
            incrementBasketItem(id, user.basket.id, _count + 1).then(() => {
                setCount(prevState => prevState + 1)
                item.setBasketItems(item.basketItems.map(el => el.id === id ? {...el, count: _count + 1} : el))
            })
        }
    }

    const decrement = () => {
        let _count = count
        if (count > 1) {
            decrementBasketItem(id, user.basket.id, _count - 1).then(() => {
                setCount(prevState => prevState - 1)
                item.setBasketItems(item.basketItems.map(el => el.id === id ? {...el, count: _count - 1} : el))
            })
        }
    }

    const addToBasket = () => {
        if (itemPg.availability) {
            createBasketItem(itemPg.id, user.basket.id, count, color.img1, itemPg.name, itemPg.price, color.id,
                itemPg.article).then(() => {
                    getAllBasketItems(user.basket.id).then(data => {
                        if (data !== "Error" && data !== "Ошибка") {
                            item.setBasketItems(data)
                        }
                    })
                    setMessage("Товар добавлен в корзину")
                    setStyle("primary")
                    setStart(true)
            })
        } else {
            setMessage("Данного товара нет в наличии")
            setStyle("danger")
            setStart(true)
        }
    }

    const updateStart = (value) => {
        setStart(value)
    }

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)} />
            <Fade top>
                <div className={ItemPageCss.item_block}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-12">
                                <Carousel variant={"dark"}>
                                    <Carousel.Item>
                                        <div className={ItemPageCss.img}>
                                            <LoadImage name={color.img1} className={ItemPageCss.image} />
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={ItemPageCss.img}>
                                            <LoadImage name={color.img2} className={ItemPageCss.image} />
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={ItemPageCss.img}>
                                            <LoadImage name={color.img3} className={ItemPageCss.image} />
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className={ItemPageCss.img}>
                                            <LoadImage name={color.img4} className={ItemPageCss.image} />
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                            <div className={ItemPageCss.inf + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-7 col-12'}>
                                <div className='flex-block col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                    <div className={ItemPageCss.name_block}>
                                        <h2 className={ItemPageCss.item_name}>{itemPg.name}</h2>
                                        {itemPg.discount_flag ?
                                            <h2 className={ItemPageCss.discount}>{'-' + itemPg.discount + '%'}</h2>
                                            :
                                            <div/>
                                        }
                                    </div>
                                    {itemPg.availability ?
                                        <div className={ItemPageCss.help_ava + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                            <div className={ItemPageCss.availability + ' ' + ItemPageCss.availability_green}>
                                                <img src={CHECK} alt="" className={ItemPageCss.ava}/>
                                            </div>
                                            <h2 className={ItemPageCss.availability_text}>В наличии</h2>
                                        </div>
                                        :
                                        <div className={ItemPageCss.help_ava + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                            <div className={ItemPageCss.availability + ' ' + ItemPageCss.availability_red}>
                                                <img src={X_BLACK} alt="" className={ItemPageCss.ava}/>
                                            </div>
                                            <h2 className={ItemPageCss.availability_text}>Нет в наличии</h2>
                                        </div>
                                    }
                                    <h1 className={ItemPageCss.article}>{itemPg.article}</h1>
                                    <div className={ItemPageCss.counter + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        <div className={ItemPageCss.change} onClick={decrement}>
                                            <img src={CHEVRON_LEFT} alt="" className={ItemPageCss.chevron}/>
                                        </div>
                                        <h2 className={ItemPageCss.count}>{count}</h2>
                                        <div className={ItemPageCss.change} onClick={increment}>
                                            <img src={CHEVRON_RIGHT} alt="" className={ItemPageCss.chevron}/>
                                        </div>
                                    </div>
                                    <h2 className={ItemPageCss.price + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{price + ' ₽'}</h2>
                                    {itemPg.discount_flag ?
                                        <h2 className={ItemPageCss.old_price}>{oldPrice + ' ₽'}</h2>
                                        :
                                        <div/>
                                    }
                                    <button onClick={addToBasket}
                                        className={ItemPageCss.add_to_bag + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-8 offset-sm-2 col-10 offset-1'}>
                                        Добавить в корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade bottom>
                <div className="des-block">
                    <div className={ItemPageCss.des_back}>
                        <div className="container">
                            <div className="row">
                                {info.map(i =>
                                    <Fade>
                                        <h2 className={ItemPageCss.description + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                            {i.info}
                                        </h2>
                                    </Fade>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
            <Footer />
        </div>
    );
};

export default ItemPage;
