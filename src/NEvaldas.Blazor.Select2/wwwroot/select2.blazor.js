if (!window.select2Blazor) {
    window.select2Blazor = {};
}
window.select2Blazor = {
    init: function (id, dotnetHelper, options, getData) {
        options = JSON.parse(options);
        if (getData) {
            options.ajax = {
                delay: 250,
                data: function (params) {
                    return {
                        type: params._type,
                        term: params.term,
                        page: params.page || 1,
                        size: params.size || 10
                    };
                },
                transport: function (params, success, failure) {
                    var request = dotnetHelper.invokeMethodAsync(getData, params);
                    return request.then(success).catch(failure);
                },
                processResults: data => JSON.parse(data)
            };
        }
        options.escapeMarkup = function (markup) {
            return markup;
        };
        options.templateResult = function (data, container) {
            return data.html || data.text;
        };
        options.templateSelection = function (data, container) {
            return data.text;
        };

        $('#' + id).select2(options);
    },
    select: function(id, value) {
        if (value) {
            var $select2 = $('#' + id);
            var selection = $('#' + id).select2('data');
            var isAlreadySelected = selection.filter(x => x.id === value.id).length > 0;
            if (isAlreadySelected) {
                return;
            }

            // Set the value, creating a new option if necessary
            if ($select2.find(`option[value='${value.id}']`).length) {
                $select2.val(value.id).trigger('change');
            } else { 
                // Create a DOM Option and pre-select by default
                var newOption = new Option(value.text, value.id, true, true);
                // Append it to the select
                $select2.append(newOption).trigger('change');
            } 
        }
    },
    onChange: function (id, dotnetHelper, nameFunc) {
        $('#' + id).on('select2:select', function (e) {
            dotnetHelper.invokeMethodAsync(nameFunc, $('#' + id).val());
        });
    }
};