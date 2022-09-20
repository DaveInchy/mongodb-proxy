// @WARNING THIS FILE IS NOT FINAL IN DESIGN,
// MORE WORK IS NEEDED FOR STATE MANAGEMENT WITHIN THESE MODELS.

import { ObjectId } from "mongodb";
import MangoData from "../classes/db.class";

// @ts-nocheck
export default class User extends MangoData
{
    private _id: ObjectId | undefined;
    private metadata: {
        email: string,
        password: string,
        name: string,
    } | undefined;
    private authdata: {
        status: {
            login: boolean,
            sid: string,
        },
        token: string,
        permission: number,
    } | undefined;

    public constructor(id?: string)
    {
        super();

        if (id && id !== null) {
            this._id = new ObjectId(id);
        }

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

        return this;
    }

    public data = (data?: any) => {
        return data ? ({
            ...data,
        }) : ({
            _id: this._id,
            ...this.authdata,
            ...this.metadata,
        });
    }

    public getUser = async (id: string): Promise<{error: boolean, data: any | {
            email: string;
            password: string;
            name: string;
            status: {
                login: boolean;
                sid: string;
            };
            token: string;
            permission: number;
        }, message: string
    }> => {

        var collection = this.setCollection('users');

        var query = {
            _id: new ObjectId(id),
        }

        var data = await collection.findOne(query)

        return {
            error: data === null
                ? true
                : false,
            data: this.data(data),
            message: data === null
                ? `Error, Couldn't find user with the known details.`
                : `Success, just success ...`,
        };
    }

    public userExists = async (email: string): Promise<boolean> => {

        var collection = this.setCollection('users');

        var result = false;

        var query = {
            email: `${email}`,
        }

        var data = await collection.findOne(query);

        if (data && data !== null) result = true;

        return result;
    }

    public createUser = async (email: string, password: string, name: string): Promise<{ error: boolean, data: any | {
            email: string;
            password: string;
            name: string;
            status: {
                login: boolean;
                sid: string;
            };
            token: string;
            permission: number;
        }, message: string
    }> => {

        var collection = this.setCollection('users');

        var result = { error: true, message: `Already found a user with that email account.`, data: null || ({ _id: this._id, ...this.authdata, ...this.metadata }) };

        if (!await this.userExists(email)) {

            this.metadata = {
                email: `${email}`,
                password: `${password}`,
                name: `${name}`,
            }
            this.authdata = {
                status: {
                    login: false,
                    sid: "0x0",
                },
                token: "0x0",
                permission: 100,
            }
            this.data = () => ({
                ...this.authdata,
                ...this.metadata
            })

            result = { error: false, data: await collection.insertOne(this.data()), message: `Success, just success ...` };
        }

        return result;
    }
}