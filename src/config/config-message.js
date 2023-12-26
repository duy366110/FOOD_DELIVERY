"use strict"

const configMessage = {
    success: {
        access: {
            '001': "User account signin success",
            '002': "User signout success",
        },
        order: {
            "001": "Order success",
            "002": "Cancel order success",
            "003": "Get order success",
        },
        transaction: {
            "001": "Transaction success",
            "002": "Get transaction success"
        },
        user: {

        }
    },
    error: {
        access: {
            "001": "User account not signin",
            "002": "Password incorrect",
            "003": "User signout unsuccess",
            "004": "User account not permission",
            "005": "User signup account unsuccess",
        },
        order: {
            "001": "Order unsuccess",
            "002": "Cancel order unsuccess"
        },
        transaction: {
            "001": "Transaction unsuccess"
        }, 
        user: {
            "001": "Not found user account"
        }
    }
}

export default configMessage;