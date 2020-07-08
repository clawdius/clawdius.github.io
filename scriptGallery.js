window.onload = function() {
    //Animation Open
    var contMain = document.getElementById('container-gallery');
    var navbar = document.getElementById('navbar');

    contMain.style.opacity = '0';
    navbar.style.opacity = '0';

    contMain.style.animation = 'zoom 1s';

    contMain.onanimationend = () => {
        contMain.style.opacity = '1';
        navbar.style.animation = 'Turun 0.8s';
        navbar.style.opacity = '1';
    }

    //Toggle Dropdown
    var dropdownToggle = document.getElementById("drop-btn");

    dropdownToggle.onclick = function() {
        dropdown();
    };

    function dropdown() {
        var dropmenu = document.getElementById("drop");
        dropmenu.classList.toggle("show");
    };

    window.onclick = function(event) {

        //Close Dropdown
        if (!event.target.matches('#drop-btn')) {
            var dropdown = document.getElementsByClassName("drop-content");
            for (i = 0; i < dropdown.length; i++) {
                var openDropdown = dropdown[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        };

        // Close Modal
        if (event.target.matches('#imgModal')) {
            var modalLord = document.getElementById('modal');
            modalLord.style.display = 'none';

            if (document.documentElement.clientWidth > 950) {
                var navbar = document.getElementById('navbar');
                navbar.style.display = 'flex';
                navbar.style.animation = 'fadeIn 0.5s'
                navbar.onanimationend = () => {};
            }
        }

    };

}