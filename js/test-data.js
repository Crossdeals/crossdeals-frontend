const homeScreenData = [
    {
        "_id": "691bca19b8cab703f514e754",
        "title": "Minecraft",
        "isWishlisted": true,
        "deals": [
            {
                "storefront": {
                    "_id": "691bca19b8cab703f514e74b",
                    "url": "www.sonystore.com",
                    "name": "Sony Store",
                    "platforms": [
                        "ps5"
                    ],
                    "__v": 0
                },
                "originalPrice": 99.99,
                "currentPrice": 59.99,
                "bestPrice": 39.99,
                "dealEndDate": "2025-11-11T00:00:00.000Z",
                "_id": "691bca19b8cab703f514e755"
            }
        ],
        "__v": 0
    },
    {
        "_id": "691bca19b8cab703f514e758",
        "title": "Starcraft",
        "deals": [
            {
                "storefront": {
                    "_id": "691bca19b8cab703f514e74b",
                    "url": "www.sonystore.com",
                    "name": "Sony Store",
                    "platforms": [
                        "ps5"
                    ],
                    "__v": 0
                },
                "originalPrice": 29.99,
                "currentPrice": 29.99,
                "_id": "691bca19b8cab703f514e759"
            }
        ],
        "__v": 0
    }
]

const dummyGameData = {
    "_id": "692543fad58b61f4326764e3",
    "title": "Minecraft",
    "publisher": "Mojang Studios",
    "year": 2011,
    "description": "Minecraft is a sandbox game developed and published by Mojang Studios. Formally released on 18 November 2011 for personal computers following its initial public alpha release on 17 May 2009, it has been ported to numerous platforms, including mobile devices and various video game consoles.",
    "deals": [
        {
            "storefront": {
                "_id": "storefront_sonyplaystationstore",
                "url": "https://store.playstation.com/en-ca/",
                "name": "Sony PlayStation Store",
                "platforms": [
                    "PS5"
                ],
                "__v": 0
            },
            "originalPrice": 88.91,
            "currentPrice": 88.67,
            "bestPrice": 88.67,
            "dealEndDate": "2025-12-26T00:00:00.000Z",
            "_id": "692543fad58b61f4326764e4"
        },
        {
            "storefront": {
                "_id": "storefront_epicgamesstore",
                "url": "https://store.epicgames.com/en-US/p/",
                "name": "Epic Games Store",
                "platforms": [
                    "PC"
                ],
                "__v": 0
            },
            "originalPrice": 81.91,
            "currentPrice": 11.97,
            "bestPrice": 11.97,
            "dealEndDate": "2025-12-02T00:00:00.000Z",
            "_id": "692543fad58b61f4326764e5"
        },
        {
            "storefront": {
                "_id": "storefront_xboxstore",
                "url": "https://www.xbox.com/en-CA/",
                "name": "Xbox Store",
                "platforms": [
                    "Xbox Series X|S"
                ],
                "__v": 0
            },
            "originalPrice": 44.89,
            "currentPrice": 26.86,
            "bestPrice": 26.86,
            "dealEndDate": "2025-12-25T00:00:00.000Z",
            "_id": "692543fad58b61f4326764e6"
        }
    ],
    "__v": 0
}

const dummyGameDataWishlisted = {
    "_id": "692543fad58b61f4326764e3",
    "title": "Minecraft",
    "publisher": "Mojang Studios",
    "year": 2011,
    "description": "Minecraft is a sandbox game developed and published by Mojang Studios. Formally released on 18 November 2011 for personal computers following its initial public alpha release on 17 May 2009, it has been ported to numerous platforms, including mobile devices and various video game consoles.",
    "isWishlisted": true,
    "deals": [
        {
            "storefront": {
                "_id": "storefront_sonyplaystationstore",
                "url": "https://store.playstation.com/en-ca/",
                "name": "Sony PlayStation Store",
                "platforms": [
                    "PS5"
                ],
                "__v": 0
            },
            "originalPrice": 88.91,
            "currentPrice": 88.67,
            "bestPrice": 88.67,
            "dealEndDate": "2025-12-26T00:00:00.000Z",
            "_id": "692543fad58b61f4326764e4"
        },
        {
            "storefront": {
                "_id": "storefront_epicgamesstore",
                "url": "https://store.epicgames.com/en-US/p/",
                "name": "Epic Games Store",
                "platforms": [
                    "PC"
                ],
                "__v": 0
            },
            "originalPrice": 81.91,
            "currentPrice": 11.97,
            "bestPrice": 11.97,
            "dealEndDate": "2025-12-02T00:00:00.000Z",
            "_id": "692543fad58b61f4326764e5"
        },
        {
            "storefront": {
                "_id": "storefront_xboxstore",
                "url": "https://www.xbox.com/en-CA/",
                "name": "Xbox Store",
                "platforms": [
                    "Xbox Series X|S"
                ],
                "__v": 0
            },
            "originalPrice": 44.89,
            "currentPrice": 26.86,
            "bestPrice": 26.86,
            "dealEndDate": "2025-12-25T00:00:00.000Z",
            "_id": "692543fad58b61f4326764e6"
        }
    ],
    "__v": 0
}

const dummyGameDataNoStorefronts = {
    "_id": "692543fad58b61f4326764e3",
    "title": "Minecraft",
    "publisher": "Mojang Studios",
    "year": 2011,
    "description": "Minecraft is a sandbox game developed and published by Mojang Studios. Formally released on 18 November 2011 for personal computers following its initial public alpha release on 17 May 2009, it has been ported to numerous platforms, including mobile devices and various video game consoles.",
    "isWishlisted": true,
    "deals": [],
    "__v": 0
}

const dummyPreferredPlatformData = {
    "stores": [
        "playstation",
        "switch"
    ]
}
