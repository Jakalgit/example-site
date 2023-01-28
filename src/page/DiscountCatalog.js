import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {fetchPageItems} from "../http/API/itemAPI"
import {Spinner} from "react-bootstrap";
import Alert from "../components/Alert";
import general from "../css/General.module.css"
import Footer from "../components/Footer";
import Item from "../components/Item";
import Fade from "react-reveal/Fade";
import CatalogCss from "../css/Catalog.module.css";
import Page from "../components/Page";
import style_css from "../css/DiscountCatalog.module.css"
import {fetchColorByIDs} from "../http/API/colorAPI";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {BUCKET_URL} from "../utils/consts";

const DiscountCatalog = () => {

    document.title = 'Скидки'

    const {item} = useContext(Context)

    const [loading, setLoading] = useState(true)

    const [items, setItems] = useState([])

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    item.setPage(1)

    useEffect(() => {
        fetchPageItems(true, true, true, 1, JSON.stringify([])).then(data => {
            item.setTotalCount(data.count)
            if (data.rows.length !== 0) {
                let _itemIDs = []
                let _items = []
                data.rows.forEach(item => {
                    _itemIDs.push({itemId: item.id})
                })
                fetchColorByIDs(JSON.stringify(_itemIDs)).then(colors => {
                    colors.forEach(color => {
                        getDownloadURL(ref(getStorage(), BUCKET_URL + color.img1)).then((url) => {
                            const item = data.rows.find(el => el.id === color.itemId)
                            _items.push({...item, image: url, color: color.img1})
                            if (_items.length === colors.length) {
                                setLoading(false)
                                _items.sort((prev, next) => prev.id < next.id ? 1 : -1)
                                setItems(_items)
                            }
                        })
                    })
                })
            } else {
                setLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        setItems([])
        fetchPageItems(true, true, true, item.page, JSON.stringify([])).then(data => {
            item.setTotalCount(data.count)
            window.scrollTo(0, 300)
            if (data.rows.length !== 0) {
                let _itemIDs = []
                let _items = []
                data.rows.forEach(item => {
                    _itemIDs.push({itemId: item.id})
                })
                fetchColorByIDs(JSON.stringify(_itemIDs)).then(colors => {
                    colors.forEach(color => {
                        getDownloadURL(ref(getStorage(), BUCKET_URL + color.img1)).then((url) => {
                            const item = data.rows.find(el => el.id === color.itemId)
                            _items.push({...item, image: url, color: color})
                            if (_items.length === colors.length) {
                                _items.sort((prev, next) => prev.id < next.id ? 1 : -1)
                                setItems(_items)
                            }
                        })
                    })
                })
            }
        })
    }, [item.page])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const updateMessage = (value) => {
        setMessage(value)
    }

    const updateStart = (value) => {
        setStart(value)
    }

    const updateStyle = (value) => {
        setStyle(value)
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
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>

            <div className={general.height}>

                {items.length !== 0 ?
                    <div>
                        <Fade>
                            <h2 className={style_css.text}>Товары со скидкой</h2>
                        </Fade>

                        <div className="items">
                            <div className="container">
                                <div className="row">
                                    {items.map(item =>
                                        <Item
                                            name={item.name}
                                            id={item.id}
                                            image={item.image}
                                            price={item.price}
                                            oldPrice={item.old_price}
                                            discount={item.discount}
                                            article={item.article}
                                            discountFlag={item.discount_flag}
                                            availability={item.availability}
                                            color={item.color}
                                            updateMessage={(value) => updateMessage(value)}
                                            updateStart={(value) => updateStart(value)}
                                            updateStyle={(value) => updateStyle(value)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <Fade left>
                            <div className="container">
                                <div className="row">
                                    <div className={CatalogCss.page}>
                                        <Page />
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    :
                    <Fade>
                        <div className="row">
                            <h2 style={{marginTop: "40vh"}} className={CatalogCss.empty_text}>Пока товаров со скидкой нет</h2>
                        </div>
                    </Fade>
                }
            </div>

            <Footer />

        </div>
    );
};

export default DiscountCatalog;