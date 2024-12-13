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
 * @package AAF-INNENTA-SOLUTIONS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'AAFIS_FILE', __FILE__ );
define( 'AAFIS_ROOT', __DIR__ );

register_activation_hook( AAFIS_FILE , 'pluging_activate');
function pluging_activate(){
    set_transient('plugin_activation_notice', true, 5);
	create_attendance_shift_marks_table();
}

// Show the plugin activation notice
function plugin_is_activated_notice() {
    // Check if the transient is set
    if (get_transient('plugin_activation_notice')) {
        $message = sprintf( esc_html__( 'Attendance version %s from Innenta Solutions is activated successfully, ', 'attendance-addon-from-innenta-solutions' ), '0.1.0' );
        $html_message = sprintf( '<div id="message" class="notice is-dismissible updated"><p>%s</p></div>', esc_html( $message ) );
        echo wp_kses_post( $html_message );
        
        delete_transient('plugin_activation_notice');
    }
}
add_action('admin_notices', 'plugin_is_activated_notice');

//  Register Attendance Database table on plugin activation.
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

require_once 'controllers/aafis-block-controller.php';
require_once 'controllers/aafis-loader-controller.php';