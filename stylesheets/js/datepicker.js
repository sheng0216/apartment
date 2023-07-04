const elem = document.querySelector('input[name="datepicker"]');

function datepicket() {

    const datepicker = new Datepicker(elem, {
        autohide: true
    });
}

datepicket();