<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Registering scripts and sryles for later
function replicate_widget__register_scripts_and_styles_admin_action() {
	$replicate_widget                  = replicate_widget();
	$admin_url                         = $replicate_widget->admin_url;
	$version                           = $replicate_widget->version;

	// Replicate Widget JS files
	wp_register_script( 'replicate-widget-widgets',                        $admin_url . 'js/widgets.js',                        array(), $version, true );
	
	// For later.
	//wp_register_script( 'replicate-widget-customize',                      $admin_url . 'js/customize.js',                      array(), $version, true );
}

// List of dashboard pages and what to add
function replicate_widget__dashboard_list() {

	$settings_options = array();

	// Widgets.php page
	$settings_options[] = array(
		'menu_slug' => 'widgets.php',
		'scripts'   => array(
			'replicate-widget-widgets'
		),
		'styles'   => array(

		)
	);
	
	// For later.
	// Customize.php page
	// $settings_options[] = array(
		// 'menu_slug' => 'customize.php',
		// 'scripts'   => array(
			// 'replicate-widget-customize'
		// ),
		// 'styles'   => array(

		// )
	// );
	
	return $settings_options;
}

// Function for enqueue styles and scripts in the footer and header for custom pages in WordPress Dashboard
function replicate_widget__enqueue_style_scripts_by_hook_suffix_action_action() {
	global $hook_suffix;

	$settings = replicate_widget__dashboard_list();
	
	if ( ! empty ( $settings ) ) {
		foreach ( (array) $settings as $set ) {
			if ( ! empty ( $set['menu_slug'] ) ) {
				if ( (string) $hook_suffix == (string) $set['menu_slug'] ) {
					if ( ! empty ( $set['scripts'] ) ) {
						foreach ( (array) $set['scripts'] as $script => $k ) {
							wp_enqueue_script( $k  );
						}
					}
					if ( ! empty ( $set['styles'] ) ) {
						foreach ( (array) $set['styles'] as $script => $k ) {
							wp_enqueue_style( $k );
						}
					}
				}
			}
		}
	}
}