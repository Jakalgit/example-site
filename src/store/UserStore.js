import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._user = {}
        this._basket = {}
        this._searchValue = ''
        makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
    }

    setBasket(basket) {
        this._basket = basket
    }

    setSearchValue(searchValue) {
        this._searchValue = searchValue
    }

    get user() {
        return this._user
    }

    get basket() {
        return this._basket
    }

    get searchValue() {
        return this._searchValue
    }
}