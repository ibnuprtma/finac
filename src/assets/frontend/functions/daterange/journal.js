var JournalDaterangepicker = {
    init: function () {
        ! function () {
            $("#daterange_journal").daterangepicker({
                buttonClasses: "m-btn btn",
                applyClass: "btn-primary",
                cancelClass: "btn-secondary"
            });
        }()
    }
};
jQuery(document).ready(function () {
    JournalDaterangepicker.init()
});
