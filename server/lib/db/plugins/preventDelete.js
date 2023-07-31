"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preventDeletePlugin = void 0;
var preventDeletePlugin = function (schema) {
    schema.path('isVisible', { type: Boolean, default: true });
    schema
        .pre("update", checkUserPermission)
        .pre("findOneAndUpdate", checkUserPermission)
        .pre("updateOne", checkUserPermission)
        .pre("findByIdAndUpdate", checkUserPermission);
};
exports.preventDeletePlugin = preventDeletePlugin;
function checkUserPermission(next) {
    if (this.options &&
        this.options.deleteOperation &&
        this.options.user &&
        this.options.user.roles === "Moderator") {
        return;
    }
    next();
    return;
}
//# sourceMappingURL=preventDelete.js.map