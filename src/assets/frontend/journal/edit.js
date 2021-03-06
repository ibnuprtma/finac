let JournalEdit = {
    init: function () {

			let _url = window.location.origin;
      let _voucher_no = $('input[name=voucher_no]').val();
			let number_format = new Intl.NumberFormat('de-DE');
      
      function addCommas(nStr)
      {
          nStr += '';
          x = nStr.split('.');
          x1 = x[0];
          x2 = x.length > 1 ? '.' + x[1] : '';
          var rgx = /(\d+)(\d{3})/;
          while (rgx.test(x1)) {
              x1 = x1.replace(rgx, '$1' + '.' + '$2');
          }
          return x1 + x2;
      }

      let account_code_table = $('.accountcode_datatable').DataTable({
        dom: '<"top"f>rt<"bottom">pil',
        scrollX: true,
        processing: true,
        serverSide: true,
        ajax: '/journala/datatables?voucher_no=' + _voucher_no,
        columns: [
          {data: 'coa.code'},
          {data: 'coa.name'},
          {data: 'debit', render: (data, type, row) => {
            return row.journal.currency.symbol + ' ' + number_format.format(row.debit);
          }},
          {data: 'credit', render: (data, type, row) => {
            return row.journal.currency.symbol + ' ' + number_format.format(row.credit);
          }},
          {data: 'description'},
          {data: '', searchable: false, render: function (data, type, row) {
            $("#total_debit").val(
              number_format.format(parseFloat(row.total_debit))
            );
            $("#total_credit").val(
              number_format.format(parseFloat(row.total_credit))
            );

            let _html =
              '<button id="show_modal_journala" type="button" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill edit-item" title="Edit" data-uuid=' + row.uuid + ' data-description='+row.coa.description+'>\t\t\t\t\t\t\t<i class="la la-pencil"></i>\t\t\t\t\t\t</button>\t\t\t\t\t\t' +
              '\t\t\t\t\t\t\t<a class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill  delete" href="#" data-uuid=' +
              row.uuid +
              ' title="Delete"><i class="la la-trash"></i> </a>\t\t\t\t\t\t\t';
              

            return (_html);
          }}
        ]
      });

			let dispay_modal = $('body').on('click', '#show_modal_journala', function() {
				let _uuid = $(this).data('uuid');
				let _description = $(this).data('description');
				let _modal = $('#modal_coa_edit');
				let form = _modal.find('form');
				let tr = $(this).parents('tr');
				let data = account_code_table.row(tr).data();
				let amount = '';

				console.table(data);

				amount = parseInt(data.credit);

				form.find('input[value=kredit]').prop('checked', true);

				if (data.debit > 0) {
					amount = parseInt(data.debit);
					form.find('input[value=debet]').prop('checked', true);
				}

				form.find('input#account_code').val(data.coa.code);
				form.find('input#account_description').val(data.coa.name);
				form.find('input[name=amount]').val(amount);
				form.find('textarea[name=remark]').val(data.description);

				_modal.find('input[name=uuid]').val(_uuid);
				_modal.modal('show');

			})

			let ubah_journala = $('body').on('click', '#update_journala', function () {

					let button = $(this);
					let form = button.parents('form');
					let uuid = form.find('input[name=uuid]').val();
          let _data = form.serialize();
          _data += `
            &voucher_no=${_voucher_no}
          `;

					$.ajax({
							headers: {
									'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
							},
							type: 'put',
							url: `/journala/${uuid}`,
							data: _data,
							success: function (data) {
									if (data.errors) {
											if (data.errors.code) {
												$('#code-error').html(data.errors.code[0]);

												document.getElementById('code').value = code;
												document.getElementById('name').value = name;
												document.getElementById('type').value = type;
												document.getElementById('level').value = level;
												document.getElementById('description').value = description;
												coa_reset();
											}

									} else {
										toastr.success('Data Saved', 'Success', {
												timeOut: 5000
										});

										$('#modal_coa_edit').modal('hide');
										account_code_table.ajax.reload();
									}
							}
					});
			});

			let simpan_journala = $('body').on('click', '#create_journala', function () {

					let button = $(this);
					let form = button.parents('form');
					let uuid = form.find('input[name=uuid]').val();
					let _data = form.serialize();

					$.ajax({
							headers: {
									'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
							},
							type: 'post',
							url: `/journala`,
							data: _data,
							success: function (data) {
									if (data.errors) {
											if (data.errors.code) {
												$('#code-error').html(data.errors.code[0]);

												document.getElementById('code').value = code;
												document.getElementById('name').value = name;
												document.getElementById('type').value = type;
												document.getElementById('level').value = level;
												document.getElementById('description').value = description;
												coa_reset();
											}

									} else {
										toastr.success('Data Saved Successfully.', 'Success', {
												timeOut: 2000
										});

										$('#modal_coa_create').modal('hide');
										account_code_table.ajax.reload();

										form.find('input#amount').val('');
										form.find('input[type=radio]').prop('checked', false);
										form.find('textarea:not([type=hidden])').val('');
										$('#_accountcode').val('').trigger('change');
									}
							}
					});
			});

			let ubah = $('body').on('click', '#journalsave', function () {

					let button = $(this);
					let form = button.parents('form');
					let _data = form.serialize();
					let uuid = button.data('uuid');

					$.ajax({
							headers: {
									'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
							},
							type: 'put',
							url: `/journal/${uuid}`,
							data: _data,
							success: function (data) {
									if (data.errors) {
											if (data.errors.code) {
													$('#code-error').html(data.errors.code[0]);

													document.getElementById('code').value = code;
													document.getElementById('name').value = name;
													document.getElementById('type').value = type;
													document.getElementById('level').value = level;
													document.getElementById('description').value = description;
													coa_reset();
											}
									} else {
											toastr.success('Data Saved Successfully.', 'Success', {
													timeOut: 5000
											});

											 setTimeout(function(){
												 location.href = `${_url}/journal`;
											 }, 2000);
									}
							}
					});
			});

			let coa_table = $("#coa_datatables").DataTable({
					"dom": '<"top"f>rt<"bottom">pl',
					responsive: !0,
					searchDelay: 500,
					processing: !0,
					serverSide: !0,
					lengthMenu: [5, 10, 25, 50],
					pageLength: 5,
					ajax: "/coa/datatables/modal",
					columns: [
							{
									data: 'code'
							},
							{
									data: "name"
							},
							{
									data: "Actions"
							}
					],
					columnDefs: [{
							targets: -1,
							orderable: !1,
							render: function (a, e, t, n) {
									return '<a id="userow" class="btn btn-primary btn-sm m-btn--hover-brand select-coa" title="View" data-id="" data-uuid="' + t.uuid + '">\n<span><i class="la la-edit"></i><span>Use</span></span></a>'
							}
					},

					]
			})

			// $('<a class="btn m-btn m-btn--custom m-btn--icon m-btn--pill m-btn--air btn-primary btn-sm refresh" style="margin-left: 60%; color: white;"><span><i class="la la-refresh"></i><span>Reload</span></span> </button>').appendTo('div.dataTables_filter');
			$('.paging_simple_numbers').addClass('pull-left');
			$('.dataTables_length').addClass('pull-right');
			$('.dataTables_info').addClass('pull-left');
			$('.dataTables_info').addClass('margin-info');
			$('.paging_simple_numbers').addClass('padding-datatable');

			$('.dataTables_filter').on('click', '.refresh', function () {
					$('#coa_datatables').DataTable().ajax.reload();

			});

			$('#coa_datatables').on('click', '.select-coa', function () {
				let tr = $(this).parents('tr');

				let data = coa_table.row(tr).data();

				$.ajax({
						url: '/journala',
						headers: {
							'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
						},
						type: 'post',
						dataType: 'json',
						data : {
							'account_code' : data.code,
							'voucher_no' : _voucher_no
						},
						success: function (data) {

							$('#coa_modal').modal('hide');

							account_code_table.ajax.reload();

							toastr.success('Data Saved Successfully', 'Success', {
								timeOut: 2000
							});

						}
				});

			});

			let remove = $('.accountcode_datatable').on('click', '.delete', function () {
				let triggerid = $(this).data('uuid');

				swal({
						title: 'Sure want to remove?',
						type: 'question',
						confirmButtonText: 'Yes, REMOVE',
						confirmButtonColor: '#d33',
						cancelButtonText: 'Cancel',
						showCancelButton: true,
				}).then(result => {
						if (result.value) {

								$.ajax({
										headers: {
												'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
														'content'
												)
										},
										type: 'DELETE',
										url: '/journala/' + triggerid + '',
										success: function (data) {
												toastr.success('data has been deleted.', 'Deleted', {
																timeOut: 2000
														}
												);

												account_code_table.ajax.reload();
										},
										error: function (jqXhr, json, errorThrown) {
												let errorsHtml = '';
												let errors = jqXhr.responseJSON;

												$.each(errors.errors, function (index, value) {
														$('#delete-error').html(value);
												});
										}
								});
						}
				});
			});

			// account code modal select 2 handler

			function splitSelect2Value(val) {
				let data = [];
				let arr = val.split('(')
				data['name'] = arr[0];

				let arr2 = arr[1].split(')');
				data['code'] = arr2[0];

				return data;
			}

			function formatSelected(state) {
				let x = splitSelect2Value(state.text)['code'];

				$('#_account_description').val(splitSelect2Value(state.text)['name']);
				// $('#account_description').remove();
				return x;
			}

			function getCode() {

			}

			$('#_accountcode').select2({
			  ajax: {
			    url: _url+'/journal/get-account-code-select2',
			    dataType: 'json'
			  },
				minimumInputLength: 3,
				// templateSelection: formatSelected
			});

    }
};

jQuery(document).ready(function () {
    JournalEdit.init();
});
