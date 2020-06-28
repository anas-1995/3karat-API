'use strict';

module.exports = function (Royalty) {


    Royalty.createNewRoyalty = async function (royaltyData, images, req, callback) {
        try {
            await Royalty.app.dataSources.mainDB.transaction(async models => {
                const {
                    item
                } = models;
                const {
                    royalty
                } = models;
                const {
                    imagesRoyalty
                } = models;
                royaltyData.ownerId = req.accessToken.userId
                let newRoyalty = await royalty.create(royaltyData)
                let newItem = await item.create({ "type": "royalty", "royaltyId": newRoyalty.id })
                let imagesId = []
                images.forEach(element => {
                    imagesId.push({ "mediaId": element, "royaltyId": newRoyalty.id })
                });
                await imagesRoyalty.create(imagesId);
                callback(null, newRoyalty)
            })
        }
        catch (error) {
            callback(error)
        }
    }

    Royalty.updateRoyalty = async function (id, royaltyData, images, req, callback) {
        try {
            await Royalty.app.dataSources.mainDB.transaction(async models => {
                const {
                    item
                } = models;
                const {
                    royalty
                } = models;
                const {
                    imagesRoyalty
                } = models;
                let mainRoyalty = await royalty.findById(id);
                if (mainRoyalty == null) {
                    throw ({});
                }
                await imagesRoyalty.destroyAll({
                    "royaltyId": id
                })

                let imagesId = []
                images.forEach(element => {
                    imagesId.push({ "mediaId": element, "royaltyId": id })
                });
                await imagesRoyalty.create(imagesId);
                let newRoyalty = await mainRoyalty.updateAttributes(royaltyData)
                callback(null, newRoyalty)
            })
        }
        catch (error) {
            callback(error)
        }
    }

};
