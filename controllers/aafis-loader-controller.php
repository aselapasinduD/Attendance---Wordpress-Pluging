<?php
/**
 * Pluging Loader
 * 
 * @package AAF-INNENTA-SOLUTIONS
 */

 if ( ! defined( 'ABSPATH' ) && ! defined('AAFIS_FILE') ) {
	exit; // Exit if accessed directly.
}

// Add admin menu page
function attendance_admin_menu(){
	add_menu_page(
		__('Attendance', 'gutenberg'),
		__('Attendance', 'gutenberg'),
		'manage_options',
		'attendance-app-root',
		function () {
			echo '<div id="attendance-app-root"></div>';
		},
		'dashicons-schedule',
		3
	);
}
add_action('admin_menu', 'attendance_admin_menu');

// Enqueue scripts and styles for the admin page.
function load_attendance_wp_admin_scripts($hook){
	if('toplevel_page_attendance-app-root' !== $hook){
		return;
	}

	$asset_file = include plugin_dir_path( AAFIS_FILE ) . 'build/index.asset.php';

	foreach ($asset_file['dependencies'] as $style) {
		wp_enqueue_style($style);
	}

	wp_register_script(
		'attendance-app-root',
		plugins_url('build/index.js', AAFIS_FILE),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
	wp_enqueue_script('attendance-app-root');

	wp_register_style(
		'attendance-app-root',
		plugins_url('build/style-index.css', AAFIS_FILE),
		array(),
		$asset_file['version']
	);
	wp_enqueue_style('attendance-app-root');
};
add_action('admin_enqueue_scripts', 'load_attendance_wp_admin_scripts');