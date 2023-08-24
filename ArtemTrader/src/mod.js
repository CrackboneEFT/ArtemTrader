"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
// New trader settings
const baseJson = __importStar(require("../db/base.json"));
const traderHelpers_1 = require("./traderHelpers");
const fluentTraderAssortCreator_1 = require("./fluentTraderAssortCreator");
const Money_1 = require("C:/snapshot/project/obj/models/enums/Money");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
class ArtemTrader {
    constructor() {
        this.mod = "ArtemTrader"; // Set name of mod so we can log it to console later
    }
    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param container Dependency container
     */
    preAkiLoad(container) {
        // Get a logger
        this.logger = container.resolve("WinstonLogger");
        this.logger.debug(`[${this.mod}] preAki Loading... `);
        // Get SPT code/data we need later
        const preAkiModLoader = container.resolve("PreAkiModLoader");
        const imageRouter = container.resolve("ImageRouter");
        const hashUtil = container.resolve("HashUtil");
        const configServer = container.resolve("ConfigServer");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        // Create helper class and use it to register our traders image/icon + set its stock refresh time
        this.traderHeper = new traderHelpers_1.TraderHelper();
        this.fluentTraderAssortHeper = new fluentTraderAssortCreator_1.FluentAssortConstructor(hashUtil, this.logger);
        this.traderHeper.registerProfileImage(baseJson, this.mod, preAkiModLoader, imageRouter, "Artem.jpg");
        this.traderHeper.setTraderUpdateTime(traderConfig, baseJson, 3600);
        // Add trader to trader enum
        Traders_1.Traders[baseJson._id] = baseJson._id;
        this.logger.debug(`[${this.mod}] preAki Loaded`);
    }
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     * @param container Dependency container
     */
    postDBLoad(container) {
        this.logger.debug(`[${this.mod}] postDb Loading... `);
        // Resolve SPT classes we'll use
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const db = container.resolve("DatabaseServer").getTables();
        const jsonUtil = container.resolve("JsonUtil");
        const ImporterUtil = container.resolve("ImporterUtil");
        // Get a reference to the database tables
        const tables = databaseServer.getTables();
        // Add new trader to the trader dictionary in DatabaseServer - has no assorts (items) yet
        this.traderHeper.addTraderToDb(baseJson, tables, jsonUtil);
        db.templates.items["55d7217a4bdc2d86028b456d"]._props.Slots[5]._props.filters[0].Filter.push("ARTEM_GHOSTMASK");
        // Add milk
        const MILK_ID = "575146b724597720a27126d5"; // Can find item ids in `database\templates\items.json` or with https://db.sp-tarkov.com/search
        this.fluentTraderAssortHeper.createSingleAssortItem(MILK_ID)
            .addStackCount(200)
            .addBuyRestriction(10)
            .addMoneyCost(Money_1.Money.ROUBLES, 7450)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const IGOLNIK545 = "5c0d5e4486f77478390952fe";
        this.fluentTraderAssortHeper.createSingleAssortItem(IGOLNIK545)
            .addUnlimitedStackCount()
            .addBuyRestriction(60)
            .addMoneyCost(Money_1.Money.ROUBLES, 1120)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        const GASWELDERGOGGLES = "61c18d83b00456371a66814b";
        this.fluentTraderAssortHeper.createSingleAssortItem(GASWELDERGOGGLES)
            .addUnlimitedStackCount()
            .addBuyRestriction(5)
            .addMoneyCost(Money_1.Money.ROUBLES, 19020)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("544fb45d4bdc2dee738b4568") // Salewa
            .addUnlimitedStackCount()
            .addBuyRestriction(12)
            .addMoneyCost(Money_1.Money.ROUBLES, 35765)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5e81f423763d9f754677bf2e") // .45acp Match FMJ
            .addUnlimitedStackCount()
            .addBuyRestriction(120)
            .addMoneyCost(Money_1.Money.ROUBLES, 135)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("55d480c04bdc2d1d4e8b456a") // AK-74 5.45x39 6L23 30-round magazine
            .addUnlimitedStackCount()
            .addBuyRestriction(12)
            .addMoneyCost(Money_1.Money.ROUBLES, 2062)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5a27b6bec4a282000e496f78") // .SR 9x21 Supressor
            .addUnlimitedStackCount()
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 42849)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("ARTEM_GHOSTMASK") // .SR 9x21 Supressor
            .addUnlimitedStackCount()
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 42849)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("55d614004bdc2d86028b4568") // SureFire SOCOM556-MONSTER 5.56x45 sound suppressor
            .addUnlimitedStackCount()
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 45321)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("626673016f1edc06f30cf6d5") // KAC QDC 5.56x45 sound suppressor
            .addStackCount(42)
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 92501)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("57ffb0e42459777d047111c5") // AKS-74U PBS-4 5.45x39 sound suppressor
            .addStackCount(91)
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 35012)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5e208b9842457a4a7a33d074") // AK Hexagon DTKP MK.2 7.62x39 sound suppressor
            .addStackCount(12)
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 58239)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5a0d63621526d8dba31fe3bf") // AKM PBS-1 7.62x39 sound suppressor
            .addStackCount(8)
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 49123)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("572b7fa524597762b747ce82") // Day pack backpack
            .addUnlimitedStackCount()
            .addBuyRestriction(8)
            .addMoneyCost(Money_1.Money.ROUBLES, 1734)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5e9dcf5986f7746c417435b3") // Day pack backpack
            .addUnlimitedStackCount()
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 14230)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5d5d940f86f7742797262046") // Oakley Backpack
            .addUnlimitedStackCount()
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 42543)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5ea17ca01412a1425304d1c0") // Diamond Helmet
            .addUnlimitedStackCount()
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 95261)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5c0e5edb86f77461f55ed1f7") // Zhuk-3 (PRESS)
            .addUnlimitedStackCount()
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 68329)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5645bcc04bdc2d363b8b4572") // Comtac2
            .addUnlimitedStackCount()
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 28920)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5aa2ba71e5b5b000137b758f") // MSA Super headphones
            .addUnlimitedStackCount()
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 43627)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5f60cd6cf2bcbb675b00dac6") // Walkers XCEL headphones
            .addUnlimitedStackCount()
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 90155)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5e9dacf986f774054d6b89f4") // FORT Defender-2 body armor
            .addUnlimitedStackCount()
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 205302)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("59e7715586f7742ee5789605") // RESPIRATOR
            .addUnlimitedStackCount()
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 4302)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("56dff4ecd2720b5f5a8b4568") // 5.45 T
            .addStackCount(2391)
            .addBuyRestriction(120)
            .addMoneyCost(Money_1.Money.ROUBLES, 39)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("56dff3afd2720bba668b4567") // 5.45 Ps
            .addUnlimitedStackCount()
            .addBuyRestriction(0)
            .addMoneyCost(Money_1.Money.ROUBLES, 39)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5656d7c34bdc2d9d198b4587") // 7.62 PS
            .addUnlimitedStackCount()
            .addBuyRestriction(0)
            .addMoneyCost(Money_1.Money.ROUBLES, 142)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("6193d338de3cdf1d2614a6fc") // .45acp 12 round mag
            .addStackCount(59)
            .addBuyRestriction(12)
            .addMoneyCost(Money_1.Money.ROUBLES, 1700)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("55802d5f4bdc2dac148b458e") // M4 MAGPUL PMAG 30 GEN M3 BLACK
            .addStackCount(99)
            .addBuyRestriction(15)
            .addMoneyCost(Money_1.Money.ROUBLES, 11500)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("6241c2c2117ad530666a5108") // M4 MAGPUL PMAG 30 GEN M3 FDE
            .addStackCount(87)
            .addBuyRestriction(15)
            .addMoneyCost(Money_1.Money.ROUBLES, 11500)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5aaa4194e5b5b055d06310a5") // AK MAGPUL PMAG 30 GEN M3
            .addStackCount(72)
            .addBuyRestriction(15)
            .addMoneyCost(Money_1.Money.ROUBLES, 11000)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5c0558060db834001b735271") // GPNVG18
            .addStackCount(6)
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 124260)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5c066e3a0db834001b7353f0") // N-15 NVG
            .addStackCount(15)
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 43215)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5c0696830db834001d23f5da") // PNV-10
            .addStackCount(21)
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 32962)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5b3b6e495acfc4330140bd88") // Armasight Vulcan MG 3.5x
            .addUnlimitedStackCount()
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 29102)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5e9db13186f7742f845ee9d3") // LBT-1961A ChestRig
            .addUnlimitedStackCount()
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 73829)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("60098ad7c2240c0fe85c570a") // AFAK
            .addUnlimitedStackCount()
            .addBuyRestriction(6)
            .addMoneyCost(Money_1.Money.ROUBLES, 59829)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5710c24ad2720bc3458b45a3") // F-1 Grenade
            .addStackCount(182)
            .addBuyRestriction(6)
            .addMoneyCost(Money_1.Money.ROUBLES, 8562)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("58d3db5386f77426186285a0") // M67 Grenade
            .addStackCount(206)
            .addBuyRestriction(6)
            .addMoneyCost(Money_1.Money.ROUBLES, 10292)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("54527a984bdc2d4e668b4567") // M885
            .addStackCount(129)
            .addBuyRestriction(60)
            .addMoneyCost(Money_1.Money.ROUBLES, 285)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("59e690b686f7746c9f75e848") // M955
            .addStackCount(1206)
            .addBuyRestriction(60)
            .addMoneyCost(Money_1.Money.ROUBLES, 955)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("59e6920f86f77411d82aa167") // 556x45 FMJ
            .addUnlimitedStackCount()
            .addBuyRestriction(0)
            .addMoneyCost(Money_1.Money.ROUBLES, 162)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5cc86840d7f00c002412c56c") // 5.7X28 R37X
            .addUnlimitedStackCount()
            .addBuyRestriction(0)
            .addMoneyCost(Money_1.Money.ROUBLES, 172)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5d6e6911a4b9361bd5780d52") // 12/70 flechette
            .addUnlimitedStackCount()
            .addBuyRestriction(60)
            .addMoneyCost(Money_1.Money.ROUBLES, 330)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5c925fa22e221601da359b7b") // 9x19 AP.6.3
            .addUnlimitedStackCount()
            .addBuyRestriction(120)
            .addMoneyCost(Money_1.Money.ROUBLES, 429)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("56dff2ced2720bb4668b4567") // 5.45x45 PP
            .addUnlimitedStackCount()
            .addBuyRestriction(120)
            .addMoneyCost(Money_1.Money.ROUBLES, 172)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("56dff026d2720bb8668b4567") // 5.45x45 BS
            .addUnlimitedStackCount()
            .addBuyRestriction(120)
            .addMoneyCost(Money_1.Money.ROUBLES, 672)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("59e6906286f7746c9f75e847") // 5.56x45 M865A1
            .addUnlimitedStackCount()
            .addBuyRestriction(80)
            .addMoneyCost(Money_1.Money.ROUBLES, 172)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("54527ac44bdc2d36668b4567") // 5.56x45 M855A1
            .addUnlimitedStackCount()
            .addBuyRestriction(60)
            .addMoneyCost(Money_1.Money.ROUBLES, 681)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("56d59d3ad2720bdb418b4577") // 9x19mm pst gzh
            .addUnlimitedStackCount()
            .addBuyRestriction(100)
            .addMoneyCost(Money_1.Money.ROUBLES, 65)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5efb0da7a29a85116f6ea05f") // 9x19mm PBP gzh
            .addUnlimitedStackCount()
            .addBuyRestriction(70)
            .addMoneyCost(Money_1.Money.ROUBLES, 581)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5a6086ea4f39f99cd479502f") // 7.62x51mm M61
            .addUnlimitedStackCount()
            .addBuyRestriction(40)
            .addMoneyCost(Money_1.Money.ROUBLES, 1572)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5c94bbff86f7747ee735c08f") // Labs keycard access
            .addUnlimitedStackCount()
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 152385)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5c0e655586f774045612eeb2") // HighCom Trooper TFO body armor
            .addUnlimitedStackCount()
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 122385)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("609e8540d5c319764c2bc2e9") // HighCom Trooper TFO body armor
            .addUnlimitedStackCount()
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 43520)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("618bb76513f5097c8d5aa2d5") // Gropa T20
            .addUnlimitedStackCount()
            .addBuyRestriction(4)
            .addMoneyCost(Money_1.Money.ROUBLES, 39239)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("63737f448b28897f2802b874") // HighCom Trooper TFO body armor
            .addUnlimitedStackCount()
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 212030)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("59d6272486f77466146386ff") // AK MAGPUL 7.62 30MAG
            .addUnlimitedStackCount()
            .addBuyRestriction(6)
            .addMoneyCost(Money_1.Money.ROUBLES, 12523)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("59fafc9386f774067d462453") // AK US PALM FDE 7.62 30MAG
            .addUnlimitedStackCount()
            .addBuyRestriction(5)
            .addMoneyCost(Money_1.Money.ROUBLES, 15675)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("59fafc5086f7740dbe19f6c3") // AK US PALM BLACK 7.62 30MAG
            .addUnlimitedStackCount()
            .addBuyRestriction(5)
            .addMoneyCost(Money_1.Money.ROUBLES, 15675)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createSingleAssortItem("5aafbde786f774389d0cbc0f") // Ammunition Case
            .addUnlimitedStackCount()
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 173582)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        const Tac50 = "5b2388675acfc4771e1be0be";
        this.fluentTraderAssortHeper.createSingleAssortItem(Tac50)
            .addStackCount(121)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 71528)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        const HIGHCOMULACH = "5b40e1525acfc4771e1c6611";
        this.fluentTraderAssortHeper.createSingleAssortItem(HIGHCOMULACH)
            .addStackCount(142)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 91000)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        const ColdBalaclava = "5ab8f39486f7745cd93a1cca";
        this.fluentTraderAssortHeper.createSingleAssortItem(ColdBalaclava)
            .addStackCount(640)
            .addBuyRestriction(8)
            .addMoneyCost(Money_1.Money.ROUBLES, 3500)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const GhostBalaclava = "5ab8f4ff86f77431c60d91ba";
        this.fluentTraderAssortHeper.createSingleAssortItem(GhostBalaclava)
            .addStackCount(640)
            .addBuyRestriction(8)
            .addMoneyCost(Money_1.Money.ROUBLES, 6345)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const PlagueMask = "5e54f79686f7744022011103";
        this.fluentTraderAssortHeper.createSingleAssortItem(PlagueMask)
            .addStackCount(200)
            .addBuyRestriction(10)
            .addMoneyCost(Money_1.Money.ROUBLES, 46300)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        // BARTER TRADE
        const VITAMINS_ID = "62a0a043cf4a99369e2624a5";
        const GRIZZLY = "590c657e86f77412b013051d";
        const MEDS_ID2 = "5d1b3a5d86f774252167ba22";
        this.fluentTraderAssortHeper.createSingleAssortItem(GRIZZLY)
            .addStackCount(100)
            .addBarterCost(MEDS_ID2, 4)
            .addBarterCost(VITAMINS_ID, 2)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const MEDS_ID = "5d1b3a5d86f774252167ba22";
        const PlagueMask2 = "5e54f79686f7744022011103";
        this.fluentTraderAssortHeper.createSingleAssortItem(PlagueMask2)
            .addStackCount(200)
            .addBuyRestriction(10)
            .addBarterCost(MEDS_ID, 4)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const HalfFaceMask = "572b7fa524597762b747ce82";
        const SpookySkull = "635267ab3c89e2112001f826";
        this.fluentTraderAssortHeper.createSingleAssortItem(SpookySkull)
            .addStackCount(16)
            .addBuyRestriction(10)
            .addBarterCost(HalfFaceMask, 3)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const HorseFigurine = "573478bc24597738002c6175";
        const TerragroupArmband = "619bdef8c9546643a67df6f6";
        this.fluentTraderAssortHeper.createSingleAssortItem(TerragroupArmband)
            .addStackCount(640)
            .addBuyRestriction(1)
            .addBarterCost(HorseFigurine, 2)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const Sewingkit = "61bf83814088ec1a363d7097";
        const RipstopFabric = "5e2af4a786f7746d3f3c3400";
        const INJECTCASE = "619cbf7d23893217ec30b689";
        const leathermantool = "544fb5454bdc2df8738b456a";
        const Surv12 = "5d02797c86f774203f38e30a";
        this.fluentTraderAssortHeper.createSingleAssortItem(INJECTCASE)
            .addStackCount(391)
            .addBuyRestriction(1)
            .addBarterCost(Sewingkit, 3)
            .addBarterCost(leathermantool, 2)
            .addBarterCost(RipstopFabric, 1)
            .addBarterCost(Surv12, 1)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        const OXBLEACH = "59e3556c86f7741776641ac2";
        const DocCase = "590c60fc86f77412b13fddcf";
        this.fluentTraderAssortHeper.createSingleAssortItem(DocCase)
            .addStackCount(640)
            .addBuyRestriction(1)
            .addBarterCost(OXBLEACH, 3)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const PCB1 = "590a3b0486f7743954552bdb";
        const BundleWires = "5c06779c86f77426e00dd782";
        const GPNVG18 = "5c0558060db834001b735271";
        const packscrews = "59e35ef086f7741777737012";
        this.fluentTraderAssortHeper.createSingleAssortItem(GPNVG18)
            .addStackCount(41)
            .addBuyRestriction(1)
            .addBarterCost(PCB1, 2)
            .addBarterCost(BundleWires, 4)
            .addBarterCost(packscrews, 3)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        const SCREWS = "59e35ef086f7741777737012";
        const AK30Round545 = "55d480c04bdc2d1d4e8b456a";
        const AK60Round545 = "55d482194bdc2d1d4e8b456b";
        this.fluentTraderAssortHeper.createSingleAssortItem(AK60Round545)
            .addStackCount(640)
            .addBuyRestriction(3)
            .addBarterCost(SCREWS, 2)
            .addBarterCost(AK30Round545, 1)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const GPCOIN2 = "5d235b4d86f7742e017bc88a";
        const CultKnife = "5fc64ea372b0dd78d51159dc";
        this.fluentTraderAssortHeper.createSingleAssortItem(CultKnife)
            .addStackCount(200)
            .addBuyRestriction(10)
            .addBarterCost(GPCOIN2, 4)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const GUNPOWDERK = "590c5a7286f7747884343aea";
        const SHATTERED_MASK = "5b432b2f5acfc4771e1c6622";
        this.fluentTraderAssortHeper.createSingleAssortItem(SHATTERED_MASK)
            .addStackCount(250)
            .addBuyRestriction(2)
            .addBarterCost(GUNPOWDERK, 1)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const GPCOIN = "5d235b4d86f7742e017bc88a";
        const ZryachiMask = "63626d904aa74b8fe30ab426";
        this.fluentTraderAssortHeper.createSingleAssortItem(ZryachiMask)
            .addStackCount(250)
            .addBuyRestriction(2)
            .addBarterCost(GPCOIN, 2)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const STM = "60479c3f420fac5ebc199f86";
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets[STM]._items)
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 37703)
            .addBuyRestriction(3)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        const AK74N = "5841474424597759ba49be91";
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets[AK74N]._items)
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 32703)
            .addBuyRestriction(3)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add ADAR as money purchase
        this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHeper.createADART3())
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 182400)
            .addBuyRestriction(2)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHeper.createAKTIER3())
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 122923)
            .addBuyRestriction(2)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHeper.createASVALTIER3())
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 166268)
            .addBuyRestriction(2)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHeper.createPPT1())
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 72400)
            .addBuyRestriction(2)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHeper.createP90Rogue())
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 99470)
            .addBuyRestriction(2)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHeper.createM4T2())
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 154200)
            .addBuyRestriction(3)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHeper.createSCARLT2())
            .addUnlimitedStackCount()
            .addMoneyCost(Money_1.Money.ROUBLES, 164200)
            .addBuyRestriction(3)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createComplexAssortItem(this.traderHeper.createBARTERM4T1())
            .addUnlimitedStackCount()
            .addBarterCost(GPCOIN, 4)
            .addBuyRestriction(2)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        // Add mp133 preset as mayo barter
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["584148f2245977598f1ad387"]._items)
            .addStackCount(200)
            .addBarterCost("5bc9b156d4351e00367fbce9", 1)
            .addBuyRestriction(3)
            .addLoyaltyLevel(1)
            .export(tables.traders[baseJson._id]);
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["5e03511086f7744ccb1fb6cf"]._items) // sr25
            .addStackCount(21)
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 95504)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        //adds RD-704
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["62972a7d91492d1a34152fbe"]._items)
            .addStackCount(160)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 102521)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        //adds MK47
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["60b7d76e2a3c79100f1979de"]._items)
            .addStackCount(21)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 134520)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        //adds Vector45
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["5fd251ee16cac650092f5d02"]._items)
            .addStackCount(21)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 78842)
            .addLoyaltyLevel(3)
            .export(tables.traders[baseJson._id]);
        //adds ASVAL
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["5841482e2459775a050cdda9"]._items)
            .addStackCount(16)
            .addBuyRestriction(2)
            .addMoneyCost(Money_1.Money.ROUBLES, 104253)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        //adds T5000
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["5e0354f786f77425b53eb6c5"]._items)
            .addStackCount(3)
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 71239)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        //adds DVL 
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["58dffc5d86f77407c744a847"]._items)
            .addStackCount(3)
            .addBuyRestriction(1)
            .addMoneyCost(Money_1.Money.ROUBLES, 79830)
            .addLoyaltyLevel(4)
            .export(tables.traders[baseJson._id]);
        //adds MPX 
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["58dffd4586f77408a27629b2"]._items)
            .addStackCount(24)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 74823)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        //adds Adds MP5 
        this.fluentTraderAssortHeper.createComplexAssortItem(tables.globals.ItemPresets["618aafe23c1dcf601e0327db"]._items)
            .addStackCount(24)
            .addBuyRestriction(3)
            .addMoneyCost(Money_1.Money.ROUBLES, 84920)
            .addLoyaltyLevel(2)
            .export(tables.traders[baseJson._id]);
        // Add some singular items to trader (items without sub-items e.g. milk/bandage)
        //this.traderHeper.addSingleItemsToTrader(tables, baseJson._id);
        // Add more complex items to trader (items with sub-items, e.g. guns)
        //this.traderHeper.addComplexItemsToTrader(tables, baseJson._id, jsonUtil);
        // Add trader to locale file, ensures trader text shows properly on screen
        // WARNING: adds the same text to ALL locales (e.g. chinese/french/english)
        this.traderHeper.addTraderToLocales(baseJson, tables, baseJson.name, "Artem", baseJson.nickname, baseJson.location, "[REDACTED]");
        this.logger.debug(`[${this.mod}] postDb Loaded`);
    }
}
module.exports = { mod: new ArtemTrader() };
