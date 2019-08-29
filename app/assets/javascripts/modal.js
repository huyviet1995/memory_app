var Modal = function() {}

Modal.switchViews = function({option =  '#sign-in-view'} = {}) {
  var view, otherView;
  if (option == '#sign-in-option') {
    view = '#sign-in-view';
    otherView = '#sign-up-view';
  }
  else if (option = '#sign-up-option') {
    view = '#sign-up-view';
    otherView = '#sign-in-view';
  }
  
  $(view).css({
    'display': 'table-cell'
  })

  $(otherView).css({
    'display': 'none'
  })

}

Modal.showMessage = function({message, container = '#modal-message'} = {}) {
  $(container).append(/*html*/`${message}`);
}

Modal.registerAjaxReturn = function({container = '#modal-message'} = {}) {
  document.body.addEventListener('ajax:success', function(event) {
    [data, status, xhr] = event.detail;
    Modal.showMessage({
      message: xhr.response,
    })
    $(container).addClass('show')
    $(container).addClass('ajax-success');
    GameUtils.sleep(1000);
    window.location.href = `${xhr.response}` 
  })
  document.body.addEventListener('ajax:error', function(event) {
    [data, status, xhr] = event.detail;
    Modal.showMessage({
      message: xhr.response,
    })
    $(container).addClass('show')
    $(container).addClass('ajax-error');
  })
}

Modal.close = function() {
  $('.sign-in-box').css('display', 'none');
} 

Modal.open = function() {
  $('.sign-in-box').css('display', 'block');
}

$(document).ready(function() {
  Modal.registerAjaxReturn();

  $('#box-header #close-button').on('click', function() {
    Modal.close();
  })

  $('#sign-in-option').on('click', function() {
    Modal.switchViews({option: '#sign-in-option'})
  })

  $('#sign-up-option').on('click', function() {
    Modal.switchViews({option: '#sign-up-option'}) 
  })

  /* When click outside the box will remove the damn message  */
  $(window).click(function(e) {
    if ($('#modal-message').hasClass('show')) {
      if (!e.target.matches('#sign-in-option')) {
        $('#modal-message').empty();
      }
    }
  })
})