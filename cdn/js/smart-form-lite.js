function smartForm () {
  var orderForm = $('.x_order_form'), formsNumber = orderForm.length;
  var typewriterTimer, countdownTimer, checklistTimer;
  var session_id = uuid(),
    order_id;

  var cta = orderForm.find('.x_cta'),
    duplicate = orderForm.find('.x_duplicate');

  for (let k=0;k<formsNumber;k++) {
    orderForm[k].classList.add('x_order_form--'+k);

    let form = $('.x_order_form--'+k),
    phoneInput = form.find('[name=phone]'),
    controls = form.find('input'),
    spinner = form.find('.x_spinner'),
    submitButton = form.find('.x_submit_button'),
    resubmitButton = form.find('.x_resubmit_button'),
    globalFormFields = '.x_form_fields';
    
    form.submit(function (ev) {
    ev.preventDefault();

    if (typewriterTimer) {
      clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }

    if (countdownTimer) {
      clearTimeout(countdownTimer);
      countdownTimer = null;
    }

    if (checklistTimer) {
      clearTimeout(checklistTimer);
      checklistTimer = null;
    }

    var data = { is_smart_form: true };

    cta.hide();
    duplicate.hide();

    $(globalFormFields).hide();
    $(this).find(globalFormFields).show();

    form.find('input').each(function () {
      var input = $(this);
      input.removeClass('x_invalid');
      data[input.attr('name')] = input.val();
    });

    var fixedPhone = fixPhoneId(data.phone);
    if (!fixedPhone) {
      form.find('.x_fix_phone').fadeIn();
      phoneInput.addClass('x_invalid');
      submitVersion(data, 'skipped:invalid');
      return;
    }

    form.find('.x_fix_phone').hide();
    form.find('input[name=phone]').val(fixedPhone);
    data.phone = fixedPhone;

    var lastPhone = window.localStorage.getItem('last_phone'),
      isSamePhone = lastPhone === data.phone;
    window.localStorage.setItem('last_phone', data.phone);

    if (isSamePhone) {
      submitVersion(data, 'skipped:duplicate');
      duplicate.show();
      return;
    }

    controls.prop('disabled', true);
    spinner.show();
    submitButton.hide();
    resubmitButton.hide();

    window.isShow = 1;
    var url = form.attr('action'),
      isNewOrder = url.indexOf('/submit') >= 0;
    $.post(url, data, function (response) {
      spinner.hide();
      controls.prop('disabled', false);

      var orderIdInput = form.find('[name=order_id]');
      if (!orderIdInput.length) {
        $('.x_order_form').each(function() {
          $(this).append($('<input>').attr('type', 'hidden').attr('name', 'order_id').val(response.order_id));
        })
      } else {
        orderIdInput.val(response.order_id);
      }
      order_id = response.order_id;
      submitVersion(data, isNewOrder ? 'created' : 'updated');

      $('.x_order_form').each(function() {
        $(this).attr('action', url.replace('/submit', '/resubmit'));
        var acceptedOrder = $(this).find('.x_order_accepted');
        acceptedOrder.find('.x_order_id').text(response.order_id);
        acceptedOrder.show();
      })
      scrollTo('.x_order_form--'+k+' .x_order_accepted');

      for (let k=0;k<formsNumber;k++) {
        orderForm[k].classList.add('x_order_form--'+k);
    
        let form = $('.x_order_form--'+k),
            phoneInput = form.find('[name=phone]'),
            controls = form.find('input'),
            spinner = form.find('.x_spinner'),
            submitButton = form.find('.x_submit_button'),
            resubmitButton = form.find('.x_resubmit_button');
  
        function startAllCta() {
          cta.fadeIn();
    
          var typewriter = form.find('.x_typewriter'),
              text = typewriter.text(),
              i = 0;
    
          function addSymbol() {
            if (text && i < text.length) {
              typewriter.text(text.slice(0, ++i));
              typewriterTimer = setTimeout(addSymbol, 20);
            } else {
              checklistTimer = setTimeout(function () {
                cta.find('.x_checklist').slideDown();
              }, 5000);
            }
          }
    
          addSymbol();
          var time = 5 * 60,
              digits = form.find('.x_countdown_digit');
    
          function tick() {
            if (time--) {
              var hours = Math.floor(time / 3600);
              var minutes = Math.floor((time - hours * 3600) / 60);
              var seconds = time - 3600 * hours - 60 * minutes;
              digits.eq(0).text(Math.floor(hours / 10));
              digits.eq(1).text(hours % 10);
              digits.eq(2).text(Math.floor(minutes / 10));
              digits.eq(3).text(minutes % 10);
              digits.eq(4).text(Math.floor(seconds / 10));
              digits.eq(5).text(seconds % 10);
              countdownTimer = setTimeout(tick, 1000);
            }
          }
    
          tick();
        }
        submitButton.hide();
        resubmitButton.show();
        form.find('.x_duplicate').hide();
  
        cta.find('.x_checklist').hide();
        startAllCta();
      }


      if (isNewOrder) {
        insertMetrics();
      }
    });

    function startCta() {
      cta.fadeIn();

      var typewriter = form.find('.x_typewriter'),
        text = typewriter.text(),
        i = 0;

      function addSymbol() {
        if (text && i < text.length) {
          typewriter.text(text.slice(0, ++i));
          typewriterTimer = setTimeout(addSymbol, 20);
        } else {
          checklistTimer = setTimeout(function () {
            cta.find('.x_checklist').slideDown();
          }, 5000);
        }
      }

      addSymbol();
      var time = 5 * 60,
        digits = form.find('.x_countdown_digit');

      function tick() {
        if (time--) {
          var hours = Math.floor(time / 3600);
          var minutes = Math.floor((time - hours * 3600) / 60);
          var seconds = time - 3600 * hours - 60 * minutes;
          digits.eq(0).text(Math.floor(hours / 10));
          digits.eq(1).text(hours % 10);
          digits.eq(2).text(Math.floor(minutes / 10));
          digits.eq(3).text(minutes % 10);
          digits.eq(4).text(Math.floor(seconds / 10));
          digits.eq(5).text(seconds % 10);
          countdownTimer = setTimeout(tick, 1000);
        }
      }

      tick();
    }
  });
  }

  

  function scrollTo(selector) {
    setTimeout(function () {
      var where = $(selector).offset().top;
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: where,
        },
        1000
      );
    }, 1);
  }

  function fixPhoneId(number) {
    var sane = number.replace(/[^\+\d]/g, '');
    var trimmed = sane.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    return trimmed.length == 13 ? trimmed : null;
  }

  function uuid() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp

    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16

      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }

      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  function submitVersion(data, status) {
    $.post('/submit-version', {
      phone: data.phone,
      status: status,
      session_id: session_id,
      landing_url: location.href,
      order_id: order_id,
      data: JSON.stringify(data),
    });
  }

  function insertMetrics() {
    if ($('iframe.x_subscribe_iframe').length) {
      return;
    }
    var externalReferrerQuery = getCookie('referrer_query');
    var refererDataQuery = location.search;
    var query = externalReferrerQuery || refererDataQuery;
    if (query && query[0] !== '?') {
      query = '?' + query;
    }
    $('body').append(
      $('<iframe class="x_subscribe_iframe"></iframe>')
        .attr('src', '/subscribe.html' + (query || ''))
        .attr('style', 'width:0;height:0;border:none !important;position:absolute;')
    );
  }

  function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
};


$(document).ready(function(){
  smartForm();
});
