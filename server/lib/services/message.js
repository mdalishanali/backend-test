"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
var Twilio = require("twilio");
//import config
var config_1 = require("../config");
var twilioNumber = config_1.config.TWILIO_NUMBER;
var accountSid = config_1.config.TWILIO_ACCOUNTSID;
var authToken = config_1.config.TWILIO_AUTHTOKEN;
var MessageService = /** @class */ (function () {
    function MessageService() {
        var _this = this;
        this.sendMessages = function (number, message) {
            var textContent = {
                body: message,
                to: number,
                from: twilioNumber
            };
            return _this.client.messages.create(textContent)
                .then(function (res) { return res; });
        };
        // Validate E164 format
        this.validE164 = function (num) {
            return /^\+?[1-9]\d{1,14}$/.test(num);
        };
        this.client = Twilio(accountSid, authToken);
    }
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.js.map