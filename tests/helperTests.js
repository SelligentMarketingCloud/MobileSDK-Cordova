exports.defineAutoTests = function () {

    describe('hasRequiredParameterAndMatchesType', function () {
        var testObject = {}, testParameter = "", testType = "";

        beforeEach(function() {
            testObject = {
                randomProp: true
            };
            testParameter = "randomProp";
            testType = "boolean";
        });

        it('should return "true" to mark it valid', function () {
            var result = SelligentHelpers.hasRequiredParameterAndMatchesType(testObject, testParameter, testType);

            expect(result).toBeTruthy();
        });
        it('should return "true" to mark it valid if required parameter is in provided enum list', function () {
            testType = "number";
            testEnum = Selligent.ClearCacheIntervalValue;
            testObject.randomProp = Selligent.ClearCacheIntervalValue.WEEK;

            var result = SelligentHelpers.hasRequiredParameterAndMatchesType(testObject, testParameter, testType, testEnum);

            expect(result).toBeTruthy();
        });
        it('should return "false" to mark it invalid if required parameter is missing', function () {
            testType = "boolean";
            testObject = {
                notTheCorrectRequiredProp: true
            };

            var result = SelligentHelpers.hasRequiredParameterAndMatchesType(testObject, testParameter, testType);

            expect(result).toBeFalsy();
        });
        it('should return "false" to mark it invalid if required parameter is wrong type', function () {
            testType = "string";

            var result = SelligentHelpers.hasRequiredParameterAndMatchesType(testObject, testParameter, testType);

            expect(result).toBeFalsy();
        });
        it('should return "false" to mark it invalid if required parameter is not in provided enum list', function () {
            testType = "number";
            testEnum = Selligent.ClearCacheIntervalValue;
            testObject.randomProp = Selligent.InAppMessageRefreshType.HOUR; // wrong enum

            var result = SelligentHelpers.hasRequiredParameterAndMatchesType(testObject, testParameter, testType, testEnum);

            expect(result).toBeFalsy();
        });
    });


    describe('hasOptionalParameterAndMatchesType', function () {
        var testObject = {}, testParameter = "", testType = "";

        beforeEach(function() {
            testObject = {
                randomProp: true
            };
            testParameter = "randomProp";
            testType = "boolean";
        });
            
        it('should return "true" to mark it valid', function () {
            var result = SelligentHelpers.hasOptionalParameterAndMatchesType(testObject, testParameter, testType);

            expect(result).toBeTruthy();
        });
        it('should return "true" to mark it valid if required parameter is in provided enum list', function () {
            testType = "number";
            testEnum = Selligent.ClearCacheIntervalValue;
            testObject.randomProp = Selligent.ClearCacheIntervalValue.WEEK;

            var result = SelligentHelpers.hasOptionalParameterAndMatchesType(testObject, testParameter, testType, testEnum);

            expect(result).toBeTruthy();
        });
        it('should return "true" to mark it still valid if required parameter is missing', function () {
            testType = "boolean";
            testObject = {
                notTheCorrectRequiredProp: true
            };

            var result = SelligentHelpers.hasOptionalParameterAndMatchesType(testObject, testParameter, testType);

            expect(result).toBeTruthy();
        });
        it('should return "false" to mark it invalid if required parameter is wrong type', function () {
            testType = "string";

            var result = SelligentHelpers.hasOptionalParameterAndMatchesType(testObject, testParameter, testType);

            expect(result).toBeFalsy();
        });
        it('should return "false" to mark it invalid if required parameter is not in provided enum list', function () {
            testType = "number";
            testEnum = Selligent.ClearCacheIntervalValue;
            testObject.randomProp = Selligent.InAppMessageRefreshType.HOUR; // wrong enum

            var result = SelligentHelpers.hasOptionalParameterAndMatchesType(testObject, testParameter, testType, testEnum);

            expect(result).toBeFalsy();
        });
    });

    describe('constantIsValid', function () {
        var testConstants = {
            one: 1,
            two: 2,
            Android: {
                three: 3
            },
            iOS: {
                four: 4
            }
        }, testConstantToVerify = 1;

        it('should return "true" to mark it valid if constant matches', function () {
            var result = SelligentHelpers.constantIsValid(testConstants, testConstantToVerify);

            expect(result).toBeTruthy();
        });
        it('should return valid response depending on platform if constant is under an "Android" subconstant', function () {
            testConstantToVerify = 3;
            var result = SelligentHelpers.constantIsValid(testConstants, testConstantToVerify);


            if(cordova.platformId.toLowerCase() === "android"){
                expect(result).toBeTruthy();
            } else {
                expect(result).toBeFalsy();
            }
        });
        it('should return valid response depending on platform if constant is under an "iOS" subconstant', function () {
            testConstantToVerify = 4;
            var result = SelligentHelpers.constantIsValid(testConstants, testConstantToVerify);

            if(cordova.platformId.toLowerCase() === "ios"){
                expect(result).toBeTruthy();
            } else {
                expect(result).toBeFalsy();
            }
        });
        it('should return "false" to mark it invalid if constant does not match', function () {
            testConstantToVerify = 5;

            var result = SelligentHelpers.constantIsValid(testConstants, testConstantToVerify);

            expect(result).toBeFalsy();
        });
    });
};
