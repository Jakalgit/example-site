import React, {useEffect, useState} from 'react';
import {fetchItems} from "../http/API/itemAPI"
import general from "../css/General.module.css";
import {Spinner} from "react-bootstrap";
import Alert from "../components/Alert";
import Fade from "react-reveal/Fade";
import style_css from "../css/DiscountCatalog.module.css";
import Item from "../components/Item";
import CatalogCss from "../css/Catalog.module.css";
import Footer from "../components/Footer";
import {fetchColorByIDs} from "../http/API/colorAPI";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {BUCKET_URL} from "../utils/consts";

const PopularCatalog = () => {

    document.title = 'Популярное'

    const [loading, setLoading] = useState(true)

    const [items, setItems] = useState([])

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    useEffect(() => {
        fetchItems().then(data => {
            let mas = []
            data.sort((a, b) => a.count_shop <= b.count_shop ? 1 : -1)
            data = data.filter(el => el.count_shop !== '0' ? el : null)
            let _itemIDs = []
            data.forEach(item => {
                _itemIDs.push({itemId: item.id})
            })
            if (data.length === 0) {
                setLoading(false)
            }
            for (let i = 0; i < (data.length > 12 ? 12 : data.length); i++) {
                const item = data[i]
                fetchColorByIDs(JSON.stringify(_itemIDs)).then(colors => {
                    colors.forEach(color => {
                        getDownloadURL(ref(getStorage(), BUCKET_URL + color.img1)).then((url) => {
                            mas.push({...item, image: url, color: color})
                            if (mas.length === colors.length || mas.length === 12) {
                                setLoading(false)
                                mas.sort((prev, next) => prev.id < next.id ? 1 : -1)
                                setItems(mas)
                            }
                        })
                    })
                })
            }
        })
    }, [])

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
                            <h2 className={style_css.text}>Популярные товары</h2>
                        </Fade>

                        <div className="items">
                            <div className="container">
                                <div className="row">
                                    {items.map(item => <Item
                                            name={item.name}
                                            id={item.id}
                                            image={item.img}
                                            price={item.price}
                                            oldPrice={item.old_price}
                                            discount={item.discount}
                                            discountFlag={item.discount_flag}
                                            availability={item.availability}
                                            updateMessage={(value) => updateMessage(value)}
                                            updateStart={(value) => updateStart(value)}
                                            updateStyle={(value) => updateStyle(value)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Fade>
                        <div className="row">
                            <h2 style={{marginTop: "40vh"}} className={CatalogCss.empty_text}>Готовится, заходите позже</h2>
                        </div>
                    </Fade>
                }
            </div>

            <Footer />

        </div>
    );
};

export default PopularCatalog;