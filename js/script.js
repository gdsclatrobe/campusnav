const timeoutId = setTimeout(function () {
    document.getElementById("alert").style.display = "block";
  }, 5000);

  navigator.geolocation.getCurrentPosition(
    function (position) {
      clearTimeout(timeoutId);
    },
    function (error) {
      document.getElementById("alert").style.display = "block";
    }
  );