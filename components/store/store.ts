import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Store {
    email = '';
    userid = '';
    name = '';
    phone = '';
    age = undefined;
    residence = undefined;
    token = null;
    location = {};
    seenNotifications = false;
    seenMessages = false 
    loading = true;
    callFunction = false;
    callFunctionOrders = false;
    cards = [];
    relatives = {};

    constructor() {
        makeAutoObservable(this);
        this.initializeStore();
    }

    async initializeStore() {
        await Promise.all([
            this.loadDataFromStorageToken(),
            this.loadDataFromStorageCards(),
            this.loadDataFromStorageUser(),
        ]);
    }

    async loadDataFromStorage(key) {
        try {
            const data = await AsyncStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Ошибка загрузки данных из AsyncStorage (${key}):`, error);
            return null;
        }
    }

    async saveDataToStorage(key, data) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Ошибка сохранения данных в AsyncStorage (${key}):`, error);
        }
    }

    async loadDataFromStorageCards() {
        const savedData = await this.loadDataFromStorage('cards');
        if (savedData) {
            runInAction(() => {
                this.cards = savedData;
            });
        }
    }

    async saveDataToStorageCards() {
        await this.saveDataToStorage('cards', this.cards);
    }

    async loadDataFromStorageToken() {
        const usertoken = await this.loadDataFromStorage('token');
        runInAction(() => {
            this.token = usertoken || null;
            this.loading = false;
        });
    }

    async loadDataFromStorageUser() {
        const userInfo = await this.loadDataFromStorage('user');
        if (userInfo) {
            runInAction(() => {
                this.userid = userInfo.id;
                this.name = userInfo.name;
                this.email = userInfo.email;
                this.residence = userInfo.residence;
                this.age = userInfo.age;
            });
        }
    }

    async setUser(user) {
        await this.saveDataToStorage('user', user);
        runInAction(() => {
            this.userid = user.id;
            this.name = user.name;
            this.email = user.email;
            this.age = user.age;
            this.residence = user.residence;
        });
    }

    addCard(newCard) {
        runInAction(() => {
            this.cards.push(newCard);
        });
        this.saveDataToStorageCards();
    }

    setMainCard(index: number) {
        if (typeof index === 'number' && index >= 0 && index < this.cards.length) {
            runInAction(() => {
                this.cards.forEach((card, idx) => {
                    if (idx !== index) {
                        card.main = false;
                    }
                });
                this.cards[index].main = !this.cards[index].main;
            });
            this.saveDataToStorageCards();
        } else {
            console.error('Invalid index');
        }
    }

    removeCards(indices) {
        runInAction(() => {
            this.cards = this.cards.filter((_, index) => !indices.includes(index));
        });
        this.saveDataToStorageCards();
    }

    addRelative(relatives) {
        runInAction(() => {
            this.relatives = relatives;
        });
    }

    setCallFunction(call: boolean) {
        runInAction(() => {
            this.callFunction = call;
        });
    }

    setCallFunctionOrders(call: boolean) {
        runInAction(() => {
            this.callFunctionOrders = call;
        });
    }

    setNotifications(bool: boolean) {
        runInAction(() => {
            this.seenNotifications = bool;
        });
    }

    setMessages(bool: boolean) {
        runInAction(() => {
            this.seenMessages = bool;
        });
    }

    setLoading(bool: boolean) {
        runInAction(() => {
            this.loading = bool;
        });
    }

    async setToken(token) {
        runInAction(() => {
            this.token = token;
        });
        if (token !== null) {
            await AsyncStorage.setItem('token', JSON.stringify(token));
        } else {
            await AsyncStorage.removeItem('token');
        }
    }

    setLocation(location) {
        runInAction(() => {
            this.location = location;
        });
    }
}

export default new Store();