/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes}) {
	const {title} = attributes;
	return (
		<div { ...useBlockProps.save() }>
			<h1 className="title">{title}</h1>
			<span className="attendance-current-time">Time Show Here</span>
            <div className='attendance-shift-btn-container'>
                <button type="button" id="attendance-shift-start-btn" className="attendance-shift-start-btn">Shift Start</button>
                <button type="button" id="attendance-shift-end-btn" className="attendance-shift-end-btn">Shift End</button>
            </div>
		</div>
	);
}
