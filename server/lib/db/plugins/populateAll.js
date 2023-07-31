"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function autoPopulateAllFields(schema) {
    var paths = '';
    schema.eachPath(function process(pathname, schemaType) {
        if (pathname == '_id')
            return;
        if (schemaType.options.ref)
            paths += ' ' + pathname;
    });
    schema.pre('find', handler);
    schema.pre('findOne', handler);
    function handler(next) {
        this.populate(paths);
        next();
    }
}
exports.default = autoPopulateAllFields;
;
//# sourceMappingURL=populateAll.js.map