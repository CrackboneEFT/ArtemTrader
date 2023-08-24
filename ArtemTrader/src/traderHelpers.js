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
     * @param refreshTimeSeconds How many sections between trader stock refresh
     */
    setTraderUpdateTime(traderConfig, baseJson, refreshTimeSeconds) {
        // Add refresh time in seconds to config
        const traderRefreshRecord = {
            traderId: baseJson._id,
            seconds: refreshTimeSeconds
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
            assort: this.createAssortTable(),
            base: jsonUtil.deserialize(jsonUtil.serialize(traderDetailsToAdd)),
            questassort: {
                started: {},
                success: { "q_assort1": "ARTT_1" },
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
    createADART3() {
        const ADART3 = [];
        ADART3.push({
            _id: "ae2de7fd1d4b11289b82852b",
            _tpl: "5c07c60e0db834002330051f",
            upd: {
                Repairable: {
                    MaxDurability: 100,
                    Durability: 100
                },
                FireMode: {
                    FireMode: "single"
                }
            }
        });
        ADART3.push({
            _id: "c397e4d380aabae424602d8a",
            _tpl: "59db3acc86f7742a2c4ab912",
            parentId: "ae2de7fd1d4b11289b82852b",
            slotId: "mod_pistol_grip"
        });
        ADART3.push({
            _id: "c2eee74ea74ce17e5d8cc2ca",
            _tpl: "5aaa5dfee5b5b000140293d3",
            parentId: "ae2de7fd1d4b11289b82852b",
            slotId: "mod_magazine"
        });
        ADART3.push({
            _id: "34cc210f03c5af2efa432624",
            _tpl: "5d4405aaa4b9361e6a4e6bd3",
            parentId: "ae2de7fd1d4b11289b82852b",
            slotId: "mod_reciever"
        });
        ADART3.push({
            _id: "7d2fa0ba8772465223156b76",
            _tpl: "5d120a10d7ad1a4e1026ba85",
            parentId: "ae2de7fd1d4b11289b82852b",
            slotId: "mod_stock"
        });
        ADART3.push({
            _id: "4f3caadc7236fd9cb08ba845",
            _tpl: "5d44334ba4b9362b346d1948",
            parentId: "ae2de7fd1d4b11289b82852b",
            slotId: "mod_charge"
        });
        ADART3.push({
            _id: "be5f3cebb8dedbc441506d71",
            _tpl: "5a37ca54c4a282000d72296a",
            parentId: "34cc210f03c5af2efa432624",
            slotId: "mod_scope"
        });
        ADART3.push({
            _id: "6a9b501b3a19735dbb179958",
            _tpl: "55d3632e4bdc2d972f8b4569",
            parentId: "34cc210f03c5af2efa432624",
            slotId: "mod_barrel"
        });
        ADART3.push({
            _id: "7dc094f5068d4126ab56cd50",
            _tpl: "595cfa8b86f77427437e845b",
            parentId: "34cc210f03c5af2efa432624",
            slotId: "mod_handguard"
        });
        ADART3.push({
            _id: "7e9f5746129afce0b2fb706e",
            _tpl: "5fb6564947ce63734e3fa1da",
            parentId: "34cc210f03c5af2efa432624",
            slotId: "mod_sight_rear",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        ADART3.push({
            _id: "5cb9e37e477cbffa54239b45",
            _tpl: "5d120a28d7ad1a1c8962e295",
            parentId: "7d2fa0ba8772465223156b76",
            slotId: "mod_stock"
        });
        ADART3.push({
            _id: "36322886040f52120f13d165",
            _tpl: "5b2388675acfc4771e1be0be",
            parentId: "be5f3cebb8dedbc441506d71",
            slotId: "mod_scope_000",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        ADART3.push({
            _id: "c24d4c001dea6c4be259b2eb",
            _tpl: "58d268fc86f774111273f8c2",
            parentId: "be5f3cebb8dedbc441506d71",
            slotId: "mod_scope_001",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        ADART3.push({
            _id: "99af9dc3037983cc1b26d584",
            _tpl: "56ea8180d2720bf2698b456a",
            parentId: "6a9b501b3a19735dbb179958",
            slotId: "mod_muzzle"
        });
        ADART3.push({
            _id: "b496708606cceb71884a0149",
            _tpl: "5d00ec68d7ad1a04a067e5be",
            parentId: "6a9b501b3a19735dbb179958",
            slotId: "mod_gas_block"
        });
        ADART3.push({
            _id: "5d873203c13f085764e1541c",
            _tpl: "59e0bed186f774156f04ce84",
            parentId: "7dc094f5068d4126ab56cd50",
            slotId: "mod_mount_000"
        });
        ADART3.push({
            _id: "0fd05bed5265fab8e865aed4",
            _tpl: "59e0bdb186f774156f04ce82",
            parentId: "7dc094f5068d4126ab56cd50",
            slotId: "mod_mount_002"
        });
        ADART3.push({
            _id: "33216724762180581887862a",
            _tpl: "59e0bdb186f774156f04ce82",
            parentId: "7dc094f5068d4126ab56cd50",
            slotId: "mod_mount_004"
        });
        ADART3.push({
            _id: "56d7c52da5c1154ef6153437",
            _tpl: "5fb6567747ce63734e3fa1dc",
            parentId: "7dc094f5068d4126ab56cd50",
            slotId: "mod_sight_front",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        ADART3.push({
            _id: "735cb88d4fc405f5a72fd421",
            _tpl: "57da93632459771cb65bf83f",
            parentId: "99af9dc3037983cc1b26d584",
            slotId: "mod_muzzle"
        });
        ADART3.push({
            _id: "6c7f8cfd474ddccf22c2d247",
            _tpl: "59f8a37386f7747af3328f06",
            parentId: "5d873203c13f085764e1541c",
            slotId: "mod_foregrip"
        });
        ADART3.push({
            _id: "12d51e22bffeefb6afd52143",
            _tpl: "5cc9c20cd7f00c001336c65d",
            parentId: "0fd05bed5265fab8e865aed4",
            slotId: "mod_tactical",
            upd: {
                Light: {
                    IsActive: true,
                    SelectedMode: 0
                }
            }
        });
        ADART3.push({
            _id: "4d560a389f7d533a3d3173b2",
            _tpl: "57d17e212459775a1179a0f5",
            parentId: "33216724762180581887862a",
            slotId: "mod_tactical"
        });
        ADART3.push({
            _id: "eadf783358c5b1f5e42632a9",
            _tpl: "59d790f486f77403cb06aec6",
            parentId: "4d560a389f7d533a3d3173b2",
            slotId: "mod_flashlight",
            upd: {
                Light: {
                    IsActive: true,
                    SelectedMode: 0
                }
            }
        });
        return ADART3;
    }
    createAKTIER3() {
        const AKTIER3 = [];
        AKTIER3.push({
            _id: "4aa993ccf437b77c81c1cdc3",
            _tpl: "5644bd2b4bdc2d3b4c8b4572",
            upd: {
                Repairable: {
                    MaxDurability: 100,
                    Durability: 100
                },
                FireMode: {
                    FireMode: "single"
                }
            }
        });
        AKTIER3.push({
            _id: "98f811e87e6f065f400237c2",
            _tpl: "59c6633186f7740cf0493bb9",
            parentId: "4aa993ccf437b77c81c1cdc3",
            slotId: "mod_gas_block"
        });
        AKTIER3.push({
            _id: "4a82b3545571b5595259b6db",
            _tpl: "5f633f791b231926f2329f13",
            parentId: "4aa993ccf437b77c81c1cdc3",
            slotId: "mod_muzzle"
        });
        AKTIER3.push({
            _id: "e9e46dfe5e377e11e5f2b0bf",
            _tpl: "5947f92f86f77427344a76b1",
            parentId: "4aa993ccf437b77c81c1cdc3",
            slotId: "mod_pistol_grip"
        });
        AKTIER3.push({
            _id: "489519d21a7683130e422772",
            _tpl: "5d2c76ed48f03532f2136169",
            parentId: "4aa993ccf437b77c81c1cdc3",
            slotId: "mod_reciever"
        });
        AKTIER3.push({
            _id: "7d1e65a6bbef9e2f95dbdcb2",
            _tpl: "5b0e794b5acfc47a877359b2",
            parentId: "4aa993ccf437b77c81c1cdc3",
            slotId: "mod_stock"
        });
        AKTIER3.push({
            _id: "832f34c9bb3a6e425d9abeec",
            _tpl: "5aaa4194e5b5b055d06310a5",
            parentId: "4aa993ccf437b77c81c1cdc3",
            slotId: "mod_magazine"
        });
        AKTIER3.push({
            _id: "419f88613d698318c9e2881c",
            _tpl: "6130ca3fd92c473c77020dbd",
            parentId: "4aa993ccf437b77c81c1cdc3",
            slotId: "mod_charge"
        });
        AKTIER3.push({
            _id: "6e3ab87015dacd832d920550",
            _tpl: "5c17664f2e2216398b5a7e3c",
            parentId: "98f811e87e6f065f400237c2",
            slotId: "mod_handguard"
        });
        AKTIER3.push({
            _id: "cc5afdf4b7d475ea1e6af6f7",
            _tpl: "584924ec24597768f12ae244",
            parentId: "489519d21a7683130e422772",
            slotId: "mod_scope",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [0],
                    ScopesSelectedModes: [0],
                    SelectedScope: 0
                }
            }
        });
        AKTIER3.push({
            _id: "35fc151e31d46eae1268928b",
            _tpl: "59e0bed186f774156f04ce84",
            parentId: "6e3ab87015dacd832d920550",
            slotId: "mod_mount_000"
        });
        AKTIER3.push({
            _id: "5f2f6ccf3a7c630f2039ab10",
            _tpl: "5a9d6d00a2750c5c985b5305",
            parentId: "6e3ab87015dacd832d920550",
            slotId: "mod_mount_003"
        });
        AKTIER3.push({
            _id: "27ccc642fd1fb5421d00ed71",
            _tpl: "5b057b4f5acfc4771e1bd3e9",
            parentId: "35fc151e31d46eae1268928b",
            slotId: "mod_foregrip"
        });
        AKTIER3.push({
            _id: "e4a6c7b3362557d180dcb675",
            _tpl: "56def37dd2720bec348b456a",
            parentId: "5f2f6ccf3a7c630f2039ab10",
            slotId: "mod_tactical",
            upd: {
                Light: {
                    IsActive: true,
                    SelectedMode: 0
                }
            }
        });
        return AKTIER3;
    }
    createBARTERM4T1() {
        const BARTERM4T1 = [];
        BARTERM4T1.push({
            _id: "50af1f64fd268abf5e4e4540",
            _tpl: "5447a9cd4bdc2dbd208b4567",
            upd: {
                Repairable: {
                    MaxDurability: 100,
                    Durability: 100
                },
                FireMode: {
                    FireMode: "single"
                }
            }
        });
        BARTERM4T1.push({
            _id: "4634b00e645318325658f223",
            _tpl: "571659bb2459771fb2755a12",
            parentId: "50af1f64fd268abf5e4e4540",
            slotId: "mod_pistol_grip"
        });
        BARTERM4T1.push({
            _id: "80b70e60a9a8ac3408453480",
            _tpl: "5d1340b3d7ad1a0b52682ed7",
            parentId: "50af1f64fd268abf5e4e4540",
            slotId: "mod_magazine"
        });
        BARTERM4T1.push({
            _id: "3b815371bbbb938060485f6d",
            _tpl: "55d355e64bdc2d962f8b4569",
            parentId: "50af1f64fd268abf5e4e4540",
            slotId: "mod_reciever"
        });
        BARTERM4T1.push({
            _id: "45556ac340ad3ccaf58ab964",
            _tpl: "5649be884bdc2d79388b4577",
            parentId: "50af1f64fd268abf5e4e4540",
            slotId: "mod_stock"
        });
        BARTERM4T1.push({
            _id: "7042d981cb505034975f4c4b",
            _tpl: "55d44fd14bdc2d962f8b456e",
            parentId: "50af1f64fd268abf5e4e4540",
            slotId: "mod_charge"
        });
        BARTERM4T1.push({
            _id: "2149a7e1087a707aa2b7975d",
            _tpl: "59e690b686f7746c9f75e848",
            parentId: "50af1f64fd268abf5e4e4540",
            slotId: "patron_in_weapon"
        });
        BARTERM4T1.push({
            _id: "c339b9f8ddc80ad7c413ec76",
            _tpl: "59e690b686f7746c9f75e848",
            parentId: "80b70e60a9a8ac3408453480",
            slotId: "cartridges",
            location: 0,
            upd: {
                StackObjectsCount: 28
            }
        });
        BARTERM4T1.push({
            _id: "f173d7b3ba28de7aceaa9868",
            _tpl: "59e690b686f7746c9f75e848",
            parentId: "80b70e60a9a8ac3408453480",
            slotId: "cartridges",
            location: 1
        });
        BARTERM4T1.push({
            _id: "1909cd6a6c232b3b7f7f282e",
            _tpl: "5c0a2cec0db834001b7ce47d",
            parentId: "3b815371bbbb938060485f6d",
            slotId: "mod_scope",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        1
                    ],
                    SelectedScope: 0
                }
            }
        });
        BARTERM4T1.push({
            _id: "80949a3ae9e982b1a5ee7585",
            _tpl: "55d35ee94bdc2d61338b4568",
            parentId: "3b815371bbbb938060485f6d",
            slotId: "mod_barrel"
        });
        BARTERM4T1.push({
            _id: "058ea144f7b37a76f9050460",
            _tpl: "55d459824bdc2d892f8b4573",
            parentId: "3b815371bbbb938060485f6d",
            slotId: "mod_handguard"
        });
        BARTERM4T1.push({
            _id: "49f765030e3aa7dd8f5f2455",
            _tpl: "5c1780312e221602b66cc189",
            parentId: "3b815371bbbb938060485f6d",
            slotId: "mod_sight_rear",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        BARTERM4T1.push({
            _id: "76b7131ff3a9803863e12d60",
            _tpl: "5947c73886f7747701588af5",
            parentId: "45556ac340ad3ccaf58ab964",
            slotId: "mod_stock_000"
        });
        BARTERM4T1.push({
            _id: "b3f53144c40bfbe6a4f9e037",
            _tpl: "5ea172e498dacb342978818e",
            parentId: "80949a3ae9e982b1a5ee7585",
            slotId: "mod_muzzle"
        });
        BARTERM4T1.push({
            _id: "14b28bb327227b5d7b23c807",
            _tpl: "5ae30e795acfc408fb139a0b",
            parentId: "80949a3ae9e982b1a5ee7585",
            slotId: "mod_gas_block"
        });
        BARTERM4T1.push({
            _id: "55f246c5bda82ef76bc7172c",
            _tpl: "637f57b78d137b27f70c496a",
            parentId: "058ea144f7b37a76f9050460",
            slotId: "mod_handguard"
        });
        BARTERM4T1.push({
            _id: "1f19ff080405f9f70e92ece1",
            _tpl: "5ea17bbc09aa976f2e7a51cd",
            parentId: "b3f53144c40bfbe6a4f9e037",
            slotId: "mod_muzzle"
        });
        BARTERM4T1.push({
            _id: "14e0b38b61edcd18f53ad15e",
            _tpl: "58c157be86f77403c74b2bb6",
            parentId: "55f246c5bda82ef76bc7172c",
            slotId: "mod_foregrip"
        });
        return BARTERM4T1;
    }
    createASVALTIER3() {
        const ASVALTIER3 = [];
        ASVALTIER3.push({
            _id: "ba6cfe5826c31f09f39e6f14",
            _tpl: "57c44b372459772d2b39b8ce",
            upd: {
                Repairable: {
                    MaxDurability: 100,
                    Durability: 100
                },
                Foldable: {
                    Folded: false
                },
                FireMode: {
                    FireMode: "fullauto"
                }
            }
        });
        ASVALTIER3.push({
            _id: "20d662cacb96d2d22ccb77b4",
            _tpl: "57c44dd02459772d2e0ae249",
            parentId: "ba6cfe5826c31f09f39e6f14",
            slotId: "mod_muzzle"
        });
        ASVALTIER3.push({
            _id: "74951a35b315232ee5f3a0b6",
            _tpl: "57c44f4f2459772d2c627113",
            parentId: "ba6cfe5826c31f09f39e6f14",
            slotId: "mod_reciever"
        });
        ASVALTIER3.push({
            _id: "c10d1fe4aa4520a7bafcc76d",
            _tpl: "57838f9f2459774a150289a0",
            parentId: "ba6cfe5826c31f09f39e6f14",
            slotId: "mod_magazine"
        });
        ASVALTIER3.push({
            _id: "d8ed98e5422c9e04525923e2",
            _tpl: "5a69a2ed8dc32e000d46d1f1",
            parentId: "ba6cfe5826c31f09f39e6f14",
            slotId: "mod_pistol_grip"
        });
        ASVALTIER3.push({
            _id: "14c19de4bda2b6688248894c",
            _tpl: "6130ca3fd92c473c77020dbd",
            parentId: "ba6cfe5826c31f09f39e6f14",
            slotId: "mod_charge"
        });
        ASVALTIER3.push({
            _id: "090f25ec003e7a53f19cc1b3",
            _tpl: "5dff8db859400025ea5150d4",
            parentId: "ba6cfe5826c31f09f39e6f14",
            slotId: "mod_mount_000"
        });
        ASVALTIER3.push({
            _id: "7ef2f5c58a08765b9f4c3da9",
            _tpl: "57a0e5022459774d1673f889",
            parentId: "ba6cfe5826c31f09f39e6f14",
            slotId: "patron_in_weapon",
            upd: {
                SpawnedInSession: true
            }
        });
        ASVALTIER3.push({
            _id: "dd7c13405561003e048c1f89",
            _tpl: "57c44e7b2459772d28133248",
            parentId: "20d662cacb96d2d22ccb77b4",
            slotId: "mod_sight_rear",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [0],
                    ScopesSelectedModes: [0],
                    SelectedScope: 0
                }
            }
        });
        ASVALTIER3.push({
            _id: "73c6b0b74e4b624f0bc563e1",
            _tpl: "59eb7ebe86f7740b373438ce",
            parentId: "20d662cacb96d2d22ccb77b4",
            slotId: "mod_mount_000"
        });
        ASVALTIER3.push({
            _id: "a1151c91b4b1cd3c89d3da1c",
            _tpl: "57a0e5022459774d1673f889",
            parentId: "c10d1fe4aa4520a7bafcc76d",
            slotId: "cartridges",
            location: 0,
            upd: {
                StackObjectsCount: 18
            }
        });
        ASVALTIER3.push({
            _id: "f80be876ce74a4e3648a48ed",
            _tpl: "57a0e5022459774d1673f889",
            parentId: "c10d1fe4aa4520a7bafcc76d",
            slotId: "cartridges",
            location: 1,
            upd: {
                SpawnedInSession: true
            }
        });
        ASVALTIER3.push({
            _id: "abe98f44c9d7fbee20f3627b",
            _tpl: "5d44069ca4b9361ebd26fc37",
            parentId: "d8ed98e5422c9e04525923e2",
            slotId: "mod_stock_000"
        });
        ASVALTIER3.push({
            _id: "75158fbc131b76c21ed41367",
            _tpl: "58d2664f86f7747fec5834f6",
            parentId: "090f25ec003e7a53f19cc1b3",
            slotId: "mod_scope"
        });
        ASVALTIER3.push({
            _id: "85bd728fa2849c518cca908d",
            _tpl: "56def37dd2720bec348b456a",
            parentId: "73c6b0b74e4b624f0bc563e1",
            slotId: "mod_tactical_001",
            upd: {
                Light: {
                    IsActive: true,
                    SelectedMode: 0
                }
            }
        });
        ASVALTIER3.push({
            _id: "bae36cfd6573cb61318f39dc",
            _tpl: "5b057b4f5acfc4771e1bd3e9",
            parentId: "73c6b0b74e4b624f0bc563e1",
            slotId: "mod_foregrip"
        });
        ASVALTIER3.push({
            _id: "ba57bbe2d58a417b8dcff956",
            _tpl: "58d268fc86f774111273f8c2",
            parentId: "75158fbc131b76c21ed41367",
            slotId: "mod_scope",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [0],
                    ScopesSelectedModes: [0],
                    SelectedScope: 0
                }
            }
        });
        return ASVALTIER3;
    }
    createP90Rogue() {
        const P90Rogue = [];
        P90Rogue.push({
            _id: "37914200154ab19931c5871a",
            _tpl: "5cc82d76e24e8d00134b4b83",
            upd: {
                Repairable: {
                    MaxDurability: 100,
                    Durability: 100
                },
                FireMode: {
                    FireMode: "fullauto"
                }
            }
        });
        P90Rogue.push({
            _id: "e462d3c120acc42b36982270",
            _tpl: "5cc70093e4a949033c734312",
            parentId: "37914200154ab19931c5871a",
            slotId: "mod_magazine"
        });
        P90Rogue.push({
            _id: "8175c1c5175eb023a8f1bb67",
            _tpl: "5cebec10d7f00c065703d185",
            parentId: "37914200154ab19931c5871a",
            slotId: "mod_stock"
        });
        P90Rogue.push({
            _id: "b9b0ba8f92a5dadbc9f26b2f",
            _tpl: "5cc70102e4a949035e43ba74",
            parentId: "37914200154ab19931c5871a",
            slotId: "mod_reciever"
        });
        P90Rogue.push({
            _id: "6840041accf107e4e2ece02c",
            _tpl: "5cc701aae4a949000e1ea45c",
            parentId: "37914200154ab19931c5871a",
            slotId: "mod_barrel"
        });
        P90Rogue.push({
            _id: "e566c788161b5e9e28eed142",
            _tpl: "5cc6ea78e4a949000e1ea3c1",
            parentId: "37914200154ab19931c5871a",
            slotId: "mod_charge"
        });
        P90Rogue.push({
            _id: "5a241867b97d2c1fbd6029de",
            _tpl: "5cc700cae4a949035e43ba72",
            parentId: "8175c1c5175eb023a8f1bb67",
            slotId: "mod_stock_000"
        });
        P90Rogue.push({
            _id: "424026ff20906c6de2ff82a7",
            _tpl: "5cc7015ae4a949001152b4c6",
            parentId: "b9b0ba8f92a5dadbc9f26b2f",
            slotId: "mod_mount_000"
        });
        P90Rogue.push({
            _id: "9333b047c40b3ac72418d969",
            _tpl: "5cc70146e4a949000d73bf6b",
            parentId: "b9b0ba8f92a5dadbc9f26b2f",
            slotId: "mod_mount_001"
        });
        P90Rogue.push({
            _id: "75963237bbf705f5a42460a4",
            _tpl: "5cc70146e4a949000d73bf6b",
            parentId: "b9b0ba8f92a5dadbc9f26b2f",
            slotId: "mod_mount_002"
        });
        P90Rogue.push({
            _id: "a2d0c9614f6aa4e13aa8bf94",
            _tpl: "5cc82796e24e8d000f5859a8",
            parentId: "6840041accf107e4e2ece02c",
            slotId: "mod_muzzle"
        });
        P90Rogue.push({
            _id: "bea2048cd1747877b1ebdff2",
            _tpl: "584924ec24597768f12ae244",
            parentId: "424026ff20906c6de2ff82a7",
            slotId: "mod_scope",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        P90Rogue.push({
            _id: "252fc211237b0e008f4dc5cd",
            _tpl: "5cebec00d7f00c065c53522a",
            parentId: "a2d0c9614f6aa4e13aa8bf94",
            slotId: "mod_muzzle"
        });
        return P90Rogue;
    }
    createM4T2() {
        const M4T2 = [];
        M4T2.push({
            _id: "a65f0d13f00c645bf5bf732f",
            _tpl: "5447a9cd4bdc2dbd208b4567",
            upd: {
                Repairable: {
                    MaxDurability: 100,
                    Durability: 100
                },
                FireMode: {
                    FireMode: "single"
                }
            }
        });
        M4T2.push({
            _id: "1ef13e8864a9d57aa737449f",
            _tpl: "55d4b9964bdc2d1d4e8b456e",
            parentId: "a65f0d13f00c645bf5bf732f",
            slotId: "mod_pistol_grip"
        });
        M4T2.push({
            _id: "32d92c323942c0ce97f46c70",
            _tpl: "55802d5f4bdc2dac148b458e",
            parentId: "a65f0d13f00c645bf5bf732f",
            slotId: "mod_magazine"
        });
        M4T2.push({
            _id: "8ec407b5e0128c93eac125c0",
            _tpl: "55d355e64bdc2d962f8b4569",
            parentId: "a65f0d13f00c645bf5bf732f",
            slotId: "mod_reciever"
        });
        M4T2.push({
            _id: "0f71f533942aa6be43d7ea84",
            _tpl: "5649be884bdc2d79388b4577",
            parentId: "a65f0d13f00c645bf5bf732f",
            slotId: "mod_stock"
        });
        M4T2.push({
            _id: "1d1918393a591566ab214759",
            _tpl: "5ea16d4d5aad6446a939753d",
            parentId: "a65f0d13f00c645bf5bf732f",
            slotId: "mod_charge"
        });
        M4T2.push({
            _id: "711cdb7a792a786d55ac7d8a",
            _tpl: "59e690b686f7746c9f75e848",
            parentId: "a65f0d13f00c645bf5bf732f",
            slotId: "patron_in_weapon"
        });
        M4T2.push({
            _id: "b9b78439dcba0fb0a1c0d945",
            _tpl: "59e690b686f7746c9f75e848",
            parentId: "32d92c323942c0ce97f46c70",
            slotId: "cartridges",
            location: 0,
            upd: {
                StackObjectsCount: 29
            }
        });
        M4T2.push({
            _id: "31ec03664532ea1e4e96caf2",
            _tpl: "570fd721d2720bc5458b4596",
            parentId: "8ec407b5e0128c93eac125c0",
            slotId: "mod_scope",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        M4T2.push({
            _id: "59ef38bb25a5956ced8a7827",
            _tpl: "55d35ee94bdc2d61338b4568",
            parentId: "8ec407b5e0128c93eac125c0",
            slotId: "mod_barrel"
        });
        M4T2.push({
            _id: "efe44c5eec02519e6c2cafac",
            _tpl: "55d459824bdc2d892f8b4573",
            parentId: "8ec407b5e0128c93eac125c0",
            slotId: "mod_handguard"
        });
        M4T2.push({
            _id: "de7791860ab534653dd9eb39",
            _tpl: "628a85ee6b1d481ff772e9d5",
            parentId: "0f71f533942aa6be43d7ea84",
            slotId: "mod_stock_000"
        });
        M4T2.push({
            _id: "a99cea2ef79a8103d7669fdb",
            _tpl: "56ea8180d2720bf2698b456a",
            parentId: "59ef38bb25a5956ced8a7827",
            slotId: "mod_muzzle"
        });
        M4T2.push({
            _id: "0be7549ebaa208b58c87268d",
            _tpl: "5ae30e795acfc408fb139a0b",
            parentId: "59ef38bb25a5956ced8a7827",
            slotId: "mod_gas_block"
        });
        M4T2.push({
            _id: "1838eba3334fc5ffd8a37830",
            _tpl: "637f57b78d137b27f70c496a",
            parentId: "efe44c5eec02519e6c2cafac",
            slotId: "mod_handguard"
        });
        M4T2.push({
            _id: "356378b6d8e059a414aa5ea4",
            _tpl: "57da93632459771cb65bf83f",
            parentId: "a99cea2ef79a8103d7669fdb",
            slotId: "mod_muzzle"
        });
        return M4T2;
    }
    createPPT1() {
        const PPT1 = [];
        PPT1.push({
            _id: "dc7718dc8eb42a9b194dcb36",
            _tpl: "59984ab886f7743e98271174",
            upd: {
                SpawnedInSession: true,
                Repairable: {
                    MaxDurability: 79.4312,
                    Durability: 66.2596741
                },
                Foldable: {
                    Folded: false
                },
                FireMode: {
                    FireMode: "fullauto"
                }
            }
        });
        PPT1.push({
            _id: "54291806f98d1c81960ef5f5",
            _tpl: "5649ae4a4bdc2d1b2b8b4588",
            parentId: "dc7718dc8eb42a9b194dcb36",
            slotId: "mod_pistol_grip"
        });
        PPT1.push({
            _id: "aeb7e1ef3052b15c6b6c4300",
            _tpl: "5ac78eaf5acfc4001926317a",
            parentId: "dc7718dc8eb42a9b194dcb36",
            slotId: "mod_stock"
        });
        PPT1.push({
            _id: "af2243b2dc20dec408249198",
            _tpl: "599860ac86f77436b225ed1a",
            parentId: "dc7718dc8eb42a9b194dcb36",
            slotId: "mod_magazine"
        });
        PPT1.push({
            _id: "ccb5900f38331ab4bbccefc2",
            _tpl: "59bfc5c886f7743bf6794e62",
            parentId: "dc7718dc8eb42a9b194dcb36",
            slotId: "mod_muzzle"
        });
        PPT1.push({
            _id: "d62e32392f8a1a1a5ac78f54",
            _tpl: "59985a6c86f77414ec448d17",
            parentId: "dc7718dc8eb42a9b194dcb36",
            slotId: "mod_reciever"
        });
        PPT1.push({
            _id: "055d857e9890a48f30fbb5e6",
            _tpl: "599860e986f7743bb57573a6",
            parentId: "dc7718dc8eb42a9b194dcb36",
            slotId: "mod_sight_rear",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        PPT1.push({
            _id: "39b77e201b815b5fc43c997b",
            _tpl: "59ccd11386f77428f24a488f",
            parentId: "dc7718dc8eb42a9b194dcb36",
            slotId: "mod_gas_block"
        });
        PPT1.push({
            _id: "f92c8030a70ce8818238a7b9",
            _tpl: "5efb0da7a29a85116f6ea05f",
            parentId: "dc7718dc8eb42a9b194dcb36",
            slotId: "patron_in_weapon"
        });
        PPT1.push({
            _id: "d089625869a027ba2fb0e3b6",
            _tpl: "59ecc3dd86f7746dc827481c",
            parentId: "aeb7e1ef3052b15c6b6c4300",
            slotId: "mod_stock"
        });
        PPT1.push({
            _id: "c424ac282794b3855142f61f",
            _tpl: "5efb0da7a29a85116f6ea05f",
            parentId: "af2243b2dc20dec408249198",
            slotId: "cartridges",
            location: 0,
            upd: {
                StackObjectsCount: 28
            }
        });
        PPT1.push({
            _id: "7a05a8be636901e776facb7f",
            _tpl: "5efb0da7a29a85116f6ea05f",
            parentId: "af2243b2dc20dec408249198",
            slotId: "cartridges",
            location: 1
        });
        PPT1.push({
            _id: "eccede6fc13f15b7b1611bf2",
            _tpl: "570fd6c2d2720bc6458b457f",
            parentId: "d62e32392f8a1a1a5ac78f54",
            slotId: "mod_scope",
            upd: {
                Sight: {
                    ScopesCurrentCalibPointIndexes: [
                        0
                    ],
                    ScopesSelectedModes: [
                        0
                    ],
                    SelectedScope: 0
                }
            }
        });
        PPT1.push({
            _id: "4e7b37509aabc418847d807e",
            _tpl: "5648b4534bdc2d3d1c8b4580",
            parentId: "39b77e201b815b5fc43c997b",
            slotId: "mod_handguard"
        });
        PPT1.push({
            _id: "757084384c82940a4c34a719",
            _tpl: "591af28e86f77414a27a9e1d",
            parentId: "4e7b37509aabc418847d807e",
            slotId: "mod_foregrip"
        });
        return PPT1;
    }
    ;
    createSCARLT2() {
        const SCARLT2 = [];
        {
            SCARLT2.push({
                _id: "333c175d9462f496188c3ea1",
                _tpl: "618428466ef05c2ce828f218",
                upd: {
                    SpawnedInSession: true,
                    Repairable: {
                        MaxDurability: 100,
                        Durability: 100
                    },
                    Foldable: {
                        Folded: false
                    },
                    FireMode: {
                        FireMode: "fullauto"
                    }
                }
            });
            SCARLT2.push({
                _id: "1685f183436ba1729a5184bc",
                _tpl: "571659bb2459771fb2755a12",
                parentId: "333c175d9462f496188c3ea1",
                slotId: "mod_pistol_grip",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "2a9394f46e42200af0f861c1",
                _tpl: "61840d85568c120fdd2962a5",
                parentId: "333c175d9462f496188c3ea1",
                slotId: "mod_magazine",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "22a97e8352426b51d0eca7f9",
                _tpl: "618426d96c780c1e710c9b9f",
                parentId: "333c175d9462f496188c3ea1",
                slotId: "mod_reciever",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "ec31718de697fe45534d464e",
                _tpl: "61825d06d92c473c770215de",
                parentId: "333c175d9462f496188c3ea1",
                slotId: "mod_stock",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "f30ba20be49d51f46ae65317",
                _tpl: "6181688c6c780c1e710c9b04",
                parentId: "333c175d9462f496188c3ea1",
                slotId: "mod_charge",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "bd91acc5747fb9299195a9ef",
                _tpl: "59e690b686f7746c9f75e848",
                parentId: "333c175d9462f496188c3ea1",
                slotId: "patron_in_weapon",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "8f3809bb70ef62a57abd53c5",
                _tpl: "59e690b686f7746c9f75e848",
                parentId: "2a9394f46e42200af0f861c1",
                slotId: "cartridges",
                location: 0,
                upd: {
                    StackObjectsCount: 28,
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "7083cb6559656cc8b6fb815d",
                _tpl: "59e690b686f7746c9f75e848",
                parentId: "2a9394f46e42200af0f861c1",
                slotId: "cartridges",
                location: 1,
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "c6c6fad444336b84b47dc653",
                _tpl: "558022b54bdc2dac148b458d",
                parentId: "22a97e8352426b51d0eca7f9",
                slotId: "mod_scope",
                upd: {
                    SpawnedInSession: true,
                    Sight: {
                        ScopesCurrentCalibPointIndexes: [
                            0
                        ],
                        ScopesSelectedModes: [
                            0
                        ],
                        SelectedScope: 0
                    }
                }
            });
            SCARLT2.push({
                _id: "7d13b4a384ffb568ab23ef16",
                _tpl: "6183fc15d3a39d50044c13e9",
                parentId: "22a97e8352426b51d0eca7f9",
                slotId: "mod_barrel",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "4251742d34bf13fd7c2ea092",
                _tpl: "61817865d3a39d50044c13a4",
                parentId: "22a97e8352426b51d0eca7f9",
                slotId: "mod_sight_rear",
                upd: {
                    SpawnedInSession: true,
                    Sight: {
                        ScopesCurrentCalibPointIndexes: [
                            0
                        ],
                        ScopesSelectedModes: [
                            0
                        ],
                        SelectedScope: 0
                    }
                }
            });
            SCARLT2.push({
                _id: "716960293aa3052f25ba3bee",
                _tpl: "61816df1d3a39d50044c139e",
                parentId: "22a97e8352426b51d0eca7f9",
                slotId: "mod_mount_000",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "16bb315e89cb96e6edc2fc96",
                _tpl: "61816dfa6ef05c2ce828f1ad",
                parentId: "22a97e8352426b51d0eca7f9",
                slotId: "mod_mount_001",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "a80df4101872b50153dd7f11",
                _tpl: "61825d136ef05c2ce828f1cc",
                parentId: "ec31718de697fe45534d464e",
                slotId: "mod_stock_001",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "73e918e736ddf31548e30ec0",
                _tpl: "61825d24d3a39d50044c13af",
                parentId: "ec31718de697fe45534d464e",
                slotId: "mod_stock_002",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "e82d52098c01651575c2e786",
                _tpl: "609269c3b0e443224b421cc1",
                parentId: "7d13b4a384ffb568ab23ef16",
                slotId: "mod_muzzle",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "199526a59799a05921d3df4c",
                _tpl: "61816fcad92c473c770215cc",
                parentId: "7d13b4a384ffb568ab23ef16",
                slotId: "mod_sight_front",
                upd: {
                    SpawnedInSession: true,
                    Sight: {
                        ScopesCurrentCalibPointIndexes: [
                            0
                        ],
                        ScopesSelectedModes: [
                            0
                        ],
                        SelectedScope: 0
                    }
                }
            });
            SCARLT2.push({
                _id: "46ab9cc9aa0ab707966f51a8",
                _tpl: "58c157be86f77403c74b2bb6",
                parentId: "716960293aa3052f25ba3bee",
                slotId: "mod_foregrip",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "ef79b168076da38302dd56af",
                _tpl: "60926df0132d4d12c81fd9df",
                parentId: "e82d52098c01651575c2e786",
                slotId: "mod_muzzle",
                upd: {
                    SpawnedInSession: true
                }
            });
            SCARLT2.push({
                _id: "02d1a057f9d910b60301ede2",
                _tpl: "618167616ef05c2ce828f1a8",
                parentId: "a80df4101872b50153dd7f11",
                slotId: "mod_stock",
                upd: {
                    SpawnedInSession: true
                }
            });
            return SCARLT2;
        }
        ;
        {
            const databaseServer = container.resolve("DatabaseServer");
            const databaseTables = databaseServer.getTables();
            databaseTables.globals["QuestZones"].push({
                zoneId: "Gaytest",
                zoneName: "Gaytest",
                zoneType: "Visit",
                zoneLocation: "bigmap",
                position: {
                    x: "174.2927",
                    y: "2.8297",
                    z: "173.2282"
                },
                rotation: {
                    x: "0",
                    y: "0",
                    z: "0"
                },
                scale: {
                    x: "2.3",
                    y: "0.9",
                    z: "2.7"
                }
            });
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
