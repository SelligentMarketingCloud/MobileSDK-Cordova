var SelligentHelpers = {};

/**
 * Function to check the type of a variable.
 * 
 * @param {any} variableToCheck  Variable to match type.
 * @param {string} expectedType Expected type of the variable as a string, for example "number", "object", "Function",... (Case insensitive)
 * @returns Returns 'true' if the type matches, 'false' if it does not.
 */
SelligentHelpers.typeMatches = function (variableToCheck, expectedType) {
    switch (expectedType) {
        case "array":
            return Object.prototype.toString.call(variableToCheck) === '[object Array]';
        case "string":
            return typeof variableToCheck === 'string' || variableToCheck instanceof String;
        case "number":
            return typeof variableToCheck === 'number' && isFinite(variableToCheck);
        case "object":
            return variableToCheck && typeof variableToCheck === 'object' && variableToCheck.constructor === Object;
        default: // for 'function' and 'boolean' this is enough
            return typeof variableToCheck === expectedType;
    }
};

/**
 * Returns a string containing an error message explaining the expected type of a variable.
 * 
 * @param {string} nameOfVariable Name of the variable.
 * @param {any} variable Variable to match the type.
 * @param {string} expectedType Expected type of the variable.
 * @returns A string containing the full error message.
 */
SelligentHelpers.createTypeErrorMessage = function (variableName, variable, expectedType) {
    return 'Error occured: "' + variableName + '" is an invalid type. Received "' + typeof variable + '" and expected "' + expectedType + '".';
};

SelligentHelpers.hasRequiredParameterAndMatchesType = function (object, expectedParameter, expectedType, validConstants) {
    return object.hasOwnProperty(expectedParameter) && SelligentHelpers.typeMatches(object[expectedParameter], expectedType) && (validConstants ? SelligentHelpers.constantIsValid(validConstants, object[expectedParameter]) : true);
};

SelligentHelpers.hasOptionalParameterAndMatchesType = function (object, expectedParameter, expectedType, validConstants) {
    return SelligentHelpers.hasRequiredParameterAndMatchesType(object, expectedParameter, expectedType, validConstants) || !object.hasOwnProperty(expectedParameter);
};

SelligentHelpers.constantIsValid = function (constants, constantToVerify) {
    var occursInConstants = false,
        occursInAndroidSubConstants = false,
        occursInIOSSubConstants = false;

    Object.keys(constants).map(function (constant) {
        if (constants[constant] == constantToVerify) {
            occursInConstants = true;
        }
    });

    if (constants.hasOwnProperty("Android") && cordova.platformId.toLowerCase() === "android") {
        Object.keys(constants.Android).map(function (constant) {
            if (constants.Android[constant] == constantToVerify) {
                occursInAndroidSubConstants = true;
            }
        });
    }

    if (constants.hasOwnProperty("iOS") && cordova.platformId.toLowerCase() === "ios") {
        Object.keys(constants.iOS).map(function (constant) {
            if (constants.iOS[constant] == constantToVerify) {
                occursInIOSSubConstants = true;
            }
        });
    }
    return occursInConstants || occursInAndroidSubConstants || occursInIOSSubConstants;
};

// ARGUMENTS ERROR MESSAGES
SelligentHelpers.WRONG_ARGUMENTS = "Insufficient/incorrect argument(s) passed to the function.";
SelligentHelpers.MORE_INFORMATION = "For more information view the documentation of this method.";

module.exports = SelligentHelpers;