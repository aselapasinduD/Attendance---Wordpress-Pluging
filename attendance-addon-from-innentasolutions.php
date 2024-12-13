<?php
/**
 * Plugin Name:       Attendance
 * Plugin URI:		  https://www.innentasolutions.com
 * Description:       Attendance Management System Provided By Innenta Solutions.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Asela Pasindu
 * Author URI: 		  https://www.innentasolutions.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       attendance-addon-from-innentasolutions
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

//  Register Attendance Database table on plugin activation.
register_activation_hook(__FILE__, 'create_attendance_shift_marks_table');
function create_attendance_shift_marks_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'attendance_shift_marks';

    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id INT(11) NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            shift_start DATETIME NOT NULL,
            shift_end DATETIME NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES {$wpdb->prefix}users(ID) ON DELETE CASCADE
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

// Register custom category
function register_custom_block_category( $categories, $block_editor_context ) {
    // Add a new custom category.
    $categories[] = array(
        'slug'  => 'attendance-management',
        'title' => __( 'Attendance Management', 'attendance-addon-from-innentasolutions' ),
        'icon'  => 'dashicons-admin-users',
    );
    
    return $categories;
}
add_filter( 'block_categories_all', 'register_custom_block_category', 10, 2 );

// Register the block using metadata loaded from the `block.json` file.
function create_block_attendance_block_init() {
	$blocks = array('block-1', 'block-2'); // Add all your blocks here
	foreach ($blocks as $block){
		register_block_type(__DIR__ . "/build/blocks/$block");
	}
}
add_action( 'init', 'create_block_attendance_block_init' );

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

	$asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

	foreach ($asset_file['dependencies'] as $style) {
		wp_enqueue_style($style);
	}

	wp_register_script(
		'attendance-app-root',
		plugins_url('build/index.js', __FILE__),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
	wp_enqueue_script('attendance-app-root');

	wp_register_style(
		'attendance-app-root',
		plugins_url('build/style-index.css', __FILE__),
		array(),
		$asset_file['version']
	);
	wp_enqueue_style('attendance-app-root');
};
add_action('admin_enqueue_scripts', 'load_attendance_wp_admin_scripts');
