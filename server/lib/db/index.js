"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.findModel = exports.SubscriptionPlan = exports.Subscription = exports.Referrals = exports.Orders = exports.Products = exports.FcmTokens = exports.Company = exports.Refund = exports.InvitedUsers = exports.Review = exports.Payment = exports.User = void 0;
var todo_hooks_and_virtuals_1 = require("./todo-hooks-and-virtuals");
var mongoose = require("mongoose");
var user_1 = require("./user");
var payment_1 = require("./payment");
var review_1 = require("./review");
var inviteUsers_1 = require("./inviteUsers");
var refundSchema_1 = require("./refundSchema");
var company_1 = require("./company");
var config_1 = require("../config");
var fcmTokens_1 = require("./fcmTokens");
var productsSchema_1 = require("./productsSchema");
var orderSchema_1 = require("./orderSchema");
var subscriptionSchema_1 = require("./subscriptionSchema");
var subscriptionPlan_1 = require("./subscriptionPlan");
var referrals_1 = require("./referrals");
var PATH = config_1.config.DB_PATH || 'mongodb://localhost:27017/boilerplate';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(PATH);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function () { return console.info('connected to db ', PATH); });
exports.User = mongoose.model('User', user_1.UserSchema);
exports.Payment = mongoose.model('Payment', payment_1.PaymentSchema);
exports.Review = mongoose.model('Review', review_1.ReviewSchema);
exports.InvitedUsers = mongoose.model('InvitedUsers', inviteUsers_1.InvitedUserSchema);
exports.Refund = mongoose.model('Refund', refundSchema_1.RefundsSchema);
exports.Company = mongoose.model('Company', company_1.CompanySchema);
exports.FcmTokens = mongoose.model('FcmTokens', fcmTokens_1.FcmTokensSchema);
exports.Products = mongoose.model('Products', productsSchema_1.ProductSchema);
exports.Orders = mongoose.model('Orders', orderSchema_1.OrdersSchema);
exports.Referrals = mongoose.model('Referrals', referrals_1.ReferralsSchema);
exports.Subscription = mongoose.model('Subscription', subscriptionSchema_1.SubscriptionSchema);
exports.SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlan_1.SubscriptionPlanSchema);
var allModel = {
    User: exports.User,
};
var findModel = function (modelName) {
    var model = allModel[modelName];
    if (model) {
        return model;
    }
};
exports.findModel = findModel;
exports.Todo = mongoose.model('todo', todo_hooks_and_virtuals_1.default);
//# sourceMappingURL=index.js.map