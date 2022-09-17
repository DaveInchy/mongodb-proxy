import MangoData from "../classes/db.class.js";

export default class Users extends MangoData
{
    metadata;
    authdata;
    data;

    constructor()
    {
        super();

        this.metadata = {
            email: `bob@btb.pl`,
            password: `Password123!#`,
            name: `Bob the builder`,
        }
        this.authdata = {
            status: {
                login: false,
                sid: "0x0",
            },
            token: "0x0",
            permission: 0,
        }
        this.data = () => ({
            ...this.authdata,
            ...this.metadata
        })

        return this;
    }

    async getUser(email) {

        var collection = this.setCollection('users');

        var query = {
            email: `${email}`,
        }

        this.data = async () => await collection.findOne(query)

        var data = await this.data();
        return {
            error: data === null
                ? true
                : false,
            data: data,
            message: data === null
                ? `Error, Couldn't find user with the known details.`
                : `Success, just success ...`,
        };
    }

    async createUser(email, password, name) {

        var collection = this.setCollection('users');

        var result = { error: false, message: "" };

        if (await this.getUser(email).data === null) {

            this.metadata = {
                email: `${email}`,
                password: `${password}`,
                name: `${name}`,
            }
            this.authdata = {
                status: {
                    login: false,
                    sid: "",
                },
                token: "",
                permission: 0,
            }
            this.data = () => ({
                ...this.authdata,
                ...this.metadata
            })

            await collection.insertOne(this.data());

            result = { error: false, data: this.data(), message: `Success, just success ...` };
        } else {
            result = { error: true, data: null, message: `Error, User already existed ...` };
        }

        return result;
    }
}