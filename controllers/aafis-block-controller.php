<?php

// Register custom category
function register_custom_block_category( $categories, $block_editor_context ) {
    // Add a new custom category.
    $categories[] = array(
        'slug'  => 'attendance-management',
        'title' => __( 'Attendance Management', 'attendance-addon-from-innenta-solutions' ),
        'icon'  => 'dashicons-admin-users',
    );
    
    return $categories;
}
add_filter( 'block_categories_all', 'register_custom_block_category', 10, 2 );

// Register the block using metadata loaded from the `block.json` file.
function create_block_attendance_block_init() {
	$blocks = array('block-1', 'block-2'); // Add all your blocks here
	foreach ($blocks as $block){
		register_block_type(AAFIS_ROOT . "/build/blocks/$block");
	}
}
add_action( 'init', 'create_block_attendance_block_init' );