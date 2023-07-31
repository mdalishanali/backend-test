"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visibilityPlugin = void 0;
var visibilityPlugin = function (schema) {
    schema.path('isDeleted', { type: Boolean, default: false });
    schema.path('isVisible', { type: Boolean, default: true });
    schema
        .pre('count', addFiltersIfNotPresent)
        .pre('find', addFiltersIfNotPresent)
        .pre('findOne', addFiltersIfNotPresent)
        .pre('update', addFiltersIfNotPresent)
        .pre('findOneAndUpdate', addFiltersIfNotPresent);
};
exports.visibilityPlugin = visibilityPlugin;
function addFiltersIfNotPresent(next) {
    if (this.options && this.options.getDeleted) {
        next();
        return;
    }
    if (this.options && this.options.skipVisibility) {
        this._conditions.isDeleted = false;
        next();
        return;
    }
    if (typeof this._conditions.isVisible === 'undefined') {
        this._conditions.isVisible = true;
    }
    if (typeof this._conditions.isDeleted === 'undefined') {
        this._conditions.isDeleted = false;
    }
    next();
}
//# sourceMappingURL=visibility.js.map