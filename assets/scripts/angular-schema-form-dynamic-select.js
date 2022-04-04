;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['angular-schema-form'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular-schema-form'));
  } else {
    root.angularSchemaFormDynamicSelect = factory(root.schemaForm);
  }
}(this, function(schemaForm) {
angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/strap/strapmultiselect.html","<div ng-controller=\"dynamicSelectController\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-init=\"populateTitleMap(form)\">\n        <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\"\n                data-html=\"1\"\n                data-multiple=\"1\"\n				data-placement=\"{{form.options.placement || \'bottom-left\'}}\"\n				data-max-length=\"{{form.options.inlineMaxLength}}\"\n                data-max-length-html=\"{{form.options.inlineMaxLengthHtml}}\"\n                bs-options=\"item.value as item.name for item in form.titleMap | selectFilter:this:$$value$$:&quot;$$value$$&quot;\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapselect.html","<div ng-controller=\"dynamicSelectController\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-init=\"populateTitleMap(form)\">\n        <button ng-if=\"(form.options.multiple == \'true\') || (form.options.multiple == true)\"\n                type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\"\n                data-html=\"1\" data-multiple=\"1\" data-max-length=\"{{form.options.inlineMaxLength}}\"\n				data-placement=\"{{form.options.placement || \'bottom-left\'}}\"\n                data-max-length-html=\"{{form.options.inlineMaxLengthHtml}}\"\n                bs-options=\"item.value as item.name for item in form.titleMap | selectFilter:this:$$value$$:&quot;$$value$$&quot;\"\n                bs-select>\n        </button>\n        <button ng-if=\"!((form.options.multiple == \'true\') || (form.options.multiple == true))\"\n                type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\"\n                data-html=\"1\"\n				data-placement=\"{{form.options.placement || \'bottom-left\'}}\"\n                bs-options=\"item.value as item.name for item in form.titleMap | selectFilter:this:$$value$$:&quot;$$value$$&quot;\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}} </span>\n    </div>\n</div>\n\n");}]);
angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/uiselect/uiselect.html","<div ng-controller=\"dynamicSelectController\"\n     ng-class=\"{\n        \'has-error\': hasError(),\n        \'has-success\': hasSuccess(),\n        \'has-feedback\': form.feedback !== false\n    }\"\n    class=\"form-group\">\n\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group\">\n        <!-- 1. NO Tagging -->\n        <!-- NOTE: ng-if creates a new scope, so any change made in the child will obscure any parent scope var unless \"dot rule\" -->\n        <ui-select\n            ng-if=\"!(form.options.tagging||false)\"\n            ng-model=\"form.$$selectedObject\"\n            ng-disabled=\"form.disabled\"\n            theme=\"bootstrap\"\n            class=\"{{form.options.uiClass}}\">\n\n            <ui-select-match\n                allow-clear=\"{{form.options.allowClear||false}}\"\n                placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\">\n                {{form.$$selectedObject.name}}\n            </ui-select-match>\n\n            <ui-select-choices\n                refresh=\"populateTitleMap(form, $select.search)\"\n                refresh-delay=\"form.options.refreshDelay\"\n                group-by=\"form.options.groupBy\"\n                repeat=\"item in form.titleMap | propsFilter: {\n                    name: $select.search,\n                    description: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')\n                } track by $index\">\n\n                <div ng-bind-html=\"item.name | highlight: $select.search\"></div>\n\n                <div ng-if=\"item.description\">\n                    <span ng-bind-html=\"\n                        \'<small>\' +\n                            (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) +\n                        \'</small>\'\">\n                    </span>\n                </div>\n            </ui-select-choices>\n        </ui-select>\n\n        <!--repeat because annoying bug: allow-clear and tagging won\'t remove the first item: https://github.com/angular-ui/ui-select/issues/954 -->\n        <!-- 2. Tagging  -->\n        <ui-select\n            ng-if=\"(form.options.tagging||false)\"\n            ng-model=\"form.$$selectedObject\"\n            ng-disabled=\"form.disabled\"\n            tagging=\"(getTaggingFn(form.options.tagging))\"\n            tagging-label=\"{{form.options.taggingLabel||\'(new)\'}}\"\n            tagging-tokens=\"{{form.options.taggingTokens}}||;|,\"\n            theme=\"bootstrap\"\n            class=\"{{form.options.uiClass}}\">\n\n            <ui-select-match\n                allow-clear=\"{{form.options.allowClear||false}}\"\n                placeholder=\"{{\n                    form.placeholder ||\n                    form.schema.placeholder ||\n                    (\'placeholders.select\' | translate)}}\">\n                {{form.$$selectedObject.name||form.$$selectedObject.value}}&nbsp;\n                <small ng-if=\"form.$$selectedObject.isTag\">\n                    {{($select.taggingLabel)}}\n                </small>\n            </ui-select-match>\n\n            <ui-select-choices\n                group-by=\"form.options.groupBy\"\n                refresh=\"populateTitleMap(form, $select.search)\"\n                refresh-delay=\"form.options.refreshDelay\"\n                repeat=\"item in form.titleMap | propsFilter: {\n                    name: $select.search,\n                    description: (form.options.searchDescription===true ? $select.search : \'NOTSEARCHINGFORTHIS\'\n                    )\n                } track by $index\">\n\n                <!-- Newly created element (tag) -->\n                <div ng-if=\"item.isTag\"\n                    ng-bind-html=\"\n                        \'<div>\' +\n                            (item.name | highlight: $select.search) +\n                            \' \' + form.options.taggingLabel +\n                        \'</div>\' +\n                        \'<div class=&quot;divider&quot;></div>\' \">\n                        <!-- Show a separator between the new item and the standard one -->\n                </div>\n\n                <div ng-if=\"!item.isTag\"\n                    ng-bind-html=\"item.name + item.isTag| highlight: $select.search\">\n                </div>\n\n                <div ng-if=\"item.description\">\n                    <span ng-bind-html=\"\n                        \'<small>\' +\n                            (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) +\n                       \'</small>\'\">\n                    </span>\n                </div>\n\n            </ui-select-choices>\n        </ui-select>\n\n        <input\n            type=\"hidden\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            toggle-single-model\n                ng-model=\"$$value$$\"\n                form=\"form\"\n            sf-changed=\"form\"\n            schema-validate=\"form\"/>\n\n        <span\n            ng-if=\"form.feedback !== false\"\n            ng-class=\"evalInScope(form.feedback) || {\n                \'glyphicon\': true,\n                \'glyphicon-ok\': hasSuccess(),\n                \'glyphicon-remove\': hasError()\n            }\"\n            class=\"form-control-feedback\"\n            id=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n        </span>\n\n        <div class=\"help-block\" sf-message=\"form.description\"></div>\n\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/uiselect/uiselectmultiple.html","<div\n    ng-controller=\"dynamicSelectController\"\n    ng-class=\"{\n        \'has-error\': hasError(),\n        \'has-success\': hasSuccess(),\n        \'has-feedback\': form.feedback !== false\n    }\"\n    class=\"form-group\">\n\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group\">\n\n        <!-- 1. Multiple, not tagging -->\n        <ui-select\n            ng-if=\"!(form.options.tagging||false)\"\n            multiple=\"true\"\n            ng-model=\"form.$$selectedObjects\"\n            sortable=\"form.options.sortable||false\"\n            theme=\"bootstrap\"\n            on-select=\"form.$$selectedValues.push($item.value)\"\n            on-remove=\"form.$$selectedValues.splice(form.$$selectedValues.indexOf($item.value), 1)\"\n            class=\"{{form.options.uiClass}}\">\n\n            <ui-select-match\n                placeholder=\"{{\n                    form.placeholder ||\n                    form.schema.placeholder ||\n                    (\'placeholders.select\' | translate)\n                }}\">\n                {{$item.name}}\n            </ui-select-match>\n\n            <ui-select-choices\n                refresh=\"populateTitleMap(form, $select.search)\"\n                refresh-delay=\"form.options.refreshDelay\"\n                group-by=\"form.options.groupBy\"\n                repeat=\"item in form.titleMap | propsFilter: {\n                    name: $select.search,\n                    description: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')\n                } track by $index\">\n\n                <div ng-bind-html=\"item.name | highlight: $select.search\">\n                </div>\n\n                <div ng-if=\"item.description\">\n                    <span ng-bind-html=\"\n                        \'<small>\' +\n                            (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) +\n                        \'</small>\'\">\n                    </span>\n                </div>\n\n            </ui-select-choices>\n        </ui-select>\n\n        <!-- 2. Multiple, Tagging -->\n        <ui-select\n            ng-if=\"(form.options.tagging||false)\"\n            multiple=\"true\"\n            ng-model=\"form.$$selectedObjects\"\n            sortable=\"form.options.sortable||false\"\n            tagging=\"(getTaggingFn(form.options.tagging))\"\n            tagging-label=\"{{form.options.taggingLabel||\'(new)\'}}\"\n            tagging-tokens=\"{{form.options.taggingTokens}}||;|,\"\n            theme=\"bootstrap\"\n            on-select=\"form.$$selectedValues.push($item.value)\"\n            on-remove=\"form.$$selectedValues.splice(form.$$selectedValues.indexOf($item.value), 1)\"\n            class=\"{{form.options.uiClass}}\">\n\n            <ui-select-match\n                placeholder=\"{{\n                    form.placeholder ||\n                    form.schema.placeholder ||\n                    (\'placeholders.select\' | translate)\n                }}\">\n                {{$item.name}}\n            </ui-select-match>\n\n            <ui-select-choices\n                refresh=\"populateTitleMap(form, $select.search)\"\n                refresh-delay=\"form.options.refreshDelay\"\n                group-by=\"form.options.groupBy\"\n                repeat=\"item in form.titleMap | propsFilter: {\n                    name: $select.search,\n                    description: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')\n                } track by $index\">\n\n                <!-- Newly created element (tag) -->\n                <div ng-if=\"item.isTag\"\n                    ng-bind-html=\"\n                        \'<div>\' +\n                            (item.name | highlight: $select.search) +\n                            \' \' + form.options.taggingLabel +\n                        \'</div>\' +\n                        \'<div class=&quot;divider&quot;></div>\' \">\n                        <!-- Show a separator between the new item and the standard one -->\n                </div>\n\n                <div ng-if=\"!item.isTag\"\n                    ng-bind-html=\"item.name | highlight: $select.search\">\n                </div>\n\n                <div ng-if=\"item.description\">\n                    <span ng-bind-html=\"\n                        \'<small>\' +\n                            (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) +\n                        \'</small>\'\">\n                    </span>\n                </div>\n\n            </ui-select-choices>\n        </ui-select>\n\n        <input\n            type=\"hidden\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            toggle-multiple-model\n                ng-model=\"$$value$$\"\n                form=\"form\"\n            sf-changed=\"form\"\n            schema-validate=\"form\"/>\n\n        <span\n            ng-if=\"form.feedback !== false\"\n            ng-class=\"evalInScope(form.feedback) || {\n                \'glyphicon\': true,\n                \'glyphicon-ok\': hasSuccess(),\n                \'glyphicon-remove\': hasError()\n            }\"\n            class=\"form-control-feedback\">\n        </span>\n\n        <div class=\"help-block\" sf-message=\"form.description\"></div>\n    </div>\n</div>\n");}]);
//  ===========
//  = Helpers =
//  ===========
function find_in_titleMap(value, titleMap) {
    for (i = 0; i < titleMap.length; i++) {
        if (titleMap[i].value == value) {
            // Return the original object or we get this bug: https://github.com/angular-ui/ui-select/issues/1414
            return titleMap[i];
            // Don't do this
            // return {"value": titleMap[i].value, "name": titleMap[i].name}
        }
    }
};


angular.module('schemaForm').config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var select = function (name, schema, options) {
            if ((schema.type === 'string') && ("enum" in schema)) {
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'strapselect';
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };

        schemaFormProvider.defaults.string.unshift(select);

        //Add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselect',
            'directives/decorators/bootstrap/strap/strapselect.html');

        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselect',
            'directives/decorators/bootstrap/strap/strapmultiselect.html');

        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselectdynamic',
            'directives/decorators/bootstrap/strap/strapselect.html');

        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselectdynamic',
            'directives/decorators/bootstrap/strap/strapmultiselect.html');


        // UI SELECT
        //Add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselect',
            'directives/decorators/bootstrap/uiselect/uiselect.html');


        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselectmultiple',
            'directives/decorators/bootstrap/uiselect/uiselectmultiple.html');


    }])
    .directive("toggleSingleModel", function () {
        // some how we get this to work ...
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                ngModel: '=',
                form: '='
            },
            link: function (scope, element, attrs, ngModelCtrl) {

                var initOnce = scope.$watch('ngModel', function (value) {
                    if (value) {
                        scope.form.$$selectedValue = value;
                        if (scope.form.titleMap) { // otherwise leave it to the async/callback fns -> populateTitleMap
                            scope.form.$$selectedObject = find_in_titleMap(value, scope.form.titleMap);
                        }
                        initOnce();
                    }
                });

                scope.$watch('form.$$selectedObject', function (newValue, oldValue, scope) {
                    if (newValue != oldValue) {
                        scope.ngModel = newValue ? newValue.value : '';
                        scope.form.$$selectedValue = scope.ngModel; // mirror scope var for $$value$$
                        ngModelCtrl.$setViewValue(scope.ngModel);   // trigger validation
                    }
                }, true);
            }
        };
    })
    .directive("toggleMultipleModel", function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                ngModel: '=',
                form: '='
            },
            link: function (scope, element, attrs, ngModelCtrl) {

                var initOnce = scope.$watch('ngModel', function (values) {
                    if (values) {
                        scope.form.$$selectedValues = values;
                        if (!scope.form.$$selectedObjects) {
                            scope.form.$$selectedObjects = [];
                        }

                        if (scope.form.titleMap) { // otherwise leave it to the async/callback fns -> populateTitleMap
                            values.forEach(function (value) {
                                scope.form.$$selectedObjects.push(find_in_titleMap(value, scope.form.titleMap));
                            })
                        }
                        initOnce();
                    }
                    else {
                        scope.form.$$selectedValues = [];
                        scope.form.$$selectedObjects = [];
                    }
                });

                scope.$watch('form.$$selectedValues', function (newValues, oldValues, scope) {
                    if (newValues != oldValues) {
                        scope.ngModel = newValues ? newValues : [];
                        scope.form.$$selectedValues = scope.ngModel;  // mirror scope var for our $$value$$
                        ngModelCtrl.$setViewValue(scope.ngModel);     // trigger validation
                    }
                }, true);
            }
        };
    })

    // TODO: remove this. It's never used, old directive for strapselect
    .directive('multipleOn', function () {
        return {
            link: function ($scope, $element, $attrs) {
                $scope.$watch(
                    function () {
                        return $element.attr('multiple-on');
                    },
                    function (newVal) {

                        if (newVal == "true") {
                            var select_scope = angular.element($element).scope().$$childTail;
                            select_scope.$isMultiple = true;
                            select_scope.options.multiple = true;
                            select_scope.$select.$element.addClass('select-multiple');
                        }
                        else {
                            angular.element($element).scope().$$childTail.$isMultiple = false;
                        }
                    }
                );
            }
        };
    })
    // TODO: Remove this. Never used, it was old directive for ui-multiple.
    .filter('whereMulti', function () {
        return function (items, key, values) {
            var out = [];

            if (angular.isArray(values) && items !== undefined) {
                values.forEach(function (value) {
                    for (var i = 0; i < items.length; i++) {
                        if (value == items[i][key]) {
                            out.push(items[i]);
                            break;
                        }
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        if (item.hasOwnProperty(prop)) {
                            //only match if this property is actually in the item to avoid
                            var text = props[prop].toLowerCase();
                            //search for either a space before the text or the text at the start of the string so that the middle of words are not matched
                            if (item[prop].toString().toLowerCase().indexOf(text) === 0 || ( item[prop].toString()).toLowerCase().indexOf(' ' + text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            }
            else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

angular.module('schemaForm').controller('dynamicSelectController', ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {
        if (!$scope.form.options) {
            $scope.form.options = {};
        }

        console.log("Setting options." + $scope.form.options.toString());

        // TODO: remove this. WHY???
        $scope.form.options.scope = $scope;

        $scope.getTaggingFn = function (taggingOption) {
            if (!taggingOption) {
                return undefined;
            }
            // If string or function than use the supplied fn, otherwise use the default one
            return typeof taggingOption === 'function' || typeof taggingOption === 'string' ? taggingOption : $scope.defaultTaggingFn;
        }

        // TOFIX: (Bug) If used together with async -> Async will override titleMap, erasing the new element from the dropdown (but not from the selection)
        $scope.defaultTaggingFn = function (el) {

            var newElement = {
                name: el.name || el,
                value: el.value || el,
                isTag: true
            };

            var found = false;
            for (i = 0; i < $scope.form.titleMap.length; i++) {
                // substitute with old tag
                if ($scope.form.titleMap[i].isTag == true) {
                    $scope.form.titleMap[i] = newElement;
                    found = true;
                    break;
                }
            }
            if (!found) {
                // Add as first item in titleMap
                $scope.form.titleMap.unshift(newElement);
            }
            return newElement;
        }

        // TODO: remove from scope -> helper
        $scope.triggerTitleMap = function () {
            console.log("listener triggered");
            // Ugly workaround to trigger titleMap expression re-evaluation so that the selectFilter it reapplied.
            $scope.form.titleMap.push({"value": "345890u340598u3405u9", "name": "34095u3p4ouij"})
            $timeout(function () {
                $scope.form.titleMap.pop()
            })

        };

        // TODO: why??
        $scope.initFiltering = function (localModel) {
            if ($scope.form.options.filterTriggers) {
                $scope.form.options.filterTriggers.forEach(function (trigger) {
                    $scope.$parent.$watch(trigger, $scope.triggerTitleMap)
                });
            }
            // This is set here, as the model value may become unitialized and typeless if validation fails.
            $scope.localModelType = Object.prototype.toString.call(localModel);
            $scope.filteringInitialized = true;
        };


        $scope.finalizeTitleMap = function (form, data, newOptions) {
            // Remap the data

            form.titleMap = [];

            if (newOptions && "map" in newOptions && newOptions.map) {
                var current_row = null,
                    final = newOptions.map.nameProperty.length - 1,
                    separator = newOptions.map.separatorValue ? newOptions.map.separatorValue : ' - ';
                data.forEach(function (current_row) {
                    current_row["value"] = current_row[newOptions.map.valueProperty];
                    //check if the value passed is a string or not
                    if (typeof newOptions.map.nameProperty != 'string') {
                        //loop through the object/array
                        var newName = "";
                        for (var i in newOptions.map.nameProperty) {
                            newName += current_row[newOptions.map.nameProperty[i]];
                            if (i != final) {
                                newName += separator
                            }
                            ;
                        }
                        current_row["name"] = newName; //init the 'name' property
                    }
                    else {
                        //if it is a string
                        current_row["name"] = current_row[newOptions.map.nameProperty];
                    }
                    form.titleMap.push(current_row);
                });

            }
            else {
                data.forEach(function (item) {
                    if ("text" in item) {
                        item.name = item.text
                    }
                });
                form.titleMap = data;
            }

            // Case Single
            if ($scope.form.$$selectedValue && $scope.form.$$selectedObject === undefined) {
                $scope.form.$$selectedObject = find_in_titleMap($scope.form.$$selectedValue, form.titleMap);
            }
            // Case Multiple
            else if ($scope.form.$$selectedValues &&
                $scope.form.$$selectedValues.length &&
                ($scope.form.$$selectedObjects == undefined ||
                $scope.form.$$selectedObjects.length === 0)) {
                $scope.form.$$selectedObjects = [];
                $scope.form.$$selectedValues.forEach(function (value) {
                    $scope.form.$$selectedObjects.push(find_in_titleMap(value, form.titleMap));
                });
            }
        };

        $scope.clone = function (obj) {
            // Clone an object (except references to this scope)
            if (null == obj || "object" != typeof(obj)) return obj;

            var copy = obj.constructor();
            for (var attr in obj) {
                // Do not clone if it is this scope
                if (obj[attr] != $scope) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = $scope.clone(obj[attr]);
                }
            }
            return copy;
        };


        $scope.getCallback = function (callback) {
            if (typeof(callback) == "string") {
                var _result = $scope.$parent.evalExpr(callback);
                if (typeof(_result) == "function") {
                    return _result;
                }
                else {
                    throw("A callback string must match name of a function in the parent scope")
                }

            }
            else if (typeof(callback) == "function") {
                return callback;
            }
            else {
                throw("A callback must either be a string matching the name of a function in the parent scope or a " +
                "direct function reference")

            }
        };

        $scope.getOptions = function (options, search) {
            // If defined, let the a callback function manipulate the options
            if (options.httpPost && options.httpPost.optionsCallback) {
                newOptionInstance = $scope.clone(options);
                return $scope.getCallback(options.httpPost.optionsCallback)(newOptionInstance, search);
            }
            if (options.httpGet && options.httpGet.optionsCallback) {
                newOptionInstance = $scope.clone(options);
                return $scope.getCallback(options.httpGet.optionsCallback)(newOptionInstance, search);
            }
            else {
                return options;
            }
        };

        $scope.test = function (form) {
            form.titleMap.pop();
        };

        // Called from template when refreshing options/search
        $scope.populateTitleMap = function (form, search) {

            if (form.schema && "enum" in form.schema) {
                form.titleMap = [];
                form.schema.enum.forEach(function (item) {
                    form.titleMap.push({"value": item, "name": item})
                });
            }
            else if (!form.options) {

                console.log("dynamicSelectController.populateTitleMap(key:" + form.key + ") : No options set, needed for dynamic selects");
            }
            else if (form.options.callback) {
                form.titleMap = $scope.getCallback(form.options.callback)(form.options, search);
                $scope.finalizeTitleMap(form, form.titleMap, form.options);
                console.log("callback items: ", form.titleMap);
            }
            else if (form.options.asyncCallback) {
                return $scope.getCallback(form.options.asyncCallback)(form.options, search).then(
                    function (_data) {
                        // In order to work with both $http and generic promises
                        _data = _data.data || _data;
                        $scope.finalizeTitleMap(form, _data, form.options);
                        console.log('asyncCallback items', form.titleMap);
                    },
                    function (data, status) {
                        if (form.options.onPopulationError) {
                            $scope.getCallback(form.options.onPopulationError)(form, data, status);
                        }
                        else {
                            alert("Loading select items failed(Options: '" + String(form.options) +
                                "\nError: " + status);
                        }


                    });
            }
            else if (form.options.httpPost) {
                var finalOptions = $scope.getOptions(form.options, search);

                return $http.post(finalOptions.httpPost.url, finalOptions.httpPost.parameter).then(
                    function (_data) {

                        $scope.finalizeTitleMap(form, _data.data, finalOptions);
                        console.log('httpPost items', form.titleMap);
                    },
                    function (data, status) {
                        if (finalOptions.onPopulationError) {
                            $scope.getCallback(finalOptions.onPopulationError)(form, data, status);
                        }
                        else {
                            alert("Loading select items failed (URL: '" + String(finalOptions.httpPost.url) +
                                "' Parameter: " + String(finalOptions.httpPost.parameter) + "\nError: " + status)
                        }

                    });
            }
            else if (form.options.httpGet) {
                var finalOptions = $scope.getOptions(form.options, search);
                return $http.get(finalOptions.httpGet.url, finalOptions.httpGet.parameter).then(
                    function (data) {
                        $scope.finalizeTitleMap(form, data.data, finalOptions);
                        console.log('httpGet items', form.titleMap);
                    },
                    function (data, status) {
                        if (finalOptions.onPopulationError) {
                            $scope.getCallback(finalOptions.onPopulationError)(form, data, status);
                        }
                        else {
                            alert("Loading select items failed (URL: '" + String(finalOptions.httpGet.url) +
                                "\nError: " + status);
                        }

                    });
            }
        };

    }]);

angular.module('schemaForm').filter('selectFilter', [function ($filter) {
    return function (inputArray, controller, localModel, strLocalModel) {
        // As the controllers' .model is the global and its form is the local, we need to get the local model as well.
        // We also need tp be able to set it if is undefined after a validation failure,so for that we need
        // its string representation as well as we do not know its name. A typical value if strLocalModel is model['groups']
        // This is very ugly, though. TODO: Find out why the model is set to undefined after validation failure.

        if (!angular.isDefined(inputArray) || !angular.isDefined(controller.form.options) || !angular.isDefined(controller.form.options.filter) || controller.form.options.filter == '') {
            return inputArray;
        }

        console.log("----- In filtering for " + controller.form.key + "(" + controller.form.title + "), model value: " + JSON.stringify(localModel) + "----");
        console.log("Filter:" + controller.form.options.filter);

        if (!controller.filteringInitialized) {
            console.log("Initialize filter");
            controller.initFiltering(localModel);
        }

        var data = [];

        angular.forEach(inputArray, function (curr_item) {
            //console.log("Compare: curr_item: " + JSON.stringify(curr_item) +
            //"with : " + JSON.stringify( controller.$eval(controller.form.options.filterTriggers[0])));
            if (controller.$eval(controller.form.options.filter, {item: curr_item})) {
                data.push(curr_item);
            }
            else if (localModel) {
                // If not in list, also remove the set value

                if (controller.localModelType == "[object Array]" && localModel.indexOf(curr_item.value) > -1) {
                    localModel.splice(localModel.indexOf(curr_item.value), 1);
                }
                else if (localModel == curr_item.value) {
                    console.log("Setting model of type " + controller.localModelType + "to null.");
                    localModel = null;
                }
            }
        });

        if (controller.localModelType == "[object Array]" && !localModel) {
            // An undefined local model seems to mess up bootstrap select's indicators
            console.log("Resetting model of type " + controller.localModelType + " to [].");

            controller.$eval(strLocalModel + "=[]");
        }

        //console.log("Input: " + JSON.stringify(inputArray));
        //console.log("Output: " + JSON.stringify(data));
        //console.log("Model value out : " + JSON.stringify(localModel));
        console.log("----- Exiting filter for " + controller.form.title + "-----");

        return data;
    };
}]);

}));
