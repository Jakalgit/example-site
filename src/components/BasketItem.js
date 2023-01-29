import React, {useContext, useEffect, useState} from 'react';
import style_css from '../css/components/Basket.module.css'
import {useNavigate} from 'react-router-dom'
import {
    decrementBasketItem,
    deleteOneBasketItem,
    getAllBasketItems,
    incrementBasketItem
} from "../http/API/basketItemAPI";
import {ITEM_ROUTE} from "../utils/consts";
import {Context} from "../index";
import Fade from "react-reveal/Fade";
import LoadImage from "./LoadImage";
import CHEVRON_LEFT from "../img/chevron-left.webp"
import CHEVRON_RIGHT from "../img/chevron-right.webp"
import X_WHITE from "../img/x_white.webp"

const BasketItem = (props) => {

    const {user} = useContext(Context)
    const {item} = useContext(Context)

    const [countValue, setCountValue] = useState(props.count)
    const [price, setPrice] = useState('')
    const [fullPrice, setFullPrice] = useState('')

    const navigate = useNavigate()

    const setFull = () =>{
        let sm = ''

        if (price.length > 3) {
            sm = price.slice(0, price.length-4) + price.slice(price.length-3, price.length)
        } else {
            sm = price
        }

        let fullPriceData = (Number(sm) * countValue).toString()

        if (fullPriceData.length > 3) {
            fullPriceData = fullPriceData.slice(0, fullPriceData.length - 3) + ' ' + fullPriceData.slice(fullPriceData.length - 3, fullPriceData.length)

            if (fullPriceData.length > 7) {
                fullPriceData = fullPriceData.slice(0, fullPriceData.length - 7) + ' ' + fullPriceData.slice(fullPriceData.length - 7, fullPriceData.length)
            }
        }

        setFullPrice(fullPriceData)
    }

    useEffect(() => {
        let priceData = props.price.toString()
        if (priceData.length > 3) {
            setPrice((priceData.slice(0, priceData.length - 3) + ' ' + priceData.slice(priceData.length - 3, priceData.length)).toString())
        }
    }, [item.basketItems])

    useEffect(() => {
        setFull()
    }, [price, countValue])

    const itemClick = () => {
        navigate(ITEM_ROUTE + '/' + props.itemId)
    }

    const increment = () => {
        if (countValue < 99) {
            incrementBasketItem(props.itemId, props.basketId).then(() => {
                setCountValue(prevState => prevState + 1)
                let prMas = item.basketItems.map(item => {
                    if (item.id === props.id) {
                        item.count++
                    }
                    return item
                })
                item.setBasketItems(prMas)
                props.setItems(prMas)
            })
            setFull()
        }
    }

    const decrement = () => {
        if (countValue > 1) {
            decrementBasketItem(props.itemId, props.basketId).then(() => {
                setCountValue(prevState => prevState - 1)
                let prMas = item.basketItems.map(item => {
                    if (item.id === props.id) {
                        item.count--
                    }
                    return item
                })
                item.setBasketItems(prMas)
                props.setItems(prMas)
            })
            setFull()
        }
    }

    const deleteBasketItem = () => {
        deleteOneBasketItem(props.id).then(() => {
            getAllBasketItems(user.basket.id).then(data => {
                data.sort((prev, next) => prev.id - next.id)
                item.setBasketItems(data)
                props.setAnimItems('')
                props.setItems([])
                props.setItems(data)
            })
        })
    }

    return (
        <Fade>
            <div className={style_css.item +
                ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0'}>
                <LoadImage name={props.image} className={style_css.image} onClick={itemClick} />
                <div className={style_css.text_block}>
                    <p className={style_css.article}>{props.article}</p>
                    <h2 className={style_css.item_name}>{props.name}</h2>
                    <p className={style_css.first_price}>{price + ' ₽'}</p>
                </div>
                <div className={style_css.counter}>
                    <div className={style_css.change} onClick={decrement}>
                        <img src={CHEVRON_LEFT} alt="" className={style_css.chevron}/>
                    </div>
                    <h2 className={style_css.count}>{countValue}</h2>
                    <div className={style_css.change} onClick={increment}>
                        <img src={CHEVRON_RIGHT} alt="" className={style_css.chevron}/>
                    </div>
                </div>
                <div className={style_css.full_price_block}>
                    <p className={style_css.full_price}>{fullPrice + ' ₽'}</p>
                </div>
                <div className={style_css.delete_item} onClick={deleteBasketItem}>
                    <img src={X_WHITE} alt="" className={style_css.delete}/>
                </div>
            </div>
        </Fade>
    )
};

export default BasketItem;