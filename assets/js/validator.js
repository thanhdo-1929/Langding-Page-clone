function Validator(options) {
  var selectorRules = {};
  //ham check dkien
  function validate(inputElement, rule) {
    var errorElement =
      inputElement.parentElement.querySelector('.form-message');
    var errorMess;

    // laays ra rule cua casc selector
    var rules = selectorRules[rule.selector];
    //loc rule va kiem tra
    for (var i = 0; i < rules.length; ++i) {
      errorMess = rules[i](inputElement.value);
      if (errorMess) break;
    }
    if (errorMess) {
      errorElement.innerText = errorMess;
      inputElement.parentElement.classList.add('invalid');
    } else {
      errorElement.innerText = '';
      inputElement.parentElement.classList.remove('invalid');
    }
    // console.log(inputElement.parentElement.querySelector('.form-message'));
    return !errorMess;
  }

  //
  var formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true; //k co loi

      //thuc hienej lap qua tung rule, va validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name]   )');
          var formValue = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            return (values[input.name] = input.value) && values;
          },
          {});
          options.onSubmit(formValue);
        } else {
          formElement.submit();
        }
      }
    };

    options.rules.forEach(function (rule) {
      // luu rule
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      //
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        inputElement.oninput = function () {
          var errorElement =
            inputElement.parentElement.querySelector('.form-message');
          errorElement.innerText = '';
          inputElement.parentElement.classList.remove('invalid');
        };
      }
    });
    // console.log(selectorRules);
  }
}

//
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || 'This field is required';
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || 'Email must be in valid format with abc@gmail.com';
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Password must be less than ${min} characters`;
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || 'Your our password did not match';
    },
  };
};
