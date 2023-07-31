"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtPayload = void 0;
var moment = require("moment");
var getJwtPayload = function (user) {
    return {
        valid: true,
        firstName: user.name.first,
        lastName: user.name.last,
        id: user._id.toString(),
        stripeCustomerId: user.stripeCustomerId,
        cardToken: user.cardToken,
        expires: moment.utc().add(1, 'day').format('YYYY-MM-DD HH:mm')
    };
};
exports.getJwtPayload = getJwtPayload;
//# sourceMappingURL=helpers.js.map