/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

const icon = ( <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 18.28'> <path d='m19.56.01c1.92.01,3.58,1.23,4.2,3.04.15.44.23.9.23,1.37,0,3.11.02,6.23,0,9.34-.02,2.55-1.95,4.47-4.51,4.51-1.78.02-11.76.01-14.97,0-1.75,0-3.05-.81-3.93-2.29C.17,15.28.01,14.5.01,13.7,0,10.57,0,7.43.01,4.3.02,2.04,2.02.05,4.33.02,6.89-.01,17.04,0,19.56.01ZM4.61,1.1c-2.06,0-3.52,1.48-3.52,3.54,0,1.81,0,3.62,0,5.43,0,.44.06.86.22,1.27.51,1.34,1.79,2.19,3.31,2.19,4.76,0,9.52,0,14.28,0,.33,0,.65-.01.97-.05,1.73-.2,3.02-1.61,3.04-3.34.01-1.89,0-3.77,0-5.66,0-.63-.14-1.23-.49-1.76-.7-1.09-1.73-1.62-3.01-1.63-2.46-.02-12.33-.01-14.8,0ZM1.14,13.13c-.08.39-.05,1.03.06,1.49.38,1.52,1.75,2.57,3.39,2.57,4.9,0,9.8,0,14.7,0,.36,0,.72-.04,1.06-.14,1.91-.53,2.78-2.18,2.51-3.92-.03.02-.06.03-.08.05-1.01,1.06-2.26,1.46-3.69,1.45-2.48-.02-12.29,0-14.7-.01-.92,0-1.75-.28-2.47-.85-.26-.21-.51-.43-.77-.64Z'/> <path d='m11.46,7.62c0-.21-.08-.28-.29-.28-.23,0-.42,0-.68,0-.41-.02-.55-.3-.29-.63.49-.61.99-1.21,1.5-1.8.24-.28.36-.29.61,0,.52.6,1.02,1.2,1.51,1.82.25.32.1.59-.3.61-.16,0-.32,0-.49,0q-.48,0-.48.47c0,.6,0,1.96,0,2.05-.03.34-.24.57-.54.59-.27.01-.5-.21-.53-.55-.03-.4-.03-1.92-.01-2.27Z'/> </svg> );

registerBlockType( metadata.name, {
	icon,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );