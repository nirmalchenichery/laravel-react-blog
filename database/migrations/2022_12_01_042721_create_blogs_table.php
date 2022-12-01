<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('language');
            $table->string("title");
            $table->text("description");
            $table->text("content");
            $table->string("author");
            $table->string("author_image_url");
            $table->string("image_url_portrait");
            $table->string("image_url_landscape");
            $table->boolean("is_trending");
            $table->string('is_display');
            $table->string('is_approved');
            $table->datetime('posted_at');
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
        Schema::dropIfExists('blogs');
    }
};
