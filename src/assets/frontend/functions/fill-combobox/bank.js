$(document).ready(function () {
    Bank = function () {
        $.ajax({
            url: '/bankfa/',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                $('select[name="bankinfo"]').empty();

                $('select[name="bankinfo"]').append(
                    '<option value=""> Select a Bank</option>'
                );

                $.each(data, function (key, value) {
                    $('select[name="bankinfo"]').append(
                        '<option value="' + value + '">' + key + '</option>'
                    );
                });
                console.log(bank_uuid);
                $("#bankinfo").select2().val(bank_uuid).trigger("change");
            }
        });
    };

    Bank();
    
});
