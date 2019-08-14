GameUtils = function() {}

GameUtils.createAndSendFormWithOptions = function({path, params, method = 'POST'} = {}) {
  var form = $('<form></form>');

  form.attr('method', method);
  form.attr('action', path);

  $.each(params, function(key, value) {
    var field = $('<input></input>');
    field.attr('type', 'hidden');
    field.attr('name', key);
    field.attr('value', value);
    form.append(field)
  })
  $(document.body).append(form);
  form.submit();
}

GameUtils.ajaxDataWithOptions = function({path, params, method} = {}) {
  $.ajax({
    url: path,
    method: method,
    data: params,
    success: function(response) {
      console.log(response);
    },
    error: function(error) {
      console.log(error);
    }
  })
}
