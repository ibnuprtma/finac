<?php

namespace Directoryxx\Finac\Controllers\Frontend;

use Illuminate\Http\Request;
use Directoryxx\Finac\Model\APayment;
use Directoryxx\Finac\Request\APaymentUpdate;
use Directoryxx\Finac\Request\APaymentStore;
use App\Http\Controllers\Controller;



class APController extends Controller
{
    public function index()
    {
        return redirect()->route('apayment.create');
    }

    public function create()
    {
        return view('apaymentview::index');        
    }

    public function store(APaymentStore $request)
    {
        $apayment = APayment::create($request->all());
        return response()->json($apayment);
    }

    public function edit(APayment $apayment)
    {
        return response()->json($apayment);
    }

    public function update(APaymentUpdate $request, APayment $apayment)
    {

        $apayment->update($request->all());

        return response()->json($apayment);
    }

    public function destroy(APayment $apayment)
    {
        $apayment->delete();

        return response()->json($apayment);
    }

    public function api()
    {
        $apaymentdata = APayment::all();

        return json_encode($apaymentdata);
    }

    public function apidetail(APayment $apayment)
    {
        return response()->json($apayment);
    }

    public function datatables()
    {
        $data = $alldata = json_decode(APayment::All());

		$datatable = array_merge([
			'pagination' => [], 'sort' => [], 'query' => []
		], $_REQUEST);

		$filter = isset($datatable['query']['generalSearch']) && 
			is_string($datatable['query']['generalSearch']) ? 
			$datatable['query']['generalSearch'] : '';

        if (!empty($filter)) {
            $data = array_filter($data, function ($a) use ($filter) {
                return (bool) preg_grep("/$filter/i", (array) $a);
            });

            unset($datatable['query']['generalSearch']);
        }

		$query = isset($datatable['query']) && 
			is_array($datatable['query']) ? $datatable['query'] : null;

        if (is_array($query)) {
            $query = array_filter($query);

            foreach ($query as $key => $val) {
                $data = $this->list_filter($data, [$key => $val]);
            }
        }

		$sort  = !empty($datatable['sort']['sort']) ? 
			$datatable['sort']['sort'] : 'asc';
		$field = !empty($datatable['sort']['field']) ? 
			$datatable['sort']['field'] : 'RecordID';

        $meta    = [];
		$page    = !empty($datatable['pagination']['page']) ? 
			(int) $datatable['pagination']['page'] : 1;
		$perpage = !empty($datatable['pagination']['perpage']) ? 
			(int) $datatable['pagination']['perpage'] : -1;

        $pages = 1;
        $total = count($data);

        usort($data, function ($a, $b) use ($sort, $field) {
            if (!isset($a->$field) || !isset($b->$field)) {
                return false;
            }

            if ($sort === 'asc') {
                return $a->$field > $b->$field ? true : false;
            }

            return $a->$field < $b->$field ? true : false;
        });

        if ($perpage > 0) {
            $pages  = ceil($total / $perpage);
            $page   = max($page, 1);
            $page   = min($page, $pages);
            $offset = ($page - 1) * $perpage;

            if ($offset < 0) {
                $offset = 0;
            }

            $data = array_slice($data, $offset, $perpage, true);
        }

        $meta = [
            'page'    => $page,
            'pages'   => $pages,
            'perpage' => $perpage,
            'total'   => $total,
        ];

		if (
			isset($datatable['requestIds']) && 
			filter_var($datatable['requestIds'], FILTER_VALIDATE_BOOLEAN)) 
		{
            $meta['rowIds'] = array_map(function ($row) {
                return $row->RecordID;
            }, $alldata);
        }

        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

        $result = [
            'meta' => $meta + [
                'sort'  => $sort,
                'field' => $field,
            ],
            'data' => $data,
        ];

        echo json_encode($result, JSON_PRETTY_PRINT);
    }
}