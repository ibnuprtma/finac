var cashbookadj1 = {
    init: function () {
        var e, a;
        e = JSON.parse('[{"code":1,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":2,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":3,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":4,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":5,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":6,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":7,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":8,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":9,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"},{"code":10,"name":"54473-251","debit":"GT","description":"San Pedro Ayampuc"}]'), a = $(".cashbookadj1_datatable").mDatatable({
            data: {
                type: "local",
                source: e,
                pageSize: 10
            },
            layout: {
                theme: "default",
                class: "",
                scroll: !1,
                footer: !1
            },
            sortable: !0,
            pagination: !0,
            search: {
                input: $("#generalSearch")
            },
            columns: [{
                field: "code",
                title: "Code",
                width: 150,
                sortable: !1,
                textAlign: "center",
                template: function (t) {
                    return '<div class="input-group"> <input name="coaadj1-' + t.code + '" id="codeadj1-' + t.code + '" type="text" class="form-control m-input" value="" readonly="" placeholder=""> <div class="input-group-append"> <button class="open-AddRowDialog btn m-btn m-btn--custom m-btn--pill btn-primary flaticon-search-1" data-toggle="modal" data-id="adj1-' + t.code + '" data-target="#coa_modal" type="button"></button></div></div>'
                }

            }, {
                field: "name",
                title: "Name",
                width: 100,
                template: function (t) {
                    return '<input style="width:100%" type="text" id="nameadj1-' + t.code + '" name="nameadj1-' + t.code + '" class="form-control m-input">'
                }
            }, {
                field: "credit",
                title: "Credit",
                width: 150,
                responsive: {
                    visible: "lg"
                },
                template: function (t) {
                    return '<input style="width:100%" type="text" id="creditadj1-' + t.code + '" onchange="currformat(\'46\',this.value,this.id)" name="creditadj1-' + t.code + '" class="curren form-control m-input">'
                }
            }, {
                field: "description",
                title: "Description",
                width: 100,
                template: function (t) {
                    return '<input style="width:100%" type="text" id="desriptionadj1-' + t.code + '" name="descriptionadj1-' + t.code + '" class="form-control m-input">'
                }
            }, {
                field: "Actions",
                width: 110,
                title: "Actions",
                sortable: !1,
                overflow: "visible",
                template: function (e, a, i) {
                    return '\t\t\t\t\t\t<div class="dropdown ' + (i.getPageSize() - a <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">                                <i class="la la-ellipsis-h"></i>                            </a>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="View ">                            <i class="la la-edit"></i>                        </a>\t\t\t\t\t'
                }
            }]
        }), $("#m_form_status").on("change", function () {
            a.search($(this).val(), "Status")
        }), $("#m_form_type").on("change", function () {
            a.search($(this).val(), "Type")
        }), $("#m_form_status, #m_form_type").selectpicker()
    }
};
jQuery(document).ready(function () {
    cashbookadj1.init()
    var table = $('#cashbookadj1_datatable').mDatatable();

    $(table).find('.m-datatable__row').click(function () {
        console.log(this);
    });
    
});

