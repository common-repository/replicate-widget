var replicate_widget_customizer;
( function( $ ) {
	var api = wp.customize;
	
	replicate_widget_customizer = {
		init : function() {

			// Add to all widgets
			$( '.widget-control-actions' ).each( function() {
				var controls = $( this ), delete_button;

				if ( ! controls.hasClass( 'replicate-widget' ) )  {
					controls.addClass( 'replicate-widget' );

					delete_button = controls.find( '.widget-control-remove' );

					delete_button.after( " | " + '<button type="button" class="button-link widget-control-replicate">Replicate</button>' );
				}
			} );

			// On widget open or on widget replicate
			$( document.body ).on( 'click', function( e ) {
				var target = $( e.target ), widget, inside, controls, delete_button;

				if ( target.parents( '.widget-top' ).length ) {
					widget = target.closest( '.widget' );
					controls = widget.find( '.widget-control-actions' );
					
					if ( ! controls.hasClass( 'replicate-widget' ) )  {
						controls.addClass( 'replicate-widget' );
						
						delete_button = controls.find( '.widget-control-remove' );
						
						delete_button.after( " | " + '<button type="button" class="button-link widget-control-replicate">Replicate</button>' );
					}
					
					e.preventDefault();
				} else if ( target.hasClass( 'widget-control-replicate' ) ) {
					widget_li = target.closest( '.widget' ).parent( 'li' );
					replicate_widget_customizer.replicate( widget_li );
					
					e.preventDefault();
				}
			} );
		},
		
		replicate : function( widget_li ) {
			var widget             = widget_li.children( '.widget' );
			var widget_id          = widget.find( 'input[name="widget-id"]' ).val();
			var id_base            = widget.find( 'input[name="id_base"]' ).val();
			var widget_number      = widget_id.replace( id_base + '-', '' );
			var new_multi_number   = -1;

			$( '.widget' ).each( function() {
				var search_widget                  = $( this );
				var search_widget_inside           = search_widget.find( '.widget-inside' );
				var search_widget_id__i__element   = search_widget_inside.find( '.widget-id' );
				var search_widget_id__i__          = search_widget_id__i__element.val();

				if ( search_widget_id__i__ == id_base + '-__i__' ) {
					var multi_number_element = search_widget_id__i__element.siblings( '.multi_number' );
					var multi_number = multi_number_element.val();
					new_multi_number = Number( multi_number ) + 1;
					
					multi_number_element.val( new_multi_number );
				}
			} );

			var replicate_li = widget_li.clone();
			
			widget_li.removeClass( 'last-widget' );
			replicate_li.removeClass( 'first-widget' );
			
			replicate_li.find( '.widget-content' ).find( 'input, select, textarea, label' ).each( function() {
				if ( $( this ).attr( 'name' ) ) {
					$( this ).attr( 'name', $( this ).attr( 'name' ).replace( widget_number, new_multi_number ) );
				}
				
				if ( $( this ).attr( 'id' ) ) {
					$( this ).attr( 'id', $( this ).attr( 'id' ).replace( widget_number, new_multi_number ) );
				}
				
				if ( $( this ).attr( 'for' ) ) {
					$( this ).attr( 'for', $( this ).attr( 'for' ).replace( widget_number, new_multi_number ) );
				}
			} );
			
			replicate_li.attr( 'id', 'customize-control-widget_' + id_base + '-' + new_multi_number );
			replicate_li.children( '.widget' ).attr( 'id', 'widget-' + new_multi_number + '_' + id_base + '-' + new_multi_number );
			
			replicate_li.children( '.widget' ).find( 'input.widget-id' ).val( id_base + '-' + new_multi_number );
			replicate_li.children( '.widget' ).find( 'input.widget_number' ).val( new_multi_number );
			replicate_li.children( '.widget' ).find( 'input.multi_number' ).val( new_multi_number );

			widget_li.after( replicate_li );

			var widget_next = widget_li.next().children( '.widget' );
			
			//wpWidgets.save( widget_next, 0, 0, 1 );
			//api.Widgets.SidebarControl.addWidget( 'widget-' + new_multi_number + '_' + id_base + '-' + new_multi_number );

			$( document ).trigger( 'widget-added', [ widget_next ] );
		}
	};

	$( document ).ready( function( $ ) { replicate_widget_customizer.init(); } );
} ) ( jQuery );