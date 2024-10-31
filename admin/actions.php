<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// For registering styles and scripts for admin pages
add_action( 'admin_init',                            'replicate_widget__register_scripts_and_styles_admin_action'               );

// For priting styles and scripts files urls in header
add_action( 'admin_enqueue_scripts',                 'replicate_widget__enqueue_style_scripts_by_hook_suffix_action_action'     );