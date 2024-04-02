"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderHelper = void 0;
class TraderHelper {
    /**
    * Add profile picture to our trader
    * @param baseJson json file for trader (db/base.json)
    * @param preAkiModLoader mod loader class - used to get the mods file path
    * @param imageRouter image router class - used to register the trader image path so we see their image on trader page
    * @param traderImageName Filename of the trader icon to use
    */
    registerProfileImage(baseJson, modName, preAkiModLoader, imageRouter, traderImageName) {
        // Reference the mod "res" folder
        const imageFilepath = `./${preAkiModLoader.getModPath(modName)}res`;
        // Register a route to point to the profile picture - remember to remove the .jpg from it
        imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/${traderImageName}`);
    }
    /**
     * Add record to trader config to set the refresh time of trader in seconds (default is 60 minutes)
     * @param traderConfig trader config to add our trader to
     * @param baseJson json file for trader (db/base.json)
     * @param refreshTimeSecondsMin How many seconds between trader stock refresh min time
     * @param refreshTimeSecondsMax How many seconds between trader stock refresh max time
     */
    setTraderUpdateTime(traderConfig, baseJson, refreshTimeSecondsMin, refreshTimeSecondsMax) {
        // Add refresh time in seconds to config
        const traderRefreshRecord = {
            traderId: baseJson._id,
            seconds: {
                min: refreshTimeSecondsMin,
                max: refreshTimeSecondsMax
            }
        };
        traderConfig.updateTime.push(traderRefreshRecord);
    }
    /**
     * Add our new trader to the database
     * @param traderDetailsToAdd trader details
     * @param tables database
     * @param jsonUtil json utility class
     */
    // rome-ignore lint/suspicious/noExplicitAny: traderDetailsToAdd comes from base.json, so no type
    addTraderToDb(traderDetailsToAdd, tables, jsonUtil) {
        // Add trader to trader table, key is the traders id
        tables.traders[traderDetailsToAdd._id] = {
            assort: this.createAssortTable(), // assorts are the 'offers' trader sells, can be a single item (e.g. carton of milk) or multiple items as a collection (e.g. a gun)
            base: jsonUtil.deserialize(jsonUtil.serialize(traderDetailsToAdd)), // Deserialise/serialise creates a copy of the json and allows us to cast it as an ITraderBase
            questassort: {
                started: {},
                success: {},
                fail: {}
            } // questassort is empty as trader has no assorts unlocked by quests
        };
    }
    /**
     * Create basic data for trader + add empty assorts table for trader
     * @param tables SPT db
     * @param jsonUtil SPT JSON utility class
     * @returns ITraderAssort
     */
    createAssortTable() {
        // Create a blank assort object, ready to have items added
        const assortTable = {
            nextResupply: 0,
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        };
        return assortTable;
    }
    /**
     * Create a weapon from scratch, ready to be added to trader
     * @returns Item[]
     */
    createHELMET1() {
        const HELMET1 = [];
        HELMET1.push({
            _id: "helmet1Base",
            _tpl: "5b40e1525acfc4771e1c6611"
        });
        HELMET1.push({
            _id: "helmet1Base4",
            _tpl: "657112234269e9a568089eac",
            parentId: "helmet1Base",
            slotId: "Helmet_top"
        });
        HELMET1.push({
            _id: "helmet1Base5",
            _tpl: "657112a4818110db4600aa66",
            parentId: "helmet1Base",
            slotId: "Helmet_back"
        });
        HELMET1.push({
            _id: "helmet1Base6",
            _tpl: "657112ce22996eaf110881fb",
            parentId: "helmet1Base",
            slotId: "Helmet_ears"
        });
        return HELMET1;
    }
    createHELMET2() {
        const HELMET2 = [];
        HELMET2.push({
            _id: "helmet2Base",
            _tpl: "5ea17ca01412a1425304d1c0"
        });
        HELMET2.push({
            _id: "helmet2Base4",
            _tpl: "657f9a55c6679fefb3051e19",
            parentId: "helmet2Base",
            slotId: "Helmet_top"
        });
        HELMET2.push({
            _id: "helmet2Base5",
            _tpl: "657f9a94ada5fadd1f07a589",
            parentId: "helmet2Base",
            slotId: "Helmet_back"
        });
        return HELMET2;
    }
    createHELMET3() {
        const HELMET3 = [];
        HELMET3.push({
            _id: "helmet3Base",
            _tpl: "5a154d5cfcdbcb001a3b00da"
        });
        HELMET3.push({
            _id: "helmet3Base4",
            _tpl: "657f8f10f4c82973640b2350",
            parentId: "helmet3Base",
            slotId: "Helmet_top"
        });
        HELMET3.push({
            _id: "helmet3Base5",
            _tpl: "657f8ec5f4c82973640b234c",
            parentId: "helmet3Base",
            slotId: "Helmet_back"
        });
        return HELMET3;
    }
    createHELMET4() {
        const HELMET4 = [];
        HELMET4.push({
            _id: "helmet4Base",
            _tpl: "5ac8d6885acfc400180ae7b0"
        });
        HELMET4.push({
            _id: "helmet4Base4",
            _tpl: "657f8ec5f4c82973640b234c",
            parentId: "helmet4Base",
            slotId: "Helmet_top"
        });
        HELMET4.push({
            _id: "helmet4Base5",
            _tpl: "657f8f10f4c82973640b2350",
            parentId: "helmet4Base",
            slotId: "Helmet_back"
        });
        return HELMET4;
    }
    createVEST1() {
        const VEST1 = [];
        VEST1.push({
            _id: "vest1Base",
            _tpl: "544a5caa4bdc2d1a388b4568"
        });
        VEST1.push({
            _id: "vest1Base4",
            _tpl: "6570e83223c1f638ef0b0ede",
            parentId: "vest1Base",
            slotId: "Soft_armor_front"
        });
        VEST1.push({
            _id: "vest1Base5",
            _tpl: "6570e87c23c1f638ef0b0ee2",
            parentId: "vest1Base",
            slotId: "Soft_armor_back"
        });
        VEST1.push({
            _id: "vest1Base6",
            _tpl: "6570e90b3a5689d85f08db97",
            parentId: "vest1Base",
            slotId: "Groin"
        });
        VEST1.push({
            _id: "vest1Base7",
            _tpl: "656f9fa0498d1b7e3e071d98",
            parentId: "vest1Base",
            slotId: "Front_plate"
        });
        VEST1.push({
            _id: "vest1Base8",
            _tpl: "656f9fa0498d1b7e3e071d98",
            parentId: "vest1Base",
            slotId: "Back_plate"
        });
        return VEST1;
    }
    createVEST2() {
        const VEST2 = [];
        VEST2.push({
            _id: "vest2Base",
            _tpl: "5e9dacf986f774054d6b89f4"
        });
        VEST2.push({
            _id: "vest2Base4",
            _tpl: "65732de75d3a3129fb05f3dd",
            parentId: "vest2Base",
            slotId: "Soft_armor_front"
        });
        VEST2.push({
            _id: "vest2Base5",
            _tpl: "65732df4d0acf75aea06c87b",
            parentId: "vest2Base",
            slotId: "Soft_armor_back"
        });
        VEST2.push({
            _id: "vest2Base3",
            _tpl: "65732e05d0acf75aea06c87f",
            parentId: "vest2Base",
            slotId: "Soft_armor_left"
        });
        VEST2.push({
            _id: "vest2Base2",
            _tpl: "65732e0f6784ca384b0167ad",
            parentId: "vest2Base",
            slotId: "soft_armor_right"
        });
        VEST2.push({
            _id: "vest2Base9",
            _tpl: "65732e215d3a3129fb05f3e1",
            parentId: "vest2Base",
            slotId: "Collar"
        });
        VEST2.push({
            _id: "vest2Base6",
            _tpl: "65732e30dd8739f6440ef383",
            parentId: "vest2Base",
            slotId: "Groin"
        });
        VEST2.push({
            _id: "vest2Base7",
            _tpl: "65573fa5655447403702a816",
            parentId: "vest2Base",
            slotId: "Front_plate"
        });
        VEST2.push({
            _id: "vest2Base8",
            _tpl: "65573fa5655447403702a816",
            parentId: "vest2Base",
            slotId: "Back_plate"
        });
        return VEST2;
    }
    createVEST3() {
        const VEST3 = [];
        VEST3.push({
            _id: "vest3Base",
            _tpl: "5c0e655586f774045612eeb2"
        });
        VEST3.push({
            _id: "vest3Base4",
            _tpl: "6570e025615f54368b04fcb0",
            parentId: "vest3Base",
            slotId: "Soft_armor_front"
        });
        VEST3.push({
            _id: "vest3Base5",
            _tpl: "6570e0610b57c03ec90b96ef",
            parentId: "vest3Base",
            slotId: "Soft_armor_back"
        });
        VEST3.push({
            _id: "vest3Base7",
            _tpl: "656fad8c498d1b7e3e071da0",
            parentId: "vest3Base",
            slotId: "Front_plate"
        });
        VEST3.push({
            _id: "vest3Base8",
            _tpl: "656fad8c498d1b7e3e071da0",
            parentId: "vest3Base",
            slotId: "Back_plate"
        });
        return VEST3;
    }
    createVEST4() {
        const VEST4 = [];
        VEST4.push({
            _id: "vest4Base",
            _tpl: "5d5d87f786f77427997cfaef"
        });
        VEST4.push({
            _id: "vest4Base4",
            _tpl: "6570e5100b57c03ec90b970a",
            parentId: "vest4Base",
            slotId: "Soft_armor_front"
        });
        VEST4.push({
            _id: "vest4Base5",
            _tpl: "65732df4d0acf75aea06c87b",
            parentId: "vest4Base",
            slotId: "Soft_armor_back"
        });
        VEST4.push({
            _id: "vest4Base22",
            _tpl: "6570e5674cc0d2ab1e05edbb",
            parentId: "vest4Base",
            slotId: "Soft_armor_left"
        });
        VEST4.push({
            _id: "vest4Base2",
            _tpl: "6570e59b0b57c03ec90b970e",
            parentId: "vest4Base",
            slotId: "soft_armor_right"
        });
        VEST4.push({
            _id: "vest4Base7",
            _tpl: "656f9fa0498d1b7e3e071d98",
            parentId: "vest4Base",
            slotId: "Front_plate"
        });
        VEST4.push({
            _id: "vest4Base8",
            _tpl: "656f9fa0498d1b7e3e071d98",
            parentId: "vest4Base",
            slotId: "Back_plate"
        });
        VEST4.push({
            _id: "vest4Base9",
            _tpl: "64afd81707e2cf40e903a316",
            parentId: "vest4Base",
            slotId: "Right_side_plate"
        });
        VEST4.push({
            _id: "vest4Base10",
            _tpl: "64afd81707e2cf40e903a316",
            parentId: "vest4Base",
            slotId: "Left_side_plate"
        });
        return VEST4;
    }
    createVEST5() {
        const VEST5 = [];
        VEST5.push({
            _id: "vest5Base",
            _tpl: "609e8540d5c319764c2bc2e9"
        });
        VEST5.push({
            _id: "vest5Base4",
            _tpl: "6572e5221b5bc1185508c24f",
            parentId: "vest5Base",
            slotId: "Soft_armor_front"
        });
        VEST5.push({
            _id: "vest5Base5",
            _tpl: "6572e52f73c0eabb700109a0",
            parentId: "vest5Base",
            slotId: "Soft_armor_back"
        });
        VEST5.push({
            _id: "vest5Base22",
            _tpl: "6572e53c73c0eabb700109a4",
            parentId: "vest5Base",
            slotId: "Soft_armor_left"
        });
        VEST5.push({
            _id: "vest5Base2",
            _tpl: "6572e54873c0eabb700109a8",
            parentId: "vest5Base",
            slotId: "soft_armor_right"
        });
        VEST5.push({
            _id: "vest5Base7",
            _tpl: "656f9fa0498d1b7e3e071d98",
            parentId: "vest5Base",
            slotId: "Front_plate"
        });
        VEST5.push({
            _id: "vest5Base8",
            _tpl: "656f9fa0498d1b7e3e071d98",
            parentId: "vest5Base",
            slotId: "Back_plate"
        });
        VEST5.push({
            _id: "vest5Base9",
            _tpl: "64afd81707e2cf40e903a316",
            parentId: "vest5Base",
            slotId: "Right_side_plate"
        });
        VEST5.push({
            _id: "vest5Base10",
            _tpl: "64afd81707e2cf40e903a316",
            parentId: "vest5Base",
            slotId: "Left_side_plate"
        });
        return VEST5;
    }
    createVEST6() {
        const VEST6 = [];
        VEST6.push({
            _id: "vest6Base",
            _tpl: "5c0e5edb86f77461f55ed1f7"
        });
        VEST6.push({
            _id: "vest6Base4",
            _tpl: "6571dbd388ead79fcf091d71",
            parentId: "vest6Base",
            slotId: "Soft_armor_front"
        });
        VEST6.push({
            _id: "vest6Base5",
            _tpl: "6571dbda88ead79fcf091d75",
            parentId: "vest6Base",
            slotId: "Soft_armor_back"
        });
        VEST6.push({
            _id: "vest6Base22",
            _tpl: "6571dbe07c02ae206002502e",
            parentId: "vest6Base",
            slotId: "Soft_armor_left"
        });
        VEST6.push({
            _id: "vest6Base2",
            _tpl: "6571dbeaee8ec43d520cf89e",
            parentId: "vest6Base",
            slotId: "soft_armor_right"
        });
        VEST6.push({
            _id: "vest6Base7",
            _tpl: "656f57dc27aed95beb08f628",
            parentId: "vest6Base",
            slotId: "Front_plate"
        });
        VEST6.push({
            _id: "vest6Base8",
            _tpl: "656fac30c6baea13cd07e10c",
            parentId: "vest6Base",
            slotId: "Back_plate"
        });
        VEST6.push({
            _id: "vest6Base9",
            _tpl: "6571dbef88ead79fcf091d79",
            parentId: "vest6Base",
            slotId: "Collar"
        });
        return VEST6;
    }
    /**
    * Add traders name/location/description to the locale table
    * @param baseJson json file for trader (db/base.json)
    * @param tables database tables
    * @param fullName Complete name of trader
    * @param firstName First name of trader
    * @param nickName Nickname of trader
    * @param location Location of trader (e.g. "Here in the cat shop")
    * @param description Description of trader
    */
    addTraderToLocales(baseJson, tables, fullName, firstName, nickName, location, description) {
        // For each language, add locale for the new trader
        const locales = Object.values(tables.locales.global);
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
        }
    }
}
exports.TraderHelper = TraderHelper;
//# sourceMappingURL=traderHelpers.js.map