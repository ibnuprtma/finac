<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCashbookBTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cashbook_b', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->string('transactionnumber');
            $table->unsignedInteger('code');
            $table->string('name');
            $table->unsignedBigInteger('currency');
            $table->decimal('exchangerate',18,5);
            $table->decimal('credit',18,5);
            $table->decimal('debit',18,5);
            $table->text('description')->nullable();
            $table->foreign('transactionnumber')->references('transactionnumber')->on('cashbooks');
            $table->foreign('code')
                    ->references('id')->on('coas')
                    ->onUpdate('cascade')
                    ->onDelete('restrict');
            $table->foreign('currency')
                    ->references('id')->on('currencies')
                    ->onUpdate('cascade')
                    ->onDelete('restrict');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cashbook_bs');
    }
}
