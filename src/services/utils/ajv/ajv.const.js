exports.UUID_REGEX = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';

exports.AJV_SETTINGS_BASIC = {
    coerceTypes: true,
    removeAdditional: true,
    allErrors: true
};

exports.AJV_SETTINGS_WITH_DEFAULTS = {
    coerceTypes: true,
    removeAdditional: true,
    allErrors: true,
    useDefaults: true
};
