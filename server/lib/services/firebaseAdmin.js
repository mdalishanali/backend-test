"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseService = void 0;
// fiebase admin sdk
var admin = require("firebase-admin");
var app_1 = require("firebase/app");
require("firebase/auth");
var status = require("http-status");
var StandardError = require("standard-error");
var config_1 = require("../config");
var environment = 'production';
// firebase admin initialization
var firebaseConfig = {
    type: config_1.config.FIREBASE_ADMIN_TYPE,
    project_id: config_1.config.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: config_1.config.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: config_1.config.FIREBASE_ADMIN_PRIVATE_KEY,
    client_email: config_1.config.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: config_1.config.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: config_1.config.FIREBASE_ADMIN_AUTH_URI,
    token_uri: config_1.config.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url: config_1.config.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: config_1.config.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
};
var adminAccountConfig = firebaseConfig;
admin.initializeApp({
    credential: admin.credential.cert(adminAccountConfig)
});
// firebase initialization
var firebaseUserConfig = {
    apiKey: config_1.config.FIREBASE_USER_API_KEY,
    authDomain: config_1.config.FIREBASE_USER_AUTH_DOMAIN,
    projectId: config_1.config.FIREBASE_USER_PROJECT_ID,
    storageBucket: config_1.config.FIREBASE_USER_STROAGE_BUCKET,
    messagingSenderId: config_1.config.FIREBASE_USER_MESSAGING_SENDER_ID,
    appId: config_1.config.FIREBASE_USER_APP_ID
};
app_1.default.initializeApp(firebaseUserConfig);
var auth = app_1.default.auth();
var FirebaseAdminService = /** @class */ (function () {
    function FirebaseAdminService() {
        var _this = this;
        this.createUser = function (name, email, password) { return __awaiter(_this, void 0, void 0, function () {
            var firebaseUser, firebaseAuthUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        firebaseUser = {
                            displayName: name.first + " " + name.last,
                            email: email,
                            password: password,
                            emailVerified: false,
                        };
                        return [4 /*yield*/, admin.auth().createUser(firebaseUser)];
                    case 1:
                        firebaseAuthUser = _a.sent();
                        return [2 /*return*/, firebaseAuthUser];
                    case 2:
                        err_1 = _a.sent();
                        throw new StandardError({ message: err_1.message, code: status.CONFLICT });
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createCustomToken = function (uid) { return __awaiter(_this, void 0, void 0, function () {
            var token, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, admin.auth().createCustomToken(uid)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                    case 2:
                        err_2 = _a.sent();
                        throw new StandardError({ message: err_2.message, code: status.CONFLICT });
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifyIdToken = function (idToken) { return __awaiter(_this, void 0, void 0, function () {
            var firebaseUser, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, admin.auth().verifyIdToken(idToken)];
                    case 1:
                        firebaseUser = _a.sent();
                        return [2 /*return*/, firebaseUser];
                    case 2:
                        err_3 = _a.sent();
                        throw new StandardError({ message: err_3.message, code: status.CONFLICT });
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.signInUser = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
            var firebaseUser, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, auth.signInWithEmailAndPassword(email, password)];
                    case 1:
                        firebaseUser = _a.sent();
                        return [2 /*return*/, firebaseUser];
                    case 2:
                        err_4 = _a.sent();
                        throw new StandardError({ message: err_4.message, code: status.CONFLICT });
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateUserPassword = function (uid, password) { return __awaiter(_this, void 0, void 0, function () {
            var firebaseUser, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, admin.auth().updateUser(uid, { password: password })];
                    case 1:
                        firebaseUser = _a.sent();
                        return [2 /*return*/, firebaseUser];
                    case 2:
                        err_5 = _a.sent();
                        throw new StandardError({ message: err_5.message, code: status.CONFLICT });
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteUser = function (uid) { return __awaiter(_this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, admin.auth().deleteUser(uid)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'user deleted' }];
                    case 2:
                        err_6 = _a.sent();
                        throw new StandardError({ message: err_6.message, code: status.CONFLICT });
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.sendPushNotifications = function (_a) {
            var tokens = _a.tokens, title = _a.title, body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var message, err_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            message = { notification: { title: title, body: body } };
                            return [4 /*yield*/, admin.messaging().sendToDevice(tokens, message)];
                        case 1: return [2 /*return*/, _b.sent()];
                        case 2:
                            err_7 = _b.sent();
                            throw new StandardError({ message: err_7.message, code: status.CONFLICT });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    }
    return FirebaseAdminService;
}());
exports.firebaseService = new FirebaseAdminService();
//# sourceMappingURL=firebaseAdmin.js.map