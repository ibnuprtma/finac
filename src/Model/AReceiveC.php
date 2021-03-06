<?php

namespace memfisfa\Finac\Model;

use memfisfa\Finac\Model\MemfisModel;
use Illuminate\Database\Eloquent\Model;

class AReceiveC extends MemfisModel
{
    protected $table = "a_receive_c";

	protected $fillable = [
	    'ara_id',
		'ar_id',
	    'uuid',
	    'transactionnumber',
	    'id_invoice',
	    'code',
	    'debit',
	    'credit',
	    'description',
    ];
    
    protected $appends = [
        'gap'
    ];

    public function getGapAttribute()
    {
        if ($this->credit != 0) {
            return $this->credit;
        }else{
            return $this->debit;
        }
    }

	public function ar()
	{
		return $this->belongsTo(
			AReceive::class,
			'ar_id'
		);
    }
    
    public function ara()
    {
        return $this->belongsTo(AReceiveA::class, 'ara_id');
    }

	public function coa()
	{
		return $this->belongsTo(Coa::class, 'code', 'code');
	}
}
