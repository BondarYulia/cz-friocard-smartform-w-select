"use strict";

function initSmartForm () {
  var form = $(".x_order_form"),
    phoneInput = form.find("[name=phone]"),
    controls = form.find("input"),
    spinner = form.find(".x_spinner"),
    cta = form.find(".x_cta"),
    duplicate = form.find(".x_duplicate"),
    submitButton = form.find(".x_submit_button"),
    resubmitButton = form.find(".x_resubmit_button");

  var typewriterTimer, countdownTimer, checklistTimer;
  var session_id = uuid(),
    order_id;

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
    
      form.find("input").each(function () {
      var input = $(this);
      input.removeClass("x_invalid");
      data[input.attr("name")] = input.val();
    });

    var fixedPhone = fixPhoneId(data.phone);
    if (!fixedPhone) {
      form.find(".x_fix_phone").fadeIn();
      phoneInput.addClass("x_invalid");
      submitVersion(data, "skipped:invalid");
      scrollTo("#buyForm");
      return;
    }

    form.find(".x_fix_phone").hide();
    form.find("input[name=phone]").val(fixedPhone);
    data.phone = form.find('.phone-codes-button-value').text() + fixedPhone;
    
    var lastPhone = window.localStorage.getItem("last_phone"),
    isSamePhone = lastPhone === data.phone;
    window.localStorage.setItem("last_phone", data.phone);
    
    if (isSamePhone) {
      submitVersion(data, "skipped:duplicate");
      duplicate.show();
      scrollTo("#buyForm");
      return;
    }

    controls.prop("disabled", true);
    spinner.show();
    submitButton.hide();
    resubmitButton.hide();

    window.isShow = 1;
    var url = form.attr("action"),
      isNewOrder = url.indexOf("/submit") >= 0 || url.indexOf("subscribe.php") >= 0 ;
    $.post(url, data, function (response) {
      spinner.hide();
      controls.prop("disabled", false);

      var orderIdInput = form.find("[name=order_id]");
    if (window.is_downloaded_from_dashboard) {
      try {
        response = JSON.parse(response);
      } catch (e) {

      }
      }
      if (!orderIdInput.length) {
        form.append(
          $("<input>")
            .attr("type", "hidden")
            .attr("name", "order_id")
            .val(response.order_id)
        );
      } else {
        orderIdInput.val(response.order_id);
      }
      order_id = response.order_id;
      submitVersion(data, isNewOrder ? "created" : "updated");

      console.log('Response');
      console.log(response);
      form.attr("action", url.replace(
          window.is_downloaded_from_dashboard ? "subscribe.php" : "/submit",
          window.is_downloaded_from_dashboard ? "/resubmit.php" : "/resubmit")
      );
      // выше было  form.attr("action", url.replace("/submit", "/resubmit"))

      var accepted = form.find(".x_order_accepted");
      accepted.find(".x_order_id").text(response.order_id);
      accepted.show();
      scrollTo(".x_order_accepted");

      resubmitButton.show();
      form.find(".x_duplicate").hide();

      cta.find('.x_checklist').hide();
      startCta();

      if (isNewOrder) {
        insertMetrics();
      }
    });

    function startCta() {
      cta.fadeIn();

      var typewriter = form.find(".x_typewriter"),
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
        digits = form.find(".x_countdown_digit");

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

  function scrollTo(selector) {
    setTimeout(function () {
      if(!$(selector).offset()) {
        return;
      }
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
    var trimmed = number.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    var sane = trimmed.replace(/[^\+\d]/g, "");

    return sane.length >= 5 ? trimmed : null;
  }

  function uuid() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp

    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
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

        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  function submitVersion(data, status) {
    var payload = {
			phone: data.phone,
			status: status,
			session_id: session_id,
			landing_url: location.href,
			order_id: order_id,
			data: JSON.stringify(data),
		};
		var userId = session_id || null; // Replace your_user_id with your own if available.
		// window.hj('identify', userId, payload);
		$.post(
			window.is_downloaded_from_dashboard ?
				document.location.href + "/submit-version.php" : "/submit-version",
			payload
		);
		// выше было  $.post("/submit-version", payload);
  }

  function insertMetrics() {
    if ($("iframe.x_subscribe_iframe").length) {
      return;
    }
    var externalReferrerQuery = getCookie("referrer_query");
    var refererDataQuery = location.search;
    var query = externalReferrerQuery || refererDataQuery;
    if (query && query[0] !== "?") {
      query = "?" + query;
    }
    $("body").append(
      $('<iframe class="x_subscribe_iframe"></iframe>')
        .attr("src", "/subscribe.html" + (query || ""))
        .attr(
          "style",
          "width:0;height:0;border:none !important;position:absolute;"
        )
    );
  }

  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
}
