(function() {
  'use strict';

$(document).ready(function(){
  $('.modal').modal();
  $('.collapsible').collapsible();
});

  $.getJSON('/token')
    .done((loggedIn) => {
      const $greet = $('#greet');
      const $favorites = $('#fav_tab')
      const $log = $('#log_status');

      if (loggedIn) {
        $.getJSON('/users/firstName')
          .done((firstName) => {

          const $helloUser = $('<a>').text('Hello, ' + firstName.firstName);
          $('#favModal').show()
          const $logout = $('<a>').text('Log out');
          const $favA = $('<a>').attr('href', 'favs.html').text('Favorites')

          $logout.click((event) => {
            event.preventDefault();

            const options = {
              dataType: 'json',
              type: 'DELETE',
              url: '/token'
            };

            $.ajax(options)
              .done(() => {
                window.location.href = '/jobs.html';
              })
              .fail(() => {
                Materialize.toast('Unable to log out. Please try again.', 3000);
              });
          });

          $greet.append($helloUser);
          $favorites.append($favA);
          $log.append($logout);
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
      }
      else {
        const $signup = $('<a>')
          .attr({'href': '#signupModal', 'class': 'modal-trigger' })
          .text('Sign up');

        const $login = $('<a>')
          .attr({'href': '#loginModal', 'class': 'modal-trigger' })
          .text('Log in');

        $greet.append($signup);
        $log.append($login);
      }
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });

    $('#signUpForm').submit((event) => {
      event.preventDefault();

      const firstName = $('#firstName').val().trim();
      const lastName = $('#lastName').val().trim();
      const email = $('#emailSU').val().trim();
      const password = $('#passwordSU').val();

      if (!firstName) {
        return Materialize.toast('First name must not be blank', 3000);
      }

      if (!lastName) {
        return Materialize.toast('Last name must not be blank', 3000);
      }

      if (!email) {
        return Materialize.toast('Email must not be blank', 3000);
      }

      if (email.indexOf('@') < 0) {
        return Materialize.toast('Email must be valid', 3000);
      }

      if (!password || password.length < 8) {
        return Materialize.toast(
          'Password must be at least 8 characters long',
          3000
        );
      }

      const options = {
        contentType: 'application/json',
        data: JSON.stringify({ firstName, lastName, email, password }),
        dataType: 'json',
        type: 'POST',
        url: '/users'
      };

      $.ajax(options)
        .done((user) => {
          window.location.href = '/jobs.html';
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
    });

    $('#loginForm').submit((event) => {
      event.preventDefault();

      const email = $('#email').val().trim();
      const password = $('#password').val();

      if (!email) {
        return Materialize.toast('Email must not be blank', 3000);
      }

      if (!password) {
        return Materialize.toast('Password must not be blank', 3000);
      }

      const options = {
        contentType: 'application/json',
        data: JSON.stringify({ email, password }),
        dataType: 'json',
        type: 'POST',
        url: '/token'
      };

      $.ajax(options)
        .done((user) => {
          window.location.href = '/jobs.html';
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });

        $('#modal1').click((event) => {
          event.preventDefault();

          $('#loginModal').openModal();
        });

        $('#modal2').click((event) => {
          event.preventDefault();

          $('#signupModal').openModal();
        });
    });
})();
